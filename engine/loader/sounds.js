// engine/loader/sounds.js

const sounds = {};

export function loadSound(file, name, loop = false, volume = 1) {
  const url = URL.createObjectURL(file);
  const audio = new Audio(url);
  audio.loop = loop;
  audio.volume = volume;
  sounds[name] = audio;
}

export function playSound(name) {
  if (!sounds[name]) {
    console.warn("Sonido no encontrado:", name);
    return;
  }
  sounds[name].currentTime = 0;
  sounds[name].play();
}

export function stopSound(name) {
  if (!sounds[name]) return;
  sounds[name].pause();
}

export function getSoundNames() {
  return Object.keys(sounds);
}
