import { createContext, useContext } from "react";

export const SoundContext = createContext(null);

export function useSoundContext() {
  return useContext(SoundContext);
}