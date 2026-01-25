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
  const sound = sounds[name];
  if (!sound) {
    alert("Sonido no encontrado: " + name);
    return;
  }
  sound.currentTime = 0;
  sound.play();
}

export function stopSound(name) {
  const sound = sounds[name];
  if (sound) sound.pause();
}

export function getSoundNames() {
  return Object.keys(sounds);
}
