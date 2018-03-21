function normRand(m, s){
  var a = 1 - Math.random();
  var b = 1 - Math.random();
  var c = Math.sqrt(-2 * Math.log(a));
  if (0.5 < Math.random()){
    return c * Math.sin(Math.PI * 2 * b) * s + m;
  }else{
    return c * Math.cos(Math.PI * 2 * b) * s + m;
  }
}

class Box{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
    this.setGUI();
  }

  init(){
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.webgl.scene.add(this.mesh);
  }

  setGUI(){
    this.parameter = new Parameter_box();
    this.folder = this.webgl.gui.addFolder("Box");
    this.folder.add(this.parameter, "speed", -0.3, 0.3);
    this.folder.add(this.parameter, "maxSizeX", 0, 10.0);
    this.folder.add(this.parameter, "minSizeX", 0, 10.0);
    this.folder.add(this.parameter, "freqX", 0, 1023);
    this.folder.add(this.parameter, "maxSizeY", 0, 10.0);
    this.folder.add(this.parameter, "minSizeY", 0, 10.0);
    this.folder.add(this.parameter, "freqY", 0, 1023);
    this.folder.add(this.parameter, "maxSizeZ", 0, 10.0);
    this.folder.add(this.parameter, "minSizeZ", 0, 10.0);
    this.folder.add(this.parameter, "freqZ", 0, 1023);
    this.folder.close();
  }

  setVisible(select){
    this.mesh.visible = select;
    if(select){
      this.webgl.camera.position.set(0, 500, +1000);
      this.webgl.camera.lookAt(this.webgl.scene.position);
      this.webgl.control.enabled = true;
      this.folder.open();
    }else{
      this.folder.close();
    }
  }

  render(){
    var x = this.parameter.freqX;
    var y = this.parameter.freqY;
    var z = this.parameter.freqZ;
    this.mesh.scale.set(
      this.webgl.audio.data[x] / 100 * (this.parameter.maxSizeX - this.parameter.minSizeX) + this.parameter.minSizeX,
      this.webgl.audio.data[y] / 100 * (this.parameter.maxSizeY - this.parameter.minSizeY) + this.parameter.minSizeY,
      this.webgl.audio.data[z] / 100 * (this.parameter.maxSizeZ - this.parameter.minSizeZ) + this.parameter.minSizeZ
      /*
      this.webgl.audio.frequency[x] / 100 * (this.parameter.maxSizeX - this.parameter.minSizeX) + this.parameter.minSizeX,
      this.webgl.audio.frequency[y] / 100 * (this.parameter.maxSizeY - this.parameter.minSizeY) + this.parameter.minSizeY,
      this.webgl.audio.frequency[z] / 100 * (this.parameter.maxSizeZ - this.parameter.minSizeZ) + this.parameter.minSizeZ
      */
    );

    this.mesh.rotation.y += this.parameter.speed;
  }

  render_random(){
    this.mesh.scale.set(
      normRand(0.5, 0.01) * (this.parameter.maxSizeX - this.parameter.minSizeX) + this.parameter.minSizeX,
      normRand(0.5, 0.01) * (this.parameter.maxSizeY - this.parameter.minSizeY) + this.parameter.minSizeY,
      normRand(0.5, 0.01) * (this.parameter.maxSizeZ - this.parameter.minSizeZ) + this.parameter.minSizeZ
    );

    this.mesh.rotation.y += this.parameter.speed;
  }
}

var Parameter_box = function(){
  this.speed = 0.01;

  this.maxSizeX = 2.0;
  this.minSizeX = 0.1;
  this.freqX = 200;

  this.maxSizeY = 2.0;
  this.minSizeY = 0.1;
  this.freqY = 400;

  this.maxSizeZ = 2.0;
  this.minSizeZ = 0.1;
  this.freqZ = 600;
}
