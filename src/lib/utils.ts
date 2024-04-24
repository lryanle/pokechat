import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(input: string) {
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
    .join(" ")
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
