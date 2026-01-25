// ui/ui.js

import { createCube } from "../engine/scene/scene.js";

import {
  loadTexture,
  applyTextureByName,
  getTextureNames
} from "../engine/loader/textures.js";

import { loadModel } from "../engine/loader/models.js";

import {
  loadSound,
  playSound,
  getSoundNames
} from "../engine/loader/sounds.js";

import {
  toggleFullscreen,
  exportSceneJSON,
  captureScreenshot
} from "../engine/utils/utils.js";

console.log("🎛 ui.js cargado");

// ==========================
// ESPERAR A QUE EXISTA EL DOM
// ==========================
window.addEventListener("DOMContentLoaded", () => {
  console.log("🎛 UI DOM listo");

  // ==========================
  // OBJETOS
  // ==========================
  const btnAddCube = document.getElementById("addCube");

  // ==========================
  // TEXTURAS
  // ==========================
  const textureInput = document.getElementById("textureInput");
  const btnApplyTexture = document.getElementById("applyTexture");

  // ==========================
  // MODELOS
  // ==========================
  const modelInput = document.getElementById("modelInput");

  // ==========================
  // SONIDOS
  // ==========================
  const soundInput = document.getElementById("soundInput");
  const btnPlaySound = document.getElementById("playSound");

  // ==========================
  // UTILIDADES
  // ==========================
  const btnFullscreen = document.getElementById("fullscreen");
  const btnExport = document.getElementById("export");
  const btnScreenshot = document.getElementById("screenshot");

  // ==========================
  // EVENTOS
  // ==========================

  // ➕ Crear cubo
  btnAddCube?.addEventListener("click", () => {
    console.log("🟩 CLICK: Crear cubo");
    createCube();
  });

  // 🎨 Cargar textura
  textureInput?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const name = prompt("Nombre de la textura:");
    if (!name) return;

    loadTexture(file, name, () => {
      alert("Textura cargada: " + name);
    });
  });

  // 🎨 Aplicar textura
  btnApplyTexture?.addEventListener("click", () => {
    const names = getTextureNames();
    if (names.length === 0) {
      alert("No hay texturas cargadas");
      return;
    }

    const name = prompt(
      "Texturas disponibles:\n" + names.join("\n")
    );
    if (!name) return;

    applyTextureByName(name);
  });

  // 🧱 Cargar modelo
  modelInput?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const name = prompt("Nombre del modelo:");
    if (!name) return;

    loadModel(file, name, () => {
      alert("Modelo cargado: " + name);
    });
  });

  // 🔊 Cargar sonido
  soundInput?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const name = prompt("Nombre del sonido:");
    if (!name) return;

    loadSound(file, name, true, 0.5);
  });

  // 🔊 Reproducir sonido
  btnPlaySound?.addEventListener("click", () => {
    const names = getSoundNames();
    if (names.length === 0) {
      alert("No hay sonidos cargados");
      return;
    }

    const name = prompt(
      "Sonidos disponibles:\n" + names.join("\n")
    );
    if (!name) return;

    playSound(name);
  });

  // 🖥 Pantalla completa
  btnFullscreen?.addEventListener("click", toggleFullscreen);

  // 💾 Exportar escena
  btnExport?.addEventListener("click", exportSceneJSON);

  // 📸 Screenshot
  btnScreenshot?.addEventListener("click", captureScreenshot);
});
