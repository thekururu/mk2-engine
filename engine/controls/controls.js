// engine/controls/controls.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene, camera, renderer } from "../scene/scene.js";

export let selectedObject = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let isDragging = false;
let dragPlane = new THREE.Plane();
let dragOffset = new THREE.Vector3();

// ==========================
// INICIALIZAR CONTROLES
// ==========================
export function initControls() {
  renderer.domElement.addEventListener("mousedown", onMouseDown);
  renderer.domElement.addEventListener("mousemove", onMouseMove);
  renderer.domElement.addEventListener("mouseup", onMouseUp);

  console.log("🕹 Controles inicializados");
}

// ==========================
// MOUSE DOWN → SELECCIONAR
// ==========================
function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // 🔥 SOLO MESHES
  const meshes = scene.children.filter(o => o.isMesh);
  const intersects = raycaster.intersectObjects(meshes, true);

  if (intersects.length === 0) return;

  selectedObject = intersects[0].object;

  dragPlane.setFromNormalAndCoplanarPoint(
    camera.getWorldDirection(dragPlane.normal),
    selectedObject.position
  );

  const intersectPoint = new THREE.Vector3();
  raycaster.ray.intersectPlane(dragPlane, intersectPoint);
  dragOffset.copy(intersectPoint).sub(selectedObject.position);

  isDragging = true;
}

// ==========================
// MOUSE MOVE → ARRASTRAR
// ==========================
function onMouseMove(event) {
  if (!isDragging || !selectedObject) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersectPoint = new THREE.Vector3();
  if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
    selectedObject.position.copy(intersectPoint.sub(dragOffset));
  }
}

// ==========================
// MOUSE UP → SOLTAR
// ==========================
function onMouseUp() {
  isDragging = false;
}
