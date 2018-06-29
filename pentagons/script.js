var c, cw, ch, mx, my, gl;
var startTime;
var time = 0.0;
var tempTime = 0.0;
var uniLocation = new Array();

window.onload = function(){
  const webgl = new Webgl("glsl/pentagons");
}

class Webgl{
  constructor(glsl_file){
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

    // this.render();
      
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
    startTime = new Date().getTime();

    const _this = this;
    (function animation(){
      _this.render();
      requestAnimationFrame(animation);
    })();
  };

  mouseMove(e){
    mx = e.offsetX / cw;
    my = e.offsetY / ch;
  }

  render(){
    // time = (new Date().getTime() - startTime) * 0.001;
    time = (new Date().getTime() % (1000*60*60)) * 0.001;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uniLocation[0], time + tempTime);
    gl.uniform2fv(uniLocation[1], [mx, my]);
    gl.uniform2fv(uniLocation[2], [cw, ch]);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.flush();
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
}

$(function() {
  $('#helpDiv').click(function() {
    $('.code').toggleClass('openNav');
    $('#helpDiv').toggleClass('openNav');
  });
});
