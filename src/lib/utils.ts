import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(input: string) {
  return input
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

export function pokeTypeToImg(type: string) {
  if (!["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"].includes(type.toLowerCase())) {
    return ""
  }

  return `/icons/${type.toLowerCase()}.png`
}

export function pokeTypeToTW(type: string) {
  switch (type.toLowerCase()) {
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