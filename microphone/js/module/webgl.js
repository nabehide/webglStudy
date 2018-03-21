class Webgl{
  constructor(){
    this.init();
  }

  init(){
    window.ResizeWatch.register(this);

    this.rot = 0;
  
    this.scene = new THREE.Scene();

    this.gui = new dat.GUI();
    this.gui.close();

    this.setProps();
  
    this.camera = new THREE.PerspectiveCamera(this.props.fov, this.props.aspect, this.props.near, this.props.far);
  
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas")
    })
    /*
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.div = document.getElementById("wrapper");
    this.div.appendChild(this.renderer.domElement);
    */
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(window.ResizeWatch.width, window.ResizeWatch.height);

    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    this.mesh = [];

    this.resizeUpdate();
    // this.render();
  }

  setProps(){
    var width = window.ResizeWatch.width;
    var height = window.ResizeWatch.height;
    var aspect = width / height;

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

  resizeUpdate(){
    this.setProps();
    this.renderer.setSize(this.props.width, this.props.height);
    this.camera.aspect = this.props.aspect;
  }

  render(){
    for(var i=0; i<this.mesh.length; i++){
      this.mesh[i].render();
    }
    this.renderer.render(this.scene, this.camera);
  }

  render_random(){
    for(var i=0; i<this.mesh.length; i++){
      this.mesh[i].render_random();
    }
    this.renderer.render(this.scene, this.camera);

    // if(this.audio !== undefined){
    //   $("canvas").stop();
    // }

    requestAnimationFrame(this.render_random.bind(this));
  }
}
