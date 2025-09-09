import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

/**
 * Custom hook for playing audio sounds using expo-audio.
 * @param soundFile - path to the sound file to play
 * @returns object containing playSound and stopSound functions
 * @returns {function} playSound - function to play the sound (resets to beginning)
 * @returns {function} stopSound - function to stop/pause the sound
 */
export function useSound(soundFile: string) {
  const player = useAudioPlayer(soundFile);

  const playSound = async () => {
    try {
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    try {
      player.pause();
    } catch (error) {
      console.warn("Error stopping sound:", error);
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  return { playSound, stopSound };
}
