/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_module_webgl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/module/webgl.js */ \"./src/js/module/webgl.js\");\n/* harmony import */ var _src_js_module_microphone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/js/module/microphone.js */ \"./src/js/module/microphone.js\");\n/* harmony import */ var _src_js_module_audio_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/js/module/audio.js */ \"./src/js/module/audio.js\");\n/* harmony import */ var _src_js_scene_particles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/js/scene/particles.js */ \"./src/js/scene/particles.js\");\n/* harmony import */ var _src_js_scene_spheres_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/js/scene/spheres.js */ \"./src/js/scene/spheres.js\");\n/* harmony import */ var _src_js_scene_box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/js/scene/box.js */ \"./src/js/scene/box.js\");\n/* harmony import */ var _src_js_module_resize_watch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/js/module/resize-watch.js */ \"./src/js/module/resize-watch.js\");\n\n\n\n\n\n\n\n\n\n\n\nconst webgl = new _src_js_module_webgl_js__WEBPACK_IMPORTED_MODULE_0__[\"Webgl\"]();\n\nwindow.onload = function(){\n\n  \"use strict\";\n\n  webgl.meshes.push(new _src_js_scene_spheres_js__WEBPACK_IMPORTED_MODULE_4__[\"Spheres\"](webgl));\n  webgl.meshes.push(new _src_js_scene_particles_js__WEBPACK_IMPORTED_MODULE_3__[\"Particles\"](webgl));\n  webgl.meshes.push(new _src_js_scene_box_js__WEBPACK_IMPORTED_MODULE_5__[\"Box\"](webgl));\n\n  webgl.meshes[0].setVisible(false);\n  webgl.meshes[1].setVisible(true);\n  webgl.meshes[2].setVisible(false);\n\n  // webgl.microphone = new Microphone(webgl);\n  // webgl.microphone.start();\n\n  webgl.audio = new _src_js_module_audio_js__WEBPACK_IMPORTED_MODULE_2__[\"Audio\"](webgl);\n}\n\n$(function() {\n  $('#spheres').click(function() {\n    webgl.meshes[0].setVisible(true);\n    webgl.meshes[1].setVisible(false);\n    webgl.meshes[2].setVisible(false);\n\n    $('#spheres').addClass('selectedScene');\n    $('#particles').removeClass('selectedScene');\n    $('#box').removeClass('selectedScene');\n  });\n});\n\n$(function() {\n  $('#particles').click(function() {\n    webgl.meshes[0].setVisible(false);\n    webgl.meshes[1].setVisible(true);\n    webgl.meshes[2].setVisible(false);\n\n    $('#spheres').removeClass('selectedScene');\n    $('#particles').addClass('selectedScene');\n    $('#box').removeClass('selectedScene');\n  });\n});\n\n$(function() {\n  $('#box').click(function() {\n    webgl.meshes[0].setVisible(false);\n    webgl.meshes[1].setVisible(false);\n    webgl.meshes[2].setVisible(true);\n\n    $('#spheres').removeClass('selectedScene');\n    $('#particles').removeClass('selectedScene');\n    $('#box').addClass('selectedScene');\n  });\n});\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/js/module/audio.js":
/*!********************************!*\
  !*** ./src/js/module/audio.js ***!
  \********************************/
