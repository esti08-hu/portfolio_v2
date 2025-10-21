// Sound utilities for micro-interactions
// T007
import { Howl } from 'howler';

/**
 * Play a sound effect
 */
export function playSound(src: string, volume = 1) {
  const sound = new Howl({ src: [src], volume });
  sound.play();
}

/**
 * Preload a sound for instant playback
 */
export function preloadSound(src: string) {
  new Howl({ src: [src], preload: true });
}
