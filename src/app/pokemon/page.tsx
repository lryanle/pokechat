"use client";
import React, { useEffect, useState } from "react";
import { PokemonCard } from "@/components/PokemonCard";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

export function useDebounce(value: string, delay: number): string {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

type Props = {};

export default function PokemonList({}: Props) {
	// get data from /api/pokemon/list
	const [pokemonList, setPokemonList] = useState<any[]>([]);
	const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const loading = pokemonList.length === 0;
  const noResults = filteredPokemon.length === 0;

	useEffect(() => {
		fetch("/api/pokemon/list")
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setPokemonList(data.data);
					setFilteredPokemon(data.data);
				} else {
					console.error(data.error);
				}
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		const filtered = pokemonList.filter(
			(pokemon) =>
				pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
				pokemon.types.some((type: any) =>
					type.typeName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
				)
		);
		setFilteredPokemon(filtered);
	}, [debouncedSearchTerm, pokemonList]);

	return (
		<div
			className={cn(
				"flex flex-col items-center gap-4 bg-[#EFF3F6] min-h-[calc(screen)-8rem] px-4",
				noResults ? "justify-start mt-32" : "justify-center mt-36"
			)}
		>
			{!loading && (
				<div className="flex items-center justify-center mb-8 gap-2">
					<Input
						type="text"
						placeholder="Search by name or type..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="px-4 py-2 border rounded-lg text-black"
						disabled={loading}
					/>
					<p className="text-foreground opacity-50 w-80">
						{filteredPokemon.length} Pokemon Found
					</p>
				</div>
			)}
			<div className="flex flex-wrap justify-center items-center gap-4 drop-shadow">
				{loading ? (
					<div className="flex items-center justify-center gap-2">
						<Icons.spinner className="animate-spin h-10 w-10 text-foreground" />
						<p className="text-3xl font-bold w-full flex items-center justify-center text-center">
							Loading Pokemon...
						</p>
					</div>
				) : (
					filteredPokemon.map(
						(pokemon, index) =>
							pokemon.sprite && (
								<PokemonCard key={index} pokemon={pokemon} index={index} />
							)
					)
				)}
				<div className="h-0 w-0 hidden bg-pokemon-bug bg-pokemon-dark bg-pokemon-dragon bg-pokemon-electric bg-pokemon-fairy bg-pokemon-fighting bg-pokemon-fire bg-pokemon-flying bg-pokemon-ghost bg-pokemon-grass bg-pokemon-ground bg-pokemon-ice bg-pokemon-normal bg-pokemon-poison bg-pokemon-psychic bg-pokemon-rock bg-pokemon-steel bg-pokemon-water"></div>
			</div>
		</div>
	);
}