/*! exports provided: Audio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Audio\", function() { return Audio; });\nclass Audio{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.audioContext = (window.AudioContext) ? new AudioContext : new webkitAudioContext;\n    this.init();\n\n    this.btn = document.getElementById(\"overlay\");\n\n    this.loadAudio();\n\n    this.analyze = this.audioContext.createAnalyser();\n    this.analyze.fftSize = 2048;\n    this.frequencyNum = 1024;\n\n    this.data = new Uint8Array(this.analyze.fftSize);\n    // this.data = new Float32Array(this.frequencyNum);\n  }\n\n  init(){\n    this.webgl.render_random();\n  }\n\n  loadAudio(){\n    const _this = this;\n\n    const request = new XMLHttpRequest();\n    request.open(\"GET\", \"data/uo.m4a\", true);\n    request.responseType = \"arraybuffer\"\n\n    request.onload = function(){\n      _this.audioContext.decodeAudioData(request.response, function(buffer){\n        _this.connectNode(buffer);\n      });\n    }.bind(this);\n\n    request.send();\n\n    const help = document.getElementById(\"helpIcon\");\n    help.classList.remove(\"openNav\");\n    const helpDiv = document.getElementById(\"helpDiv\");\n    helpDiv.classList.remove(\"openNav\");\n\n    this.btn.addEventListener(\"click\", () => {\n      this.btn.classList.add(\"off\");\n      help.classList.add(\"openNav\");\n      helpDiv.classList.add(\"openNav\");\n\n      _this.source.start(0);\n\n      (function animation(){\n        _this.analyze.getByteFrequencyData(_this.data);\n        // _this.analyze.getFloatFrequencyData(_this.data);\n\n        _this.webgl.render();\n\n        requestAnimationFrame(animation);\n      })();\n    });\n  };\n\n  connectNode(buffer){\n    if(this.source){\n      this.source.stop();\n    }\n    this.source = this.audioContext.createBufferSource();\n    this.source.buffer = buffer;\n    this.source.loop = true;\n    this.source.connect(this.analyze);\n    this.source.connect(this.audioContext.destination);\n    this.btn.classList.remove(\"off\");\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/module/audio.js?");

/***/ }),

/***/ "./src/js/module/microphone.js":
/*!*************************************!*\
  !*** ./src/js/module/microphone.js ***!
  \*************************************/
/*! exports provided: Microphone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Microphone\", function() { return Microphone; });\nclass Microphone{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.init();\n  }\n\n  init(){\n    this.webgl.render_random();\n  }\n\n  start(){\n    const _this = this\n\n    /*\n    navigator.getUserMedia({\n      audio: true\n    }, _handleSuccess, _handleError);\n    */\n    navigator.mediaDevices.getUserMedia({audio: true}).then(_handleSuccess)\n\n    function _handleSuccess(evt) {\n\n      /*\n      const wrap = document.getElementById(\"overlayWrap\");\n      wrap.style.zIndex = 100;\n      btn.style.zIndex = 101;\n      */\n      const btn = document.getElementById(\"overlay\");\n      btn.classList.remove(\"off\");\n      const help = document.getElementById(\"helpIcon\");\n      help.classList.remove(\"openNav\");\n      const helpDiv = document.getElementById(\"helpDiv\");\n      helpDiv.classList.remove(\"openNav\");\n\n      btn.addEventListener(\"click\", () => {\n\n        /*\n        btn.classList.add(\"off\");\n        wrap.style.zIndex = -100;\n        btn.style.zIndex = -100;\n        */\n        btn.classList.add(\"off\");\n        help.classList.add(\"openNav\");\n        helpDiv.classList.add(\"openNav\");\n\n        _handleClick(evt);\n      }, false);\n    }\n\n    function _handleError() {\n      alert(\"Error!\");\n    }\n\n    function _handleClick(evt) {\n\n      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n      const options  = {mediaStream : evt};\n      const src = audioCtx.createMediaStreamSource(evt);\n      const analyser = audioCtx.createAnalyser(evt);\n      analyser.fftSize = 1024;\n      src.connect(analyser);\n      _this.data = new Uint8Array(analyser.fftSize);\n\n      (function animation(){\n        analyser.getByteFrequencyData(_this.data);\n\n        _this.webgl.render();\n\n        requestAnimationFrame(animation);\n      })();\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/module/microphone.js?");

/***/ }),

/***/ "./src/js/module/resize-watch.js":
/*!***************************************!*\
  !*** ./src/js/module/resize-watch.js ***!
  \***************************************/
