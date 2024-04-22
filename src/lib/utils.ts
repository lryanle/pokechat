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

export function pokeTypeToHex(type: string) {
  switch (type.toLowerCase()) {
    case "bug":
      return "bg-pokemon-bug"
    case "dark":
      return "bg-pokemon-dark"
    case "dragon":
      return "bg-pokemon-dragon"
    case "electric":
      return "bg-pokemon-electric"
    case "fairy":
      return "bg-pokemon-fairy"
    case "fighting":
      return "bg-pokemon-fighting"
    case "fire":
      return "bg-pokemon-fire"
    case "flying":
      return "bg-pokemon-flying"
    case "ghost":
      return "bg-pokemon-ghost"
    case "grass":
      return "bg-pokemon-grass"
    case "ground":
      return "bg-pokemon-ground"
    case "ice":
      return "bg-pokemon-ice"
    case "normal":
      return "bg-pokemon-normal"
    case "poison":
      return "bg-pokemon-poison"
    case "psychic":
      return "bg-pokemon-psychic"
    case "rock":
      return "bg-pokemon-rock"
    case "steel":
      return "bg-pokemon-steel"
    case "water":
      return "bg-pokemon-water"
    default:
      return ""
  }
}