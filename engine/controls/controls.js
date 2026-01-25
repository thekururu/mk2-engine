// engine/controls/controls.js

import { createCube } from "../objects/cube.js";

export function initControls() {
  const btn = document.getElementById("createCube");

  if (!btn) {
    console.error("❌ Botón #createCube no encontrado");
    return;
  }

  btn.addEventListener("click", () => {
    createCube();
  });

  console.log("🎮 Controles iniciados");
}

