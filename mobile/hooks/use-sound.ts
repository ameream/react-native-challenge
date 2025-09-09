import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

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
