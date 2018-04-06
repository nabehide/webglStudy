export class Audio{
  constructor(webgl){
    this.webgl = webgl;
    this.audioContext = (window.AudioContext) ? new AudioContext : new webkitAudioContext;
    this.init();

    this.btn = document.getElementById("overlay");

    this.loadAudio();

    this.analyze = this.audioContext.createAnalyser();
    this.analyze.fftSize = 2048;
    this.frequencyNum = 1024;

    this.data = new Uint8Array(this.analyze.fftSize);
    // this.data = new Float32Array(this.frequencyNum);
  }

  init(){
    this.webgl.render_random();
  }

  loadAudio(){
    const _this = this;

    const request = new XMLHttpRequest();
    request.open("GET", "data/uo.m4a", true);
    request.responseType = "arraybuffer"

    request.onload = function(){
      _this.audioContext.decodeAudioData(request.response, function(buffer){
        _this.connectNode(buffer);
      });
    }.bind(this);

    request.send();

    const help = document.getElementById("helpIcon");
    help.classList.remove("openNav");
    const helpDiv = document.getElementById("helpDiv");
    helpDiv.classList.remove("openNav");

    this.btn.addEventListener("click", () => {
      this.btn.classList.add("off");
      help.classList.add("openNav");
      helpDiv.classList.add("openNav");

      _this.source.start(0);

      (function animation(){
        _this.analyze.getByteFrequencyData(_this.data);
        // _this.analyze.getFloatFrequencyData(_this.data);

        _this.webgl.render();

        requestAnimationFrame(animation);
      })();
    });
  };

  connectNode(buffer){
    if(this.source){
      this.source.stop();
    }
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true;
    this.source.connect(this.analyze);
    this.source.connect(this.audioContext.destination);
    this.btn.classList.remove("off");
  }
}
