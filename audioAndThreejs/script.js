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
  const directionalLight = new THREE.DirectionalLight(0xAAAAAA, 0.8);
  directionalLight.position.set(1, 1, 1)
  scene.add(ambientLight, directionalLight);

  const group = new THREE.Group();
  scene.add(group);
  const SIZE = 3000;
  const LENGTH = 1024;
  const meshes = [];
  for (let i=0; i<LENGTH; i++) {
    const geometry = new THREE.SphereGeometry(40, 32, 32);
    const material = new THREE.MeshLambertMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    meshes.push(mesh);

    meshes[i].position.set(
      SIZE * (Math.random() - 0.5),
      SIZE * (Math.random() - 0.5),
      SIZE * (Math.random() - 0.5),
    );

    group.add(meshes[i]);
  }

  scene.fog = new THREE.FogExp2("#140066", 0.035);

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
            const s = frequency[i] * 0.01;
            const x = 1 * s + 0.0001;
            const y = 1 * s + 0.0001;
            const z = 1 * s + 0.0001;
            meshes[i].scale.set(x, y, z);
          }
          group.rotation.x += 0.0005;
          group.rotation.y += 0.0005;
          group.rotation.z += 0.0005;

          controls.update();
          renderer.render(scene, camera);

          requestAnimationFrame(animation);
        }
      )();
    },
    console.log
  );
}
