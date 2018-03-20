const webgl = new Webgl();

window.onload = function(){
  webgl.mesh.push(new Box(webgl));

  webgl.audio = new Audio(webgl);

  webgl.mesh[0].setVisible(true);

  webgl.audio.start();
}
