class ResizeWatch{
  constructor(){
    this.instances = [];

    this.width = this._width = document.body.clientWidth;
    this.height = this._height = window.innerHeight;
    this.aspect = this.width / this.height;

    window.onresize = function(){
      if(this.instances.length === 0) return;

      this.width = document.body.clientWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;

      for(let i=0; i<this.instances.length; i++){
        this.instances[i].resizeUpdate();
      }
    }.bind(this)
  }

  register(instance){
    this.instances.push(instance);
  }
}
window.ResizeWatch = new ResizeWatch();

class Box{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
  }

  init(){
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.webgl.scene.add(this.mesh)
  }

  render(){
    this.mesh.scale.set(
      this.webgl.audio.data[1] / 50 + 0.0001,
      this.webgl.audio.data[2] / 50 + 0.0001,
      this.webgl.audio.data[3] / 50 + 0.0001,
    );

    this.mesh.rotation.y += 0.01;
  }
}

class Audio{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
  }

  init(){
  }

  start(){
    const _this = this

    const btn = document.getElementById("overlay");

    /*
    navigator.getUserMedia({
      audio: true
    }, _handleSuccess, _handleError);
    */
    navigator.mediaDevices.getUserMedia({audio: true}).then(_handleSuccess)

    function _handleSuccess(evt) {
      btn.addEventListener("click", () => {
        _handleClick(evt);
      }, false);
    }

    function _handleError() {
      alert("Error!");
    }

    function _handleClick(evt) {
      const LENGTH = 16;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const options  = {mediaStream : evt};
      const src = audioCtx.createMediaStreamSource(evt);
      const analyser = audioCtx.createAnalyser(evt);
      _this.data = new Uint8Array(LENGTH);

      btn.classList.add("off");
      analyser.fftSize = 1024;
      src.connect(analyser);

      (function animation(){
        analyser.getByteFrequencyData(_this.data);

        _this.webgl.render();

        requestAnimationFrame(animation);
      })();
    }
  }
}

class Webgl{
  constructor(){
    this.init();
  }

  init(){
    window.ResizeWatch.register(this);

    this.scene = new THREE.Scene();

    this.setProps();

    this.camera = new THREE.PerspectiveCamera(this.props.fov, this.props.aspect, this.props.near, this.props.far);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas")
    })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(window.ResizeWatch.width, window.ResizeWatch.height);

    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.control.enabled = true;

    this.meshes = [];

    this.camera.position.set(0, 500, +1000);
    this.camera.lookAt(this.scene.position);

    this.resizeUpdate();
  }

  resizeUpdate(){
    this.setProps();
    this.renderer.setSize(this.props.width, this.props.height);
    this.camera.aspect = this.props.aspect;
  }

  setProps(){
    const width = window.ResizeWatch.width;
    const height = window.ResizeWatch.height;
    const aspect = width / height;

    this.props = {
      width: width,
      height: height,
      aspect: aspect,
      fov: 45,
      left: -width / 2,
      right: width / 2,
      top: height / 2,
      bottom: -height / 2,
      near: 0.1,
      far: 10000,
      parent: document.getElementById("wrapper"),
    };
  };

  render(){
    for(let i=0; i<this.meshes.length; i++){
      this.meshes[0].render()
    }
    this.renderer.render(this.scene, this.camera);
  }
}

window.onload = function(){

  "use strict";

  const webgl = new Webgl();
  webgl.meshes.push(new Box(webgl));

  webgl.audio = new Audio(webgl);
  webgl.audio.start();

  /*
  let webgl = new Webgl();
  webgl.mesh.push(new Box(webgl));
  webgl.audio = new Audio(webgl);
  webgl.mesh[0].setVisible(true);
  webgl.audio.start();
  */
}
