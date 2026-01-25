import * as THREE from "../three.js";
import { scene, camera, renderer } from "../scene/scene.js";

export let selectedObject = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function initControls() {
  renderer.domElement.addEventListener("mousedown", onMouseDown);
}

function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(scene.children);

  if (hits.length > 0) {
    selectObject(hits[0].object);
  }
}

function selectObject(obj) {
  if (selectedObject) {
    selectedObject.material.emissive?.set(0x000000);
  }

  selectedObject = obj;
  selectedObject.material.emissive = new THREE.Color(0x00ff00);

  console.log("🎯 Seleccionado:", selectedObject);
}
