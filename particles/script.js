(function (){
  const canvas = document.getElementById('canvas');
  const container = document.getElementById('wrapper');
  sizing();

  function sizing() {
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
  }

  window.addEventListener('resize', function(){
    (!window.requestAnimationFrame) ? setTimeout(sizing, 300): window.requestAnimationFrame(sizing);
  });
})();

window.addEventListener('load', init);

function init() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(ambientLight);

  scene.fog = new THREE.FogExp2("#140066", 0.035);

  const group = new THREE.Group()
  scene.add(group);
  const SIZE = 3000;
  const MAX_LENGTH = 1024;
  const LENGTH = 256;
  const meshes = []
  const SCALE = 30;
  for (let i=0; i<LENGTH; i++) {
    const geometry = new THREE.PlaneBufferGeometry(SCALE, SCALE);
    const texture = new THREE.Texture(createCircleCanvas());
    texture.needsUpdate = true;
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      fog: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    meshes.push(mesh);
    meshes[i].position.set(
      SIZE * (Math.random() - 0.5),
      SIZE * (Math.random() - 0.5),
      SIZE * (Math.random() - 0.5),
    );
    group.add(meshes[i]);
  }

  function createCircleCanvas() {
    const canvas = document.createElement("canvas");
    const SIZE = 128;
    const HALF = SIZE / 2;
    const CENTER = SIZE / 2;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const context = canvas.getContext("2d");
    context.lineWidth = 0;
    context.beginPath();
    context.arc(CENTER, CENTER, HALF, 0, 2 * Math.PI, false);
    const grad = context.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, HALF);
    const color = new THREE.Color();
    const h = 210 + 60 * Math.random();
    const s = 40 + 20 * Math.random();
    const l = 30 + 20 * Math.random();
    color.setHSL(h / 360, s / 100, l / 100);
    grad.addColorStop(0, color.getStyle());
    grad.addColorStop(1, "#000000");
    context.fillStyle = grad;
    context.fill();
    context.closePath();
    return canvas;
  }

  navigator.getUserMedia(
    {audio: true},
    function(stream){
      document.querySelector('audio').src = URL.createObjectURL(stream);
      var audioContext = new AudioContext();
      var analyser = audioContext.createAnalyser();
      var timeDomain = new Float32Array(analyser.frequencyBinCount);
      var frequency = new Uint8Array(analyser.frequencyBinCount);
      audioContext.createMediaStreamSource(stream).connect(analyser);

      (function animation()
        {
          analyser.getFloatTimeDomainData(timeDomain);
          analyser.getByteFrequencyData(frequency);

          for (let i=0; i<LENGTH; i++) {
            const s = frequency[i * MAX_LENGTH / LENGTH] * 0.05 + 0.0001;
            meshes[i].scale.set(s, s, s);
          }

          group.rotation.z += 0.0003;

          controls.update();
          renderer.render(scene, camera);

          requestAnimationFrame(animation);
        }
      )();
    },
    console.log
  );
}
