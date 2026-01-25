// engine/scene/scene.js
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// ==========================
// CREAR CUBO
// ==========================
export function createCube() {
  const geo = new THREE.BoxGeometry();
  const mat = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geo, mat);

  cube.position.x = Math.random() * 2 - 1;
  cube.position.y = Math.random() * 2 - 1;

  scene.add(cube);
  console.log("🧊 Cubo creado");
}

// ==========================
// LOOP
// ==========================
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
