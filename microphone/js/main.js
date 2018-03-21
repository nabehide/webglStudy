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
      data[1] / 50 + 0.0001,
      data[2] / 50 + 0.0001,
      data[3] / 50 + 0.0001,
    );

    this.mesh.rotation.y += 0.01;
  }
}

class Webgl{
  constructor(){
    this.init();
  }

  init(){
    const width = 600;
    const height = 600;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas")
    })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(width, height);
    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.control.enabled = true;

    this.meshes = [];

    this.camera.position.set(0, 500, +1000);
    this.camera.lookAt(this.scene.position);

    const _this = this

    const btn = document.getElementById("overlay");

    navigator.getUserMedia({
      audio: true
    }, _handleSuccess, _handleError);

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
      const data = new Uint8Array(LENGTH);

      btn.classList.add("off");
      analyser.fftSize = 1024;
      src.connect(analyser);

      (function animation(){
        _this.renderer.render(_this.scene, _this.camera);

        analyser.getByteFrequencyData(data);

        this.render();

        requestAnimationFrame(animation);
      })();
    }
  }

  render(){
    this.meshes[0].render()
  }
}

window.onload = function(){

  "use strict";

  const webgl = new Webgl();
  webgl.meshes.push(Box(webgl));

  /*
  let webgl = new Webgl();
  webgl.mesh.push(new Box(webgl));
  webgl.audio = new Audio(webgl);
  webgl.mesh[0].setVisible(true);
  webgl.audio.start();
  */
}
