import { useMedia } from "./useMedia.ts";

export const usePrefersDarkMode = () => {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
};
