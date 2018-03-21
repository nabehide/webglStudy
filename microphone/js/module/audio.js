class Audio{
  constructor(webgl){
    this.webgl = webgl;
    this.init();
  }

  init(){
  }

  start(){
    const _this = this

    const btn = document.getElementById("overlay");

    /*
    navigator.getUserMedia({
      audio: true
    }, _handleSuccess, _handleError);
    */
    navigator.mediaDevices.getUserMedia({audio: true}).then(_handleSuccess)

    function _handleSuccess(evt) {
      btn.addEventListener("click", () => {
        _handleClick(evt);
      }, false);
    }

    function _handleError() {
      alert("Error!");
    }

    function _handleClick(evt) {
      const LENGTH = 16;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const options  = {mediaStream : evt};
      const src = audioCtx.createMediaStreamSource(evt);
      const analyser = audioCtx.createAnalyser(evt);
      _this.data = new Uint8Array(LENGTH);

      btn.classList.add("off");
      analyser.fftSize = 1024;
      src.connect(analyser);

      (function animation(){
        analyser.getByteFrequencyData(_this.data);

        _this.webgl.render();

        requestAnimationFrame(animation);
      })();
    }
  }
}
