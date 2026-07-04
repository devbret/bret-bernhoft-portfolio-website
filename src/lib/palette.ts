export const CYBER = {
  black: 0x1a1f2c,
  darkPurple: 0x221f26,
  purple: 0x9b87f5,
  brightPurple: 0x8b5cf6,
  pink: 0xd946ef,
  orange: 0xf97316,
  blue: 0x1eaedb,
  neon: 0x00ffd5,
} as const;

export const TOPIC_COLORS: Record<string, number> = {
  "Software Engineering": CYBER.neon,
  Cybersecurity: CYBER.purple,
  "Open Source Intelligence": CYBER.pink,
};

export const cyberRgba = (hex: number, alpha: number) =>
  `rgba(${(hex >> 16) & 255}, ${(hex >> 8) & 255}, ${hex & 255}, ${alpha})`;

export const glslColor = (hex: number) => {
  const channel = (shift: number) => (((hex >> shift) & 255) / 255).toFixed(4);
  return `vec3(${channel(16)}, ${channel(8)}, ${channel(0)})`;
};
