window.onload = function(){

  "use strict";

  const webgl = new Webgl();
  webgl.meshes.push(new Spheres(webgl));
  webgl.meshes.push(new Particles(webgl));
  webgl.meshes.push(new Box(webgl));

  webgl.meshes[0].setVisible(false);
  webgl.meshes[1].setVisible(true);
  webgl.meshes[2].setVisible(false);

  webgl.audio = new Audio(webgl);
  webgl.audio.start();
}

$(function() {
  $('#spheres').click(function() {
    webgl.mesh[0].setVisible(true);
    webgl.mesh[1].setVisible(false);
    webgl.mesh[2].setVisible(false);

    $('#spheres').addClass('selectedScene');
    $('#particles').removeClass('selectedScene');
    $('#box').removeClass('selectedScene');
  });
});

$(function() {
  $('#particles').click(function() {
    webgl.mesh[0].setVisible(false);
    webgl.mesh[1].setVisible(true);
    webgl.mesh[2].setVisible(false);

    $('#spheres').removeClass('selectedScene');
    $('#particles').addClass('selectedScene');
    $('#box').removeClass('selectedScene');
  });
});

$(function() {
  $('#box').click(function() {
    webgl.mesh[0].setVisible(false);
    webgl.mesh[1].setVisible(false);
    webgl.mesh[2].setVisible(true);

    $('#spheres').removeClass('selectedScene');
    $('#particles').removeClass('selectedScene');
    $('#box').addClass('selectedScene');
  });
});
