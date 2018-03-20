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

class Spheres{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
    this.setGUI();
  }

  init(){
    this.createMesh();

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.webgl.scene.add(this.ambientLight);
    this.ambientLight.visible = false;

    this.webgl.scene.fog = new THREE.FogExp2("#140066", 0.035);
    this.webgl.scene.fog.visible = false;
  }

  createMesh(){
    const SIZE = 1500;
    const SCALE = 30;
    this.MAX_LENGTH = 1024;
    this.LENGTH = 64;

    this.group = new THREE.Group();
    this.webgl.scene.add(this.group);

    this.meshes = []
    for(let i=0; i<this.LENGTH; i++){
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshLambertMaterial();
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

  setGUI(){
    this.parameter = new Parameter_spheres();
    this.folder = this.webgl.gui.addFolder("Spheres");
    this.folder.add(this.parameter, "speed", -0.01, 0.01);
    this.folder.add(this.parameter, "maxSize", 0, 200.0);
    this.folder.add(this.parameter, "minSize", 0, 200.0);
    this.folder.close();
  }

  setVisible(select){
    this.group.visible = select;
    this.ambientLight.visible = select;
    this.webgl.scene.fog.visible = select;

    if(select){
      this.webgl.camera.lookAt(this.webgl.scene.position);
      this.webgl.camera.position.set(0, 0, +1000);
      this.webgl.control.enabled = true;
      this.folder.open();
    }else{
      this.folder.close()
    }
  }

  render(){
    for(let i=0; i<this.LENGTH; i++){
      const size = this.webgl.audio.frequency[i * this.MAX_LENGTH / this.LENGTH] / 100 * (this.parameter.maxSize - this.parameter.minSize) + this.parameter.minSize;
      this.meshes[i].scale.set(size, size, size);
    }

    this.group.rotation.x += this.parameter.speed;
    this.group.rotation.y += this.parameter.speed;
    this.group.rotation.z += this.parameter.speed;
  }

  render_random(){
    for(let i=0; i<this.LENGTH; i++){
      const size = normRand(0.8, 0.05) * (this.parameter.maxSize - this.parameter.minSize) + this.parameter.minSize;
      this.meshes[i].scale.set(size, size, size);
    }

    this.group.rotation.x += this.parameter.speed;
    this.group.rotation.y += this.parameter.speed;
    this.group.rotation.z += this.parameter.speed;
  }
}

const Parameter_spheres = function(){
  this.speed = 0.0005;
  this.maxSize = 50.0;
  this.minSize = 30.0;
}
