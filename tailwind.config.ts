import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				pokemon: {
					bug: "#A8B820",
					dark: "#705848",
					dragon: "#7038F8",
					electric: "#F8D030",
					fairy: "#EE99AC",
					fighting: "#C03028",
					fire: "#F08030",
					flying: "#A890F0",
					ghost: "#705898",
					grass: "#78C850",
					ground: "#E0C068",
					ice: "#98D8D8",
					normal: "#A8A878",
					poison: "#A040A0",
					psychic: "#F85888",
					rock: "#B8A038",
					steel: "#B8B8D0",
					water: "#6890F0",
				},
			},
      backgroundImage: {
        'pokemon-red': "url('/bg-red.svg')",
				'crosshatch': "url('/cross-pattern.png')",
      },
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			delay: {
				"400": "400ms",
				"600": "600ms",
			},
			dropShadow: {
				"pokemon-bug": "0 10px 10px #A8B820",
				"pokemon-dark": "0 10px 10px #705848",
				"pokemon-dragon": "0 10px 10px #7038F8",
				"pokemon-electric": "0 10px 10px #F8D030",
				"pokemon-fairy": "0 10px 10px #EE99AC",
				"pokemon-fighting": "0 10px 10px #C03028",
				"pokemon-fire": "0 10px 10px #F08030",
				"pokemon-flying": "0 10px 10px #A890F0",
				"pokemon-ghost": "0 10px 10px #705898",
				"pokemon-grass": "0 10px 10px #78C850",
				"pokemon-ground": "0 10px 10px #E0C068",
				"pokemon-ice": "0 10px 10px #98D8D8",
				"pokemon-normal": "0 10px 10px #A8A878",
				"pokemon-poison": "0 10px 10px #A040A0",
				"pokemon-psychic": "0 10px 10px #F85888",
				"pokemon-rock": "0 10px 10px #B8A038",
				"pokemon-steel": "0 10px 10px #B8B8D0",
				"pokemon-water": "0 10px 10px #6890F0",
				"2xl-pokemon-bug": "0 0 25px #A8B820",
				"2xl-pokemon-dark": "0 0 25px #705848",
				"2xl-pokemon-dragon": "0 0 25px #7038F8",
				"2xl-pokemon-electric": "0 0 25px #F8D030",
				"2xl-pokemon-fairy": "0 0 25px #EE99AC",
				"2xl-pokemon-fighting": "0 0 25px #C03028",
				"2xl-pokemon-fire": "0 0 25px #F08030",
				"2xl-pokemon-flying": "0 0 25px #A890F0",
				"2xl-pokemon-ghost": "0 0 25px #705898",
				"2xl-pokemon-grass": "0 0 25px #78C850",
				"2xl-pokemon-ground": "0 0 25px #E0C068",
				"2xl-pokemon-ice": "0 0 25px #98D8D8",
				"2xl-pokemon-normal": "0 0 25px #A8A878",
				"2xl-pokemon-poison": "0 0 25px #A040A0",
				"2xl-pokemon-psychic": "0 0 25px #F85888",
				"2xl-pokemon-rock": "0 0 25px #B8A038",
				"2xl-pokemon-steel": "0 0 25px #B8B8D0",
				"2xl-pokemon-water": "0 0 25px #6890F0",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
        "spring": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4%)" },
        },
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
        "spring": "spring 4s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
