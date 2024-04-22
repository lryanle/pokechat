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
