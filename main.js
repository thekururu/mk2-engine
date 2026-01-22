importScene();

let scene, camera, renderer, controls;
let selectedObject = null;
let texture = null;

function importScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202020);

  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.set(3, 3, 5);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene"),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
