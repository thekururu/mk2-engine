// engine/scene/scene.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

export let scene;
export let camera;
export let renderer;
export let controls;
export let selectedObject = null;

export function initScene(canvasId) {
  // ESCENA
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1e1e1e);

  // CÁMARA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(4, 4, 6);

  // RENDER
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById(canvasId),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // CONTROLES
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // LUCES
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambLight);

  // GRID (editor style)
  const grid = new THREE.GridHelper(20, 20);
  scene.add(grid);

  // RESIZE
  window.addEventListener("resize", onResize);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 👉 CREA UN OBJETO BASE (CUBO)
export function createCube(texture = null) {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    map: texture
  });

  const cube = new THREE.Mesh(geo, mat);
  cube.position.y = 0.5;
  scene.add(cube);
  selectedObject = cube;

  return cube;
}

// 👉 MOVER OBJETO CON EL MOUSE
export function enableMouseMove() {
  window.addEventListener("mousemove", e => {
    if (!selectedObject) return;
    if (e.buttons !== 1) return;

    selectedObject.position.x += e.movementX * 0.01;
    selectedObject.position.z += e.movementY * 0.01;
  });
}
