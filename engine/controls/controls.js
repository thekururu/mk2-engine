import { createCube } from "../objects/cube.js";

export function initControls() {
  document.getElementById("createCube").onclick = () => {
    createCube();
  };
}

