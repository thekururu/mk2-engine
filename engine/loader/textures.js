// engine/loader/textures.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { selectedObject } from "../scene/scene.js";

// Almacén de texturas cargadas
export const textures = {};

// ==========================
// CARGAR TEXTURA DESDE ARCHIVO
// ==========================
export function loadTexture(file, name, onLoad) {
  const reader = new FileReader();

  reader.onload = () => {
    const texture = new THREE.TextureLoader().load(reader.result);
    texture.flipY = false;
    texture.needsUpdate = true;

    textures[name] = texture;

    if (onLoad) onLoad(texture);
  };

  reader.readAsDataURL(file);
}

// ==========================
// APLICAR TEXTURA AL OBJETO SELECCIONADO
// ==========================
export function applyTextureByName(name) {
  if (!selectedObject) return;
  if (!textures[name]) return;

  selectedObject.material.map = textures[name];
  selectedObject.material.needsUpdate = true;
}

// ==========================
// LISTAR TEXTURAS DISPONIBLES
// ==========================
export function getTextureNames() {
  return Object.keys(textures);
}

// ==========================
// ELIMINAR TEXTURA
// ==========================
export function removeTexture(name) {
  if (!textures[name]) return;

  textures[name].dispose();
  delete textures[name];
}