/*! exports provided: ResizeWatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResizeWatch\", function() { return ResizeWatch; });\nclass ResizeWatch{\n  constructor(){\n    this.instances = [];\n\n    this.width = this._width = document.body.clientWidth;\n    this.height = this._height = window.innerHeight;\n    this.aspect = this.width / this.height;\n\n    window.onresize = function(){\n      if(this.instances.length === 0) return;\n\n      this.width = document.body.clientWidth;\n      this.height = window.innerHeight;\n      this.aspect = this.width / this.height;\n\n      for(let i=0; i<this.instances.length; i++){\n        this.instances[i].resizeUpdate();\n      }\n    }.bind(this)\n  }\n\n  register(instance){\n    this.instances.push(instance);\n  }\n}\n\nwindow.ResizeWatch = new ResizeWatch();\n\n\n//# sourceURL=webpack:///./src/js/module/resize-watch.js?");

/***/ }),

/***/ "./src/js/module/webgl.js":
/*!********************************!*\
  !*** ./src/js/module/webgl.js ***!
  \********************************/
/*! exports provided: Webgl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Webgl\", function() { return Webgl; });\nclass Webgl{\n  constructor(){\n    this.init();\n  }\n\n  init(){\n    window.ResizeWatch.register(this);\n\n    this.scene = new THREE.Scene();\n\n    this.gui = new dat.GUI({audoPlace: false});\n    this.gui.close();\n    const customContainer = document.getElementById(\"guiContainer\");\n    customContainer.appendChild(this.gui.domElement);\n\n    this.setProps();\n\n    this.camera = new THREE.PerspectiveCamera(this.props.fov, this.props.aspect, this.props.near, this.props.far);\n\n    this.renderer = new THREE.WebGLRenderer({\n      canvas: document.querySelector(\"#canvas\")\n    })\n    this.renderer.setPixelRatio(window.devicePixelRatio);\n    this.renderer.setClearColor(0x000000, 1);\n    this.renderer.setSize(window.ResizeWatch.width, window.ResizeWatch.height);\n\n    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);\n    this.control.enabled = true;\n\n    this.meshes = [];\n\n    this.resizeUpdate();\n  }\n\n  resizeUpdate(){\n    this.setProps();\n    this.renderer.setSize(this.props.width, this.props.height);\n    this.camera.aspect = this.props.aspect;\n  }\n\n  setProps(){\n    const width = window.ResizeWatch.width;\n    const height = window.ResizeWatch.height;\n    const aspect = width / height;\n\n    this.props = {\n      width: width,\n      height: height,\n      aspect: aspect,\n      fov: 45,\n      left: -width / 2,\n      right: width / 2,\n      top: height / 2,\n      bottom: -height / 2,\n      near: 0.1,\n      far: 10000,\n      parent: document.getElementById(\"wrapper\"),\n    };\n  };\n\n  render(){\n    for(let i=0; i<this.meshes.length; i++){\n      this.meshes[i].render()\n    }\n    this.renderer.render(this.scene, this.camera);\n  }\n\n  render_random(){\n    for(let i=0; i<this.meshes.length; i++){\n      this.meshes[i].render_random()\n    }\n    this.renderer.render(this.scene, this.camera);\n    requestAnimationFrame(this.render_random.bind(this));\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/module/webgl.js?");

/***/ }),

/***/ "./src/js/scene/box.js":
/*!*****************************!*\
  !*** ./src/js/scene/box.js ***!
  \*****************************/
