import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "../scene/scene.js";

export function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    0
  );

  scene.add(cube);
  console.log("🧊 Cubo creado");
  return cube;
}
