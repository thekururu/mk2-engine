import {
  loadSound,
  playSound,
  stopSound,
  getSoundNames
} from "./engine/loader/sounds.js";

// SUBIR SONIDO
document.getElementById("soundInput").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const name = prompt("Nombre del sonido:");
  if (!name) return;

  loadSound(file, name, true, 0.5);
});

// REPRODUCIR
document.getElementById("playSound").onclick = () => {
  const name = prompt(
    "Sonidos disponibles:\n" + getSoundNames().join("\n")
  );
  playSound(name);
};
