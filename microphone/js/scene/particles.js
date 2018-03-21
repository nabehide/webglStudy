function normRand(m, s){
  const a = 1 - Math.random();
  const b = 1 - Math.random();
  const c = Math.sqrt(-2 * Math.log(a));
  if (0.5 < Math.random()){
    return c * Math.sin(Math.PI * 2 * b) * s + m;
  }else{
    return c * Math.cos(Math.PI * 2 * b) * s + m;
  }
}

class Particles{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
    this.setGUI();
  }

  init(){
    this.createMesh();

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.ambientLight.visible = false;
    this.webgl.scene.add(this.ambientLight);
  }

  createMesh(){
    const SIZE = 1000;
    const SCALE = 30;
    this.MAX_LENGTH = 256;
    this.LENGTH = 64;

    this.group = new THREE.Group();
    this.webgl.scene.add(this.group);

    this.meshes = []
    for(let i=0; i<this.LENGTH; i++){
      const geometry = new THREE.PlaneBufferGeometry(SCALE, SCALE);
      const texture = new THREE.Texture(this.createCircleCanvas());
      texture.needsUpdate = true;
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        fog: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.meshes.push(mesh);
      this.meshes[i].position.set(
        SIZE * (Math.random() - 0.5),
        SIZE * (Math.random() - 0.5),
        SIZE * (Math.random() - 0.5),
      );
      this.group.add(this.meshes[i]);
    }
  }

  createCircleCanvas(){
    const canvas = document.createElement("canvas");
    const SIZE = 128;
    const HALF = SIZE / 2;
    const CENTER = SIZE / 2;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const context = canvas.getContext("2d");
    context.lineWidth = 0;

    context.beginPath();
    context.arc(CENTER, CENTER, HALF, 0, 2 * Math.PI, false);
    const grad = context.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, HALF);
    const color = new THREE.Color();
    const h = 210 + 60 * Math.random();
    const s = 40 + 20 * Math.random()
    const l = 30 + 20 * Math.random()
    color.setHSL(h / 360, s / 100, l / 100);
    grad.addColorStop(0, color.getStyle());
    grad.addColorStop(1, "#000000");
    context.fillStyle = grad;
    context.fill();
    context.closePath();
    return canvas;
  }

  setGUI(){
    this.parameter = new Parameter_particles();
    this.folder = this.webgl.gui.addFolder("Particles");
    this.folder.add(this.parameter, "speed", 0, 0.003);
    this.folder.add(this.parameter, "maxSize", 0, 50.0);
    this.folder.add(this.parameter, "minSize", 0, 50.0);
    this.folder.close();
  }

  setVisible(select){
    this.group.visible = select;
    this.ambientLight.visible = select;

    if(select){
      this.webgl.control.enabled = false;
      this.webgl.camera.lookAt(this.webgl.scene.position);
      this.webgl.camera.position.set(0, 0, +1000);
      this.webgl.camera.rotation.set(0, 0, 0);
      this.folder.open();
    }else{
      this.folder.close();
    }
  }

  render(){
    for(let i=0; i<this.LENGTH; i++){
      const size = this.webgl.audio.data[i * this.MAX_LENGTH / this.LENGTH] / 100 * (this.parameter.maxSize - this.parameter.minSize) + this.parameter.minSize;
      this.meshes[i].scale.set(size, size, size);
    }

    this.group.rotation.z += this.parameter.speed;
  }

  render_random(){
    for(let i=0; i<this.LENGTH; i++){
      const size = normRand(0.8, 0.1) * (this.parameter.maxSize - this.parameter.minSize) + this.parameter.minSize;
      this.meshes[i].scale.set(size, size, size);
    }

    this.group.rotation.z += this.parameter.speed;
  }
}

const Parameter_particles = function(){
  this.speed = 0.0003;
  this.maxSize = 10.0;
  this.minSize = 8.0;
}
