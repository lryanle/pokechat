import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(input: string, nbsp?: boolean) {
  return String(input)
    .split("-")
    .map((word) => {
      switch (word.toLowerCase()) { // replace "m" with "♂" and "f" with "♀"
        case "m":
        case "male":
          return '♂';
        case "f":
        case "female":
          return '♀';
        default:
          return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join(nbsp ? " " : " ")
}

export function titleCase(input: string) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function underscore(input: string) {
  return input.replace(/\s/g, "_");
}

export function pad(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function pokeTypeToImg(type: string) {
  if (!["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"].includes(type.toLowerCase())) {
    return ""
  }

  return `/icons/${type.toLowerCase()}.png`
}

export function pokeTypeToTW(type: string) {
  switch (String(type).toLowerCase()) {
    case "bug":
      return "pokemon-bug"
    case "dark":
      return "pokemon-dark"
    case "dragon":
      return "pokemon-dragon"
    case "electric":
      return "pokemon-electric"
    case "fairy":
      return "pokemon-fairy"
    case "fighting":
      return "pokemon-fighting"
    case "fire":
      return "pokemon-fire"
    case "flying":
      return "pokemon-flying"
    case "ghost":
      return "pokemon-ghost"
    case "grass":
      return "pokemon-grass"
    case "ground":
      return "pokemon-ground"
    case "ice":
      return "pokemon-ice"
    case "normal":
      return "pokemon-normal"
    case "poison":
      return "pokemon-poison"
    case "psychic":
      return "pokemon-psychic"
    case "rock":
      return "pokemon-rock"
    case "steel":
      return "pokemon-steel"
    case "water":
      return "pokemon-water"
    default:
      return ""
  }
}

export const pokeTypeToHex = (type: string) => {
  switch (String(type).toLowerCase()) {
    case "bug":
      return "#A8B820"
    case "dark":
      return "#705848"
    case "dragon":
      return "#7038F8"
    case "electric":
      return "#F8D030"
    case "fairy":
      return "#EE99AC"
    case "fighting":
      return "#C03028"
    case "fire":
      return "#F08030"
    case "flying":
      return "#A890F0"
    case "ghost":
      return "#705898"
    case "grass":
      return "#78C850"
    case "ground":
      return "#E0C068"
    case "ice":
      return "#98D8D8"
    case "normal":
      return "#A8A878"
    case "poison":
      return "#A040A0"
    case "psychic":
      return "#F85888"
    case "rock":
      return "#B8A038"
    case "steel":
      return "#B8B8D0"
    case "water":
      return "#6890F0"
    default:
      return ""
  }
}

export const shadeColor = (color: string, percent: number) => {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = f >> 8 & 0x00FF;
  const B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

export const blobToBase64 = (blob: any, callback: any) => {
  const reader = new FileReader();
  reader.onload = function () {
    if (typeof reader.result === 'string') {
      const base64data = reader?.result?.split(",")[1];
      callback(base64data);
    }
  };
  reader.readAsDataURL(blob);
};

const getPeakLevel = (analyzer: any) => {
  const array = new Uint8Array(analyzer.fftSize);
  analyzer.getByteTimeDomainData(array);

  return (
    array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
    128
  );
};

const createMediaStream = (stream: any, isRecording: any, callback: any) => {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const analyzer = context.createAnalyser();

  source.connect(analyzer);

  const tick = () => {
    const peak = getPeakLevel(analyzer);

    if (isRecording) {
      callback(peak);
      requestAnimationFrame(tick);
    }
  };

  tick();
};

export { createMediaStream };
