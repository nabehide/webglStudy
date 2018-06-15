var c, cw, ch, mx, my, gl;
var startTime;
var time = 0.0;
var tempTime = 0.0;
var uniLocation = new Array();

window.onload = function(){
  const webgl = new Webgl("glsl/pot");
  const audio = new Audio("glsl/sound.frag");

  const waitUntilImportShader = function() {
    if(webgl.isReady && audio.isReady){
      webgl.start();
      audio.start();
      return;
    }
    console.log(webgl.isReady);
    console.log(audio.isReady);
    clearTimeout(id);
    id = setTimeout(waitUntilImportShader, 1000);
  }
  id =  setTimeout(waitUntilImportShader, 1000);
}

class Audio{
  constructor(glsl_file){
    this.isReady = false;
    this.DURATION = 6; // Loop 3 sec

    // Size of render target
    this.WIDTH = 512;
    this.HEIGHT = 512;

    this.fragShader = [glsl_file];
    this.importFrag(0);
  }

  importFrag(idx){
    const _this = this;
    const myRequest = new XMLHttpRequest;
    myRequest.onreadystatechange = function(){
      if(myRequest.readyState === 4){
        _this.fragmentShader = myRequest.response;
        _this.completeImport();
      }
    }
    myRequest.open("GET", _this.fragShader[idx], true);
    myRequest.send();
  }

  completeImport(){
    this.init();
  }

  init(){
    // Create audio context
    const ctx = new window.AudioContext();
    this.node = ctx.createBufferSource();
    this.node.connect(ctx.destination);
    this.node.loop = true;
    this.audioBuffer = ctx.createBuffer(2, ctx.sampleRate * this.DURATION, ctx.sampleRate);

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const wctx = renderer.getContext();

    // Create scenes
    const uniforms = {
      iBlockOffset: { type: 'f', value: 0.0 },
      iSampleRate: { type: 'f', value: ctx.sampleRate },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const fragmentShader = this.fragmentShader;
    const material = new THREE.ShaderMaterial({ uniforms, fragmentShader });
    const plane = new THREE.Mesh(geometry, material);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.set(0, 0, 1);
    camera.lookAt(scene.position);
    scene.add(plane);
    const target = new THREE.WebGLRenderTarget(this.WIDTH, this.HEIGHT);

    // Render
    const samples = this.WIDTH * this.HEIGHT;
    const numBlocks = (ctx.sampleRate * this.DURATION) / samples;
    for (let i = 0; i < numBlocks; i++) {
      // Update uniform & Render
      uniforms.iBlockOffset.value = i * samples / ctx.sampleRate;
      renderer.render(scene, camera, target, true);

      // Read pixels
      const pixels = new Uint8Array(this.WIDTH * this.HEIGHT * 4);
      wctx.readPixels(0, 0, this.WIDTH, this.HEIGHT, wctx.RGBA, wctx.UNSIGNED_BYTE, pixels);

      // Convert pixels to samples
      const outputDataL = this.audioBuffer.getChannelData(0);
      const outputDataR = this.audioBuffer.getChannelData(1);
      for (let j = 0; j < samples; j++) {
        outputDataL[i * samples + j] = (pixels[j * 4 + 0] + 256 * pixels[j * 4 + 1]) / 65535 * 2 - 1;
        outputDataR[i * samples + j] = (pixels[j * 4 + 2] + 256 * pixels[j * 4 + 3]) / 65535 * 2 - 1;
      }
    }
    this.isReady = true;
  }

  start(){
    // Play
    this.node.buffer = this.audioBuffer;
    this.node.start(0);
  }
}

class Webgl{
  constructor(glsl_file){
    this.isReady = false;

    c = document.getElementById('canvas');
      
    const size = Math.min(window.innerWidth, window.innerHeight);
    cw = size; ch = size;
    c.width = cw; c.height = ch;
      
    c.addEventListener('mousemove', this.mouseMove, true);
      
    gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      
    this.vertShader = [glsl_file+".vert"]
    this.fragShader = [glsl_file+".frag"]

    this.shaderLength = this.vertShader.length + this.fragShader.length;
    this.shaderCount = 0;

    for(let i=0; i<this.vertShader.length; i++){
      this.importVert(i);
    }
    for(let i=0; i<this.fragShader.length; i++){
      this.importFrag(i);
    }
  }

