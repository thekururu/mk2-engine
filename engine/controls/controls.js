import THREE from "../three.js";
import { camera, scene, renderer } from "../scene/scene.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selected = null;

export function initControls() {
  renderer.domElement.addEventListener("mousedown", e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(scene.children);

    if (hits.length) selected = hits[0].object;
  });

  renderer.domElement.addEventListener("mousemove", () => {
    if (selected) selected.rotation.y += 0.03;
  });

  renderer.domElement.addEventListener("mouseup", () => {
    selected = null;
  });
}

