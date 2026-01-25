import { createCube } from "../objects/cube.js";

export function initControls() {
  const btn = document.getElementById("createCube");

  if (!btn) {
    console.error("❌ Botón createCube no existe");
    return;
  }

  btn.onclick = () => {
    createCube();
  };
}
