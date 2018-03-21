class Audio{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
  }

  init(){
    this.webgl.render_random();
  }

  start(){
    const _this = this

    /*
    navigator.getUserMedia({
      audio: true
    }, _handleSuccess, _handleError);
    */
    navigator.mediaDevices.getUserMedia({audio: true}).then(_handleSuccess)

    function _handleSuccess(evt) {

      const wrap = document.getElementById("overlayWrap");
      const btn = document.getElementById("overlay");
      wrap.style.zIndex = 100;
      btn.style.zIndex = 101;

      btn.addEventListener("click", () => {

        /*
        btn.classList.add("off");
        */
        wrap.style.zIndex = -100;
        btn.style.zIndex = -100;

        _handleClick(evt);
      }, false);
    }

    function _handleError() {
      alert("Error!");
    }

    function _handleClick(evt) {

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const options  = {mediaStream : evt};
      const src = audioCtx.createMediaStreamSource(evt);
      const analyser = audioCtx.createAnalyser(evt);
      analyser.fftSize = 1024;
      src.connect(analyser);
      _this.data = new Uint8Array(analyser.fftSize);

      (function animation(){
        analyser.getByteFrequencyData(_this.data);

        _this.webgl.render();

        requestAnimationFrame(animation);
      })();
    }
  }
}