/*! exports provided: Box */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Box\", function() { return Box; });\nfunction normRand(m, s){\n  const a = 1 - Math.random();\n  const b = 1 - Math.random();\n  const c = Math.sqrt(-2 * Math.log(a));\n  if (0.5 < Math.random()){\n    return c * Math.sin(Math.PI * 2 * b) * s + m;\n  }else{\n    return c * Math.cos(Math.PI * 2 * b) * s + m;\n  }\n}\n\nclass Box{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.init();\n    this.setGUI();\n  }\n\n  init(){\n    const geometry = new THREE.BoxGeometry(100, 100, 100);\n    const material = new THREE.MeshNormalMaterial();\n    this.mesh = new THREE.Mesh(geometry, material);\n    this.webgl.scene.add(this.mesh)\n  }\n\n  setVisible(select){\n    this.mesh.visible = select;\n    if(select){\n      this.webgl.camera.position.set(0, 500, +1000);\n      this.webgl.camera.lookAt(this.webgl.scene.position);\n      this.webgl.control.enabled = true;\n      this.folder.open();\n    }else{\n      this.folder.close();\n    }\n  }\n\n  setGUI(){\n    this.parameter = new Parameter_box();\n    this.folder = this.webgl.gui.addFolder(\"Box\");\n    this.folder.add(this.parameter, \"speed\", -0.3, 0.3);\n    this.folder.add(this.parameter, \"maxSizeX\", 0, 10.0);\n    this.folder.add(this.parameter, \"minSizeX\", 0, 10.0);\n    this.folder.add(this.parameter, \"freqX\", 0, 1023);\n    this.folder.add(this.parameter, \"maxSizeY\", 0, 10.0);\n    this.folder.add(this.parameter, \"minSizeY\", 0, 10.0);\n    this.folder.add(this.parameter, \"freqY\", 0, 1023);\n    this.folder.add(this.parameter, \"maxSizeZ\", 0, 10.0);\n    this.folder.add(this.parameter, \"minSizeZ\", 0, 10.0);\n    this.folder.add(this.parameter, \"freqZ\", 0, 1023);\n    this.folder.close();\n  }\n\n  render(){\n    const x = this.parameter.freqX;\n    const y = this.parameter.freqY;\n    const z = this.parameter.freqZ;\n    this.mesh.scale.set(\n      this.webgl.audio.data[x] / 100 * (this.parameter.maxSizeX - this.parameter.minSizeX) + this.parameter.minSizeX,\n      this.webgl.audio.data[y] / 100 * (this.parameter.maxSizeY - this.parameter.minSizeY) + this.parameter.minSizeY,\n      this.webgl.audio.data[z] / 100 * (this.parameter.maxSizeZ - this.parameter.minSizeZ) + this.parameter.minSizeZ\n    );\n\n    this.mesh.rotation.y += this.parameter.speed;\n  }\n\n  render_random(){\n    this.mesh.scale.set(\n      normRand(0.5, 0.01) * (this.parameter.maxSizeX - this.parameter.minSizeX) + this.parameter.minSizeX,\n      normRand(0.5, 0.01) * (this.parameter.maxSizeY - this.parameter.minSizeY) + this.parameter.minSizeY,\n      normRand(0.5, 0.01) * (this.parameter.maxSizeZ - this.parameter.minSizeZ) + this.parameter.minSizeZ\n    );\n\n    this.mesh.rotation.y += this.parameter.speed;\n  }\n}\n\nconst Parameter_box = function(){\n  this.speed = 0.01;\n\n  this.maxSizeX = 2.0;\n  this.minSizeX = 0.1;\n  this.freqX = 20;\n\n  this.maxSizeY = 2.0;\n  this.minSizeY = 0.1;\n  this.freqY = 60;\n\n  this.maxSizeZ = 2.0;\n  this.minSizeZ = 0.1;\n  this.freqZ = 80;\n}\n\n\n//# sourceURL=webpack:///./src/js/scene/box.js?");

/***/ }),

/***/ "./src/js/scene/particles.js":
/*!***********************************!*\
  !*** ./src/js/scene/particles.js ***!
  \***********************************/
