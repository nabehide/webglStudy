import {Webgl} from './src/js/module/webgl.js';

import {Microphone} from './src/js/module/microphone.js';
import {Audio} from './src/js/module/audio.js';

import {Particles} from "./src/js/scene/particles.js";
import {Spheres} from "./src/js/scene/spheres.js";
import {Box} from "./src/js/scene/box.js";

import {ResizeWatch} from './src/js/module/resize-watch.js';

const webgl = new Webgl();

window.onload = function(){

  "use strict";

  webgl.meshes.push(new Spheres(webgl));
  webgl.meshes.push(new Particles(webgl));
  webgl.meshes.push(new Box(webgl));

  webgl.meshes[0].setVisible(false);
  webgl.meshes[1].setVisible(true);
  webgl.meshes[2].setVisible(false);

  // webgl.microphone = new Microphone(webgl);
  // webgl.microphone.start();

  webgl.audio = new Audio(webgl);
}

$(function() {
  $('#spheres').click(function() {
    webgl.meshes[0].setVisible(true);
    webgl.meshes[1].setVisible(false);
    webgl.meshes[2].setVisible(false);

    $('#spheres').addClass('selectedScene');
    $('#particles').removeClass('selectedScene');
    $('#box').removeClass('selectedScene');
  });
});

$(function() {
  $('#particles').click(function() {
    webgl.meshes[0].setVisible(false);
    webgl.meshes[1].setVisible(true);
    webgl.meshes[2].setVisible(false);

    $('#spheres').removeClass('selectedScene');
    $('#particles').addClass('selectedScene');
    $('#box').removeClass('selectedScene');
  });
});

$(function() {
  $('#box').click(function() {
    webgl.meshes[0].setVisible(false);
    webgl.meshes[1].setVisible(false);
    webgl.meshes[2].setVisible(true);

    $('#spheres').removeClass('selectedScene');
    $('#particles').removeClass('selectedScene');
    $('#box').addClass('selectedScene');
  });
});
