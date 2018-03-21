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
