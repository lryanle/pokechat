import { NextRequest } from "next/server";
import { pokemons } from "@/data/pokemons";
import { titleCase, underscore } from "@/lib/utils";

type Data = {
	success: boolean;
	data?: any[];
	error?: string;
};

// Pokemon name, id, types, image, shiny image
// abilities
// EV Yield, catch rate, base friendship, base exp, growth rate, held items, weight, height
// egg groups, egg cycles, gender distribution
// Typing
// Stats
// Game Versions -> Level Up, TH/HM, Egg, Tutor
// Moves
// Pokemon before: number, name, image
// Evolution: Pokemon names, id, types, and images, and levels

// Typing: https://pokeapi.co/api/v2/type/{id or name}/
// moves: Level, move, type, category, power, pp, accuracy, priority, generation

const typeToEndpoint = (type: string) => {
	const types = {
		normal: "https://pokeapi.co/api/v2/type/1/",
		fighting: "https://pokeapi.co/api/v2/type/2/",
		flying: "https://pokeapi.co/api/v2/type/3/",
		poison: "https://pokeapi.co/api/v2/type/4/",
		ground: "https://pokeapi.co/api/v2/type/5/",
		rock: "https://pokeapi.co/api/v2/type/6/",
		bug: "https://pokeapi.co/api/v2/type/7/",
		ghost: "https://pokeapi.co/api/v2/type/8/",
		steel: "https://pokeapi.co/api/v2/type/9/",
		fire: "https://pokeapi.co/api/v2/type/10/",
		water: "https://pokeapi.co/api/v2/type/11/",
		grass: "https://pokeapi.co/api/v2/type/12/",
		electric: "https://pokeapi.co/api/v2/type/13/",
		psychic: "https://pokeapi.co/api/v2/type/14/",
		ice: "https://pokeapi.co/api/v2/type/15/",
		dragon: "https://pokeapi.co/api/v2/type/16/",
		dark: "https://pokeapi.co/api/v2/type/17/",
		fairy: "https://pokeapi.co/api/v2/type/18/",
		unknown: "https://pokeapi.co/api/v2/type/10001/",
		shadow: "https://pokeapi.co/api/v2/type/10002/",
	};

	return types[type as keyof typeof types];
};

