// engine/scene/scene.js
import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";

// ==========================
// ESCENA BÁSICA
// ==========================
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// ==========================
// CÁMARA
// ==========================
export const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// ==========================
// RENDERER
// ==========================
export const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("viewport"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ==========================
// LUZ
// ==========================
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// ==========================
// OBJETOS
// ==========================
const objects = [];

// ==========================
// CREAR CUBO (ESTO FALTABA)
// ==========================
export function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.y = 0.5;
  scene.add(cube);
  objects.push(cube);

  console.log("🟩 Cubo creado");
  return cube;
}

// ==========================
// LOOP
// ==========================
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// ==========================
// RESIZE
// ==========================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log("🎬 scene.js cargado");
