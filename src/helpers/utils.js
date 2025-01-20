import generateColorGradient from "./generateColorGradient";

export const scoreColors = [
  ...generateColorGradient("#fd5361", "#e0b400", 5),
  ...generateColorGradient("#e0b400", "#1db459", 5),
];