async function getPokeList(slug: string) {
	try {
		// pokemon
		const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
			.then((res) => res.json())
			.then((data) => ({
				bulbapedia: `https://bulbapedia.bulbagarden.net/wiki/${underscore(
					titleCase(data.name)
				)}_(Pokémon)`,
				id: data.id,
				name: data.name,
				image: data.sprites.other["official-artwork"].front_default,
				shinyImage: data.sprites.other["official-artwork"].front_shiny,
				types: Array.from(
					data.types.map((type: { type: { name: string } }) => type.type.name)
				),
				abilities: Array.from(
					data.abilities.map(
						(ability: { ability: { name: string } }) => ability.ability.name
					)
				),
				height: data.height,
				weight: data.weight,
				heldItems: Array.from(
					data.held_items.map((item: { item: { name: string } }) => item.item.name)
				),
				baseExp: data.base_experience,
				stats: Array.from(
					data.stats.map(
						(stat: { base_stat: number; effort: number; stat: { name: string } }) => ({
							name: stat.stat.name,
							baseStat: stat.base_stat,
							ev: stat.effort,
							minStat:
								stat.stat.name === "hp"
									? Math.floor(stat.base_stat * 2 + 110)
									: Math.floor((stat.base_stat * 2 + 5) * 0.9),
							maxStat:
								stat.stat.name === "hp"
									? Math.floor(stat.base_stat * 2 + 204)
									: Math.floor((stat.base_stat * 2 + 99) * 1.1),
						})
					)
				),
				moves: data.moves.reduce((acc: any, move: any) => {
					move.version_group_details.forEach((vg: any) => {
						const versionGroupName = vg.version_group.name;
						const methodName = vg.move_learn_method.name;

						if (!acc[versionGroupName]) {
							acc[versionGroupName] = {};
						}

						if (!acc[versionGroupName][methodName]) {
							acc[versionGroupName][methodName] = [];
						}

						acc[versionGroupName][methodName].push({
							moveName: move.move.name,
							url: move.move.url,
							levelLearnedAt: vg.level_learned_at,
						});
					});

					return acc;
				}, {}),
			}));

		// pokemon species
		const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${slug}`)
			.then((res) => res.json())
			.then((data) => ({
				growthRate: data.growth_rate.name,
				genderRate: data.gender_rate,
				baseFriendship: data.base_happiness,
				captureRate: data.capture_rate,
				evolutionChainUrl: data.evolution_chain.url,
			}));

		// evolution chain
		const evolutionChain = await fetch(await species.evolutionChainUrl)
			.then((res) => res.json())
			.then(async (data) => {
				const chain = data.chain;
				const pokemonInChain = [];
				let current = chain;

				do {
					const minLevel =
						current.evolution_details.length > 0
							? current.evolution_details[0].min_level
							: 1;
					const pokemonName = current.species.name;

					pokemonInChain.push({ name: pokemonName, minlevel: minLevel });

					current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
				} while (current);

				return await Promise.all(
					pokemonInChain.map(async (pokemon) => {
						const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
						const response = await fetch(url);
						if (!response.ok)
							throw new Error(`Failed to fetch pokemon data for ${pokemon.name}`);
						const pokemonData = await response.json();

						const result = {
							id: pokemonData.id,
							name: pokemonData.name,
							types: Array.from(
								pokemonData.types.map(
									(type: { type: { name: string } }) => type.type.name
								)
							),
							image: pokemonData.sprites.other["official-artwork"].front_default,
							minlevel: pokemon.minlevel,
						};

						return result;
					})
				);
			});

		// type effectiveness
		const typeEffectivenessRelations = await Promise.all(
			pokemon.types.map(async (type) => {
				const result = await fetch(typeToEndpoint(type as string))
					.then((res) => res.json())
					.then((data) => data.damage_relations);
				return await result;
			})
		);

		const initialDamageFrom: Record<string, number> = {};
		const initialDamageTo: Record<string, number> = {};

		const typeEffectiveness = typeEffectivenessRelations.reduce(
			(acc, relation) => {
				const mapDamageTypes = (
					types: { name: string }[],
					multiplier: number,
					target: "from" | "to"
				) =>
					types.forEach((type) => {
						if (target === "from") {
							acc.damageFrom[type.name] = acc.damageFrom[type.name]
								? acc.damageFrom[type.name] * multiplier
								: multiplier;
						} else {
							acc.damageTo[type.name] = acc.damageTo[type.name]
								? acc.damageTo[type.name] * multiplier
								: multiplier;
						}
					});

				mapDamageTypes(relation.double_damage_from, 2, "from");
				mapDamageTypes(relation.half_damage_from, 0.5, "from");
				mapDamageTypes(relation.no_damage_from, 0, "from");
				mapDamageTypes(relation.double_damage_to, 2, "to");
				mapDamageTypes(relation.half_damage_to, 0.5, "to");
				mapDamageTypes(relation.no_damage_to, 0, "to");

				return acc;
			},
			{ damageFrom: initialDamageFrom, damageTo: initialDamageTo }
		);

		const cleanEffectiveness = {
			damageFrom: Object.fromEntries(
				Object.entries(typeEffectiveness.damageFrom).filter(
					([_, multiplier]) => multiplier !== 1
				)
			),
			damageTo: Object.fromEntries(
				Object.entries(typeEffectiveness.damageTo).filter(
					([_, multiplier]) => multiplier !== 1
				)
			),
		};

		const finalData = {
			pokemon,
			species,
			evolutionChain,
			cleanEffectiveness,
		};

		return finalData;
	} catch (error) {
		throw error;
	}
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
	const slug = params.slug;

	try {
		const pokemonInfo = await getPokeList(slug);
		return new Response(JSON.stringify({ success: true, data: pokemonInfo }), {
			headers: {
				"Content-Type": "application/json",
			},
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error }), {
			headers: {
				"Content-Type": "application/json",
			},
			status: 500,
		});
	}
}
