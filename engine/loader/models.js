// engine/loader/models.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../scene/scene.js";

// Almacén de modelos cargados
export const models = {};

const loader = new GLTFLoader();

// ==========================
// CARGAR MODELO DESDE ARCHIVO
// ==========================
export function loadModel(file, name, onLoad) {
  const reader = new FileReader();

  reader.onload = () => {
    loader.parse(
      reader.result,
      "",
      gltf => {
        const model = gltf.scene;
        model.name = name;

        // Ajustes básicos
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        models[name] = model;
        scene.add(model);

        if (onLoad) onLoad(model);
      },
      error => {
        console.error("Error cargando modelo:", error);
      }
    );
  };

  reader.readAsArrayBuffer(file);
}

// ==========================
// OBTENER MODELO POR NOMBRE
// ==========================
export function getModel(name) {
  return models[name] || null;
}

// ==========================
// LISTAR MODELOS
// ==========================
export function getModelNames() {
  return Object.keys(models);
}

// ==========================
// ELIMINAR MODELO
// ==========================
export function removeModel(name) {
  if (!models[name]) return;

  scene.remove(models[name]);
  delete models[name];
}
