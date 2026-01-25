import THREE from "../three.js";
import { scene } from "../scene/scene.js";

export function createCube() {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x00ffcc })
  );

  cube.position.x = Math.random() * 2 - 1;
  cube.position.y = Math.random() * 2 - 1;

  scene.add(cube);
  console.log("🧊 Cubo creado");
}

