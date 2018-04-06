export class Webgl{
  constructor(){
    this.init();
  }

  init(){
    window.ResizeWatch.register(this);

    this.scene = new THREE.Scene();

    this.gui = new dat.GUI({audoPlace: false});
    this.gui.close();
    const customContainer = document.getElementById("guiContainer");
    customContainer.appendChild(this.gui.domElement);

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
      this.meshes[i].render()
    }
    this.renderer.render(this.scene, this.camera);
  }

  render_random(){
    for(let i=0; i<this.meshes.length; i++){
      this.meshes[i].render_random()
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render_random.bind(this));
  }
}