/*! exports provided: Particles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Particles\", function() { return Particles; });\nfunction normRand(m, s){\n  const a = 1 - Math.random();\n  const b = 1 - Math.random();\n  const c = Math.sqrt(-2 * Math.log(a));\n  if (0.5 < Math.random()){\n    return c * Math.sin(Math.PI * 2 * b) * s + m;\n  }else{\n    return c * Math.cos(Math.PI * 2 * b) * s + m;\n  }\n}\n\nclass Particles{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.init();\n    this.setGUI();\n  }\n\n  init(){\n    this.createMesh();\n\n    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);\n    this.ambientLight.visible = false;\n    this.webgl.scene.add(this.ambientLight);\n  }\n\n  createMesh(){\n    const SIZE = 1000;\n    const SCALE = 30;\n    this.MAX_LENGTH = 256;\n    this.LENGTH = 64;\n\n    this.group = new THREE.Group();\n    this.webgl.scene.add(this.group);\n\n    this.meshes = []\n    for(let i=0; i<this.LENGTH; i++){\n      const geometry = new THREE.PlaneBufferGeometry(SCALE, SCALE);\n      const texture = new THREE.Texture(this.createCircleCanvas());\n      texture.needsUpdate = true;\n      const material = new THREE.MeshPhongMaterial({\n        map: texture,\n        blending: THREE.AdditiveBlending,\n        transparent: true,\n        fog: false,\n      });\n      const mesh = new THREE.Mesh(geometry, material);\n      this.meshes.push(mesh);\n      this.meshes[i].position.set(\n        SIZE * (Math.random() - 0.5),\n        SIZE * (Math.random() - 0.5),\n        SIZE * (Math.random() - 0.5),\n      );\n      this.group.add(this.meshes[i]);\n    }\n  }\n\n  createCircleCanvas(){\n    const canvas = document.createElement(\"canvas\");\n    const SIZE = 128;\n    const HALF = SIZE / 2;\n    const CENTER = SIZE / 2;\n    canvas.width = SIZE;\n    canvas.height = SIZE;\n    const context = canvas.getContext(\"2d\");\n    context.lineWidth = 0;\n\n    context.beginPath();\n    context.arc(CENTER, CENTER, HALF, 0, 2 * Math.PI, false);\n    const grad = context.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, HALF);\n    const color = new THREE.Color();\n    const h = 210 + 60 * Math.random();\n    const s = 40 + 20 * Math.random()\n    const l = 30 + 20 * Math.random()\n    color.setHSL(h / 360, s / 100, l / 100);\n    grad.addColorStop(0, color.getStyle());\n    grad.addColorStop(1, \"#000000\");\n    context.fillStyle = grad;\n    context.fill();\n    context.closePath();\n    return canvas;\n  }\n\n  setGUI(){\n    this.parameter = new Parameter_particles();\n    this.folder = this.webgl.gui.addFolder(\"Particles\");\n    this.folder.add(this.parameter, \"speed\", 0, 0.003);\n    this.folder.add(this.parameter, \"maxSize\", 0, 50.0);\n    this.folder.add(this.parameter, \"minSize\", 0, 50.0);\n    this.folder.close();\n  }\n\n  setVisible(select){\n    this.group.visible = select;\n    this.ambientLight.visible = select;\n\n    if(select){\n      this.webgl.control.enabled = false;\n      this.webgl.camera.lookAt(this.webgl.scene.position);\n      this.webgl.camera.position.set(0, 0, +1000);\n      this.webgl.camera.rotation.set(0, 0, 0);\n      this.folder.open();\n    }else{\n      this.folder.close();\n    }\n  }\n\n  render(){\n    for(let i=0; i<this.LENGTH; i++){\n      const size = this.webgl.audio.data[i * this.MAX_LENGTH / this.LENGTH] / 100 * (this.parameter.maxSize - this.parameter.minSize) + this.parameter.minSize;\n      this.meshes[i].scale.set(size, size, size);\n    }\n\n    this.group.rotation.z += this.parameter.speed;\n  }\n\n  render_random(){\n    for(let i=0; i<this.LENGTH; i++){\n      const speed = normRand(0, 0.1);\n      const size = this.meshes[i].scale.x + speed;\n      this.meshes[i].scale.set(size, size, size);\n    }\n\n    this.group.rotation.z += this.parameter.speed;\n  }\n}\n\nconst Parameter_particles = function(){\n  this.speed = 0.0003;\n  this.maxSize = 3;\n  this.minSize = 0.3;\n}\n\n\n//# sourceURL=webpack:///./src/js/scene/particles.js?");

/***/ }),