  importVert(idx){
    const _this = this;
    const myRequest = new XMLHttpRequest;
    myRequest.onreadystatechange = function(){
      if(myRequest.readyState === 4){
        var scriptElement = myRequest.response;
        if(!scriptElement){return;}
        _this.vertShader[idx] = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(_this.vertShader[idx], scriptElement);
        gl.compileShader(_this.vertShader[idx]);
        if(gl.getShaderParameter(_this.vertShader[idx], gl.COMPILE_STATUS)){
          _this.completeImport();
        }else{
          alert(gl.getShaderInfoLog(_this.vertShader[idx]));
          console.log(gl.getShaderInfoLog(_this.vertShader[idx]));
        }
      }
    }
    myRequest.open("GET", _this.vertShader[idx], true);
    myRequest.send();
  }

  importFrag(idx){
    const _this = this;
    const myRequest = new XMLHttpRequest;
    myRequest.onreadystatechange = function(){
      if(myRequest.readyState === 4){

        var scriptElement = myRequest.response;
        if(!scriptElement){return;}
        _this.fragShader[idx] = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(_this.fragShader[idx], scriptElement);
        gl.compileShader(_this.fragShader[idx]);
        if(gl.getShaderParameter(_this.fragShader[idx], gl.COMPILE_STATUS)){
          _this.completeImport();
        }else{
          alert(gl.getShaderInfoLog(_this.fragShader[idx]));
          console.log(gl.getShaderInfoLog(_this.fragShader[idx]));
        }

      }
    }
    myRequest.open("GET", _this.fragShader[idx], true);
    myRequest.send();
  }

  completeImport(){
    this.shaderCount++;
    if(this.shaderCount == this.shaderLength){
      this.prg = this.create_program(this.vertShader[0], this.fragShader[0]);
      this.init();
    }
  }

  init(){
    uniLocation[0] = gl.getUniformLocation(this.prg, 'time');
    uniLocation[1] = gl.getUniformLocation(this.prg, 'mouse');
    uniLocation[2] = gl.getUniformLocation(this.prg, 'resolution');

    var position = [
      -1.0,  1.0,  0.0,
       1.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0
    ];
    var index = [
      0, 2, 1,
      1, 2, 3
    ];
    var vPosition = this.create_vbo(position);
    var vIndex = this.create_ibo(index);
    var vAttLocation = gl.getAttribLocation(this.prg, 'position');
    gl.bindBuffer(gl.ARRAY_BUFFER, vPosition);
    gl.enableVertexAttribArray(vAttLocation);
    gl.vertexAttribPointer(vAttLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vIndex);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    mx = 0.5; my = 0.5;
    this.isReady = true;
  };

  start(){
    startTime = new Date().getTime();
    const _this = this;
    (function animation(){
      _this.render();
      requestAnimationFrame(animation);
    })();
  }

  mouseMove(e){
    mx = e.offsetX / cw;
    my = e.offsetY / ch;
  }

  create_shader(id){
    var shader;

    var scriptElement = document.getElementById(id);

    if(!scriptElement){return;}

    switch(scriptElement.type){
      
      case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;
        
      case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      default :
        return;
    }

    gl.shaderSource(shader, scriptElement.text);

    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      
      return shader;
    }else{
      
      alert(gl.getShaderInfoLog(shader));
      console.log(gl.getShaderInfoLog(shader));
    }
  }

  create_program(vs, fs){
    var program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if(gl.getProgramParameter(program, gl.LINK_STATUS)){

      gl.useProgram(program);
      
      return program;
    }else{
      
      return null;
    }
  }

  create_vbo(data){
    var vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
  }

  create_ibo(data){
    var ibo = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
  }

  render(){
    time = (new Date().getTime() - startTime) * 0.001;
    // time = (new Date().getTime() % (1000*60*60)) * 0.001;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uniLocation[0], time + tempTime);
    gl.uniform2fv(uniLocation[1], [mx, my]);
    gl.uniform2fv(uniLocation[2], [cw, ch]);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.flush();
  }
}

$(function() {
  $('#helpDiv').click(function() {
    $('.code').toggleClass('openNav');
    $('#helpDiv').toggleClass('openNav');
  });
});
