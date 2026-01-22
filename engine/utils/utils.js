// engine/utils/utils.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene, camera, renderer } from "../scene/scene.js";

// ==========================
// PANTALLA COMPLETA
// ==========================
export function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ==========================
// EXPORTAR ESCENA (JSON)
// ==========================
export function exportSceneJSON() {
  const data = scene.toJSON();
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "scene.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ==========================
// CAPTURAR SCREENSHOT PNG
// ==========================
export function captureScreenshot() {
  renderer.render(scene, camera);

  const dataURL = renderer.domElement.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "screenshot.png";
  a.click();
}

// ==========================
// GRID ON / OFF
// ==========================
export function toggleGrid() {
  const grid = scene.children.find(
    obj => obj.type === "GridHelper"
  );

  if (grid) {
    grid.visible = !grid.visible;
  }
}

// ==========================
// HELPERS DE TRANSFORMACIÓN
// ==========================
export function setPosition(obj, x, y, z) {
  if (!obj) return;
  obj.position.set(x, y, z);
}

export function setRotation(obj, x, y, z) {
  if (!obj) return;
  obj.rotation.set(
    THREE.MathUtils.degToRad(x),
    THREE.MathUtils.degToRad(y),
    THREE.MathUtils.degToRad(z)
  );
}

export function setScale(obj, x, y, z) {
  if (!obj) return;
  obj.scale.set(x, y, z);
}

// ==========================
// BORRAR OBJETO
// ==========================
export function deleteObject(obj) {
  if (!obj) return;
  scene.remove(obj);
}
