import * as THREE from "../three.js";
import { scene } from "../scene/scene.js";

export const cubes = [];

export function createCube() {
  const geo = new THREE.BoxGeometry();
  const mat = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geo, mat);

  cube.position.set(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    0
  );

  cube.userData.type = "cube";

  scene.add(cube);
  cubes.push(cube);

  console.log("🧊 Cubo creado", cube);
}
