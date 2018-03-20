class Audio{
  constructor(webgl){
    this.webgl = webgl;
    this.isReady = false;

    this.init();
  }

  init(){
    /*
    navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
      getUserMedia: function(c) {
        return new Promise(function(y, n) {
          (navigator.mozGetUserMedia ||
           navigator.webkitGetUserMedia).call(navigator, c, y, n)
        });
      }
    } : null);
    */

    this.webgl.render_random();
  }

  start(){
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.timeDomain = new Float32Array(this.analyser.frequencyBinCount);
    this.frequency = new Uint8Array(this.analyser.frequencyBinCount);

    this.analyser.fftSize = 1024;

    if (!navigator.mediaDevices){
      console.log("getUserMedia() is NOT supported.");
    }else{
      console.log("getUserMedia() is supported.");
    }

    const constraints = {audio: true, video: false};
    const _this = this;

    // navigator.mediaDevices.getUserMedia(constraints).then(_handleSuccess)
    navigator.getUserMedia(
      constraints,
      _handleSuccess, _handleError
    );
    function _handleSuccess(stream){
      const wrap = document.getElementById("overlayWrap");
      const btn = document.getElementById("overlay");
      wrap.style.zIndex = 100;
      btn.style.zIndex = 101;
      btn.addEventListener("click", () => {
        btn.style.zIndex = -100;
      wrap.style.zIndex = -100;
        _handleClick(stream);
      }, false);
    }
    function _handleError(){
    }

    function _handleClick(stream){
      document.querySelector("audio").src = URL.createObjectURL(stream);
      _this.audioContext.createMediaStreamSource(stream).connect(_this.analyser);

      (function animation(){
        _this.analyser.getFloatTimeDomainData(_this.timeDomain);
        _this.analyser.getByteFrequencyData(_this.frequency);

        _this.webgl.render();

        requestAnimationFrame(animation);
      })();
    }
  }
}