/***/ "./src/js/scene/spheres.js":
/*!*********************************!*\
  !*** ./src/js/scene/spheres.js ***!
  \*********************************/
/*! exports provided: Spheres */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Spheres\", function() { return Spheres; });\nfunction normRand(m, s){\n  const a = 1 - Math.random();\n  const b = 1 - Math.random();\n  const c = Math.sqrt(-2 * Math.log(a));\n  if (0.5 < Math.random()){\n    return c * Math.sin(Math.PI * 2 * b) * s + m;\n  }else{\n    return c * Math.cos(Math.PI * 2 * b) * s + m;\n  }\n}\n\nclass Spheres{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.init();\n    this.setGUI();\n  }\n\n  init(){\n    this.createMesh();\n\n    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);\n    this.webgl.scene.add(this.ambientLight);\n    this.ambientLight.visible = false;\n\n    this.webgl.scene.fog = new THREE.FogExp2(\"#140066\", 0.035);\n    this.webgl.scene.fog.visible = false;\n  }\n\n  createMesh(){\n    const SIZE = 1500;\n    const SCALE = 30;\n    this.MAX_LENGTH = 256;\n    this.LENGTH = 64;\n\n    this.group = new THREE.Group();\n    this.webgl.scene.add(this.group);\n\n    this.meshes = []\n    for(let i=0; i<this.LENGTH; i++){\n      const geometry = new THREE.SphereGeometry(1, 32, 32);\n      const material = new THREE.MeshLambertMaterial();\n      const mesh = new THREE.Mesh(geometry, material);\n      this.meshes.push(mesh);\n      this.meshes[i].position.set(\n        SIZE * (Math.random() - 0.5),\n        SIZE * (Math.random() - 0.5),\n        SIZE * (Math.random() - 0.5),\n      );\n      this.group.add(this.meshes[i]);\n    }\n  }\n\n  setGUI(){\n    this.parameter = new Parameter_spheres();\n    this.folder = this.webgl.gui.addFolder(\"Spheres\");\n    this.folder.add(this.parameter, \"speed\", -0.01, 0.01);\n    this.folder.add(this.parameter, \"maxSize\", 0, 200.0);\n    this.folder.add(this.parameter, \"minSize\", 0, 200.0);\n    this.folder.close();\n  }\n\n  setVisible(select){\n    this.group.visible = select;\n    this.ambientLight.visible = select;\n    this.webgl.scene.fog.visible = select;\n\n    if(select){\n      this.webgl.camera.lookAt(this.webgl.scene.position);\n      this.webgl.camera.position.set(0, 0, +1000);\n      this.webgl.control.enabled = true;\n      this.folder.open();\n    }else{\n      this.folder.close()\n    }\n  }\n\n  render(){\n    for(let i=0; i<this.LENGTH; i++){\n      const size = this.webgl.audio.data[i * this.MAX_LENGTH / this.LENGTH] / 100 * (this.parameter.maxSize - this.parameter.minSize) + this.parameter.minSize;\n      this.meshes[i].scale.set(size, size, size);\n    }\n\n    this.group.rotation.x += this.parameter.speed;\n    this.group.rotation.y += this.parameter.speed;\n    this.group.rotation.z += this.parameter.speed;\n  }\n\n  render_random(){\n    for(let i=0; i<this.LENGTH; i++){\n      const size = this.meshes[i].scale.x + normRand(0, 0.3);\n      this.meshes[i].scale.set(size, size, size);\n    }\n\n    this.group.rotation.x += this.parameter.speed;\n    this.group.rotation.y += this.parameter.speed;\n    this.group.rotation.z += this.parameter.speed;\n  }\n}\n\nconst Parameter_spheres = function(){\n  this.speed = 0.0005;\n  this.maxSize = 50.0;\n  this.minSize = 30.0;\n}\n\n\n//# sourceURL=webpack:///./src/js/scene/spheres.js?");

/***/ })

/******/ });