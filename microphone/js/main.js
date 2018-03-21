window.onload = function(){

  "use strict";

  const webgl = new Webgl();
  webgl.meshes.push(new Particles(webgl));
  webgl.meshes.push(new Spheres(webgl));
  webgl.meshes.push(new Box(webgl));

  webgl.meshes[0].setVisible(true);
  webgl.meshes[1].setVisible(false);
  webgl.meshes[2].setVisible(false);

  webgl.audio = new Audio(webgl);
  webgl.audio.start();
}
