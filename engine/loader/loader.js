// engine/loader/loader.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { scene, selectedObject } from "../scene/scene.js";

// ==========================
// CARGAR TEXTURA PNG
// ==========================
export function loadTextureFromFile(file, onLoad) {
  const reader = new FileReader();

  reader.onload = () => {
    const texture = new THREE.TextureLoader().load(reader.result);
    texture.flipY = false;
    texture.needsUpdate = true;

    if (onLoad) onLoad(texture);
  };

  reader.readAsDataURL(file);
}

// ==========================
// APLICAR TEXTURA AL OBJETO SELECCIONADO
// ==========================
export function applyTexture(texture) {
  if (!selectedObject) return;

  selectedObject.material.map = texture;
  selectedObject.material.needsUpdate = true;
}

// ==========================
// CARGAR MODELO 3D (.glb / .gltf)
// ==========================
export function loadModelFromFile(file) {
  const reader = new FileReader();
  const loader = new GLTFLoader();

  reader.onload = () => {
    loader.parse(
      reader.result,
      "",
      gltf => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);
      },
      error => {
        console.error("Error cargando modelo:", error);
      }
    );
  };

  reader.readAsArrayBuffer(file);
}
