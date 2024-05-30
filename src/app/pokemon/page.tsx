"use client";
import React, { useEffect, useState } from "react";
import { PokemonCard } from "@/components/PokemonCard";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import { capitalize, cn } from "@/lib/utils";
import { Book, X } from "lucide-react";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

function useDebounce(value: string, delay: number): string {
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

const pokemonTypes = [
	"bug",
	"dark",
	"dragon",
	"electric",
	"fairy",
	"fighting",
	"fire",
	"flying",
	"ghost",
	"grass",
	"ground",
	"ice",
	"normal",
	"poison",
	"psychic",
	"rock",
	"steel",
	"water",
];

type Props = {};

export default function PokemonList({}: Props) {
	// get data from /api/pokemon/list
	const [pokemonList, setPokemonList] = useState<any[]>([]);
	const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
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
    const filtered = pokemonList.filter((pokemon) =>
        (selectedTypes.length === 0 || pokemon.types.some((type: any) => selectedTypes.includes(type.typeName.toLowerCase()))) &&
        (pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
         pokemon.types.some((type: any) =>
             type.typeName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
         pokemon.id.toString().startsWith(debouncedSearchTerm)
        )
    );
    setFilteredPokemon(filtered);
}, [debouncedSearchTerm, pokemonList, selectedTypes]);


	return (
		<div className="flex flex-col items-center bg-white">
			<div
				className="bg-[#c30000] w-full flex items-center pt-16 justify-center"
			>
				<div className="max-w-[72rem] w-full px-6 py-4">
					<h1 className="text-5xl font-bold text-center text-secondary flex items-center justify-center gap-2">
						<Book className="h-10 w-10" strokeWidth={2.5} />
						<span>Pokémon</span>
					</h1>
				</div>
			</div>
			<div className="flex justify-between items-start flex-1 h-full max-w-[72rem] w-full">
				{!loading && (
					<div className="min-w-[25rem] max-w-[25rem] h-max-full flex flex-col justify-center items-start gap-1 p-6 h-full sticky top-20">
						<ToggleGroup
							variant="outline"
							type="multiple"
							className="w-full h-full flex flex-wrap justify-start items-start gap-1 overflow-y-scroll border-0 p-1"
							value={selectedTypes}
							onValueChange={setSelectedTypes}
						>
							<div className="flex items-center justify-center gap-2 w-full">
								<Input
									type="text"
									placeholder="Search by name or type..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="p-2 border rounded-lg text-black w-full"
									disabled={loading}
								/>
							</div>
							<hr className="w-full border-b-[#EFF3F6] my-2" />
							{pokemonTypes.map((type, index) => (
								<ToggleGroupItem
									key={type + index}
									className={cn("flex items-center justify-start gap-2 p-2 self-stretch text-base", selectedTypes.includes(type) ? `data-[state=on]:bg-pokemon-${type} data-[state=on]:bg-opacity-20` : "grayscale")}
									value={type}
								>
									<div className={cn(`p-1.5 rounded-full`, selectedTypes.includes(type) ? `bg-pokemon-${type}` : "bg-zinc-400")}>
										<img
											src={`/icons/${type}.png`}
											alt={type}
											width={14}
											height={14}
										/>
									</div>
									<p>{capitalize(type)}</p>
								</ToggleGroupItem>
							))}
							{selectedTypes.length > 0 && <Button
									className="flex items-center justify-start gap-2 p-2 self-stretch text-base"
									variant="destructive"
									onClick={() => {setSelectedTypes([])}}
								>
									<div className="p-[3px] rounded-full bg-white">
										<X className="text-destructive h-5 w-5" />
									</div>
									<p>Clear Filters</p>
								</Button>}
							{/* <p className="w-full text-center text-lg"> - □ - </p> */}
						</ToggleGroup>
					</div>
				)}
				<div
					className={cn(
						"flex flex-wrap justify-start items-center gap-4 px-6 h-full py-4 w-full",
						!loading ? "border-l-2 border-l-[#EFF3F6]" : ""
					)}
				>
					{loading ? (
						<div className="flex items-start justify-center gap-4 flex-1 h-[40rem] w-full py-16">
							<Icons.spinner className="animate-spin h-10 w-10 text-foreground" />
							<p className="text-3xl font-bold flex items-center justify-center text-center">
								Loading Pokemon...
							</p>
						</div>
					) : (
						<>
							<div className={cn("text-foreground font-semibold w-full py-4 flex justify-start items-center gap-1", noResults ? "pb-80" : "")}>
								<Icons.pokeball className="h-6 w-6 text-[#c30000]" />
								<span className="opacity-75">
									{filteredPokemon.length} Pokémon Found
								</span>
							</div>
							{filteredPokemon.map(
								(pokemon, index) =>
									pokemon.sprite && (
										<PokemonCard
											key={pokemon.sprite + index}
											pokemon={pokemon}
											index={index}
										/>
									)
							)}
						</>
					)}
					{!noResults && (
						<div className="flex w-full h-full flex-1 justify-center items-center text-center py-4 text-lg">
							{"— You're at the end! —"}
						</div>
					)}
				</div>
			</div>
			<div className="h-0 w-0 hidden bg-pokemon-bug bg-pokemon-dark bg-pokemon-dragon bg-pokemon-electric bg-pokemon-fairy bg-pokemon-fighting bg-pokemon-fire bg-pokemon-flying bg-pokemon-ghost bg-pokemon-grass bg-pokemon-ground bg-pokemon-ice bg-pokemon-normal bg-pokemon-poison bg-pokemon-psychic bg-pokemon-rock bg-pokemon-steel bg-pokemon-water"></div>
			<div className="h-0 w-0 hidden hover:drop-shadow-pokemon-bug hover:drop-shadow-pokemon-dark hover:drop-shadow-pokemon-dragon hover:drop-shadow-pokemon-electric hover:drop-shadow-pokemon-fairy hover:drop-shadow-pokemon-fighting hover:drop-shadow-pokemon-fire hover:drop-shadow-pokemon-flying hover:drop-shadow-pokemon-ghost hover:drop-shadow-pokemon-grass hover:drop-shadow-pokemon-ground hover:drop-shadow-pokemon-ice hover:drop-shadow-pokemon-normal hover:drop-shadow-pokemon-poison hover:drop-shadow-pokemon-psychic hover:drop-shadow-pokemon-rock hover:drop-shadow-pokemon-steel hover:drop-shadow-pokemon-water"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-bug data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-dark data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-dragon data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-electric data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-fairy data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-fighting data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-fire data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-flying data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-ghost data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-grass data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-ground data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-ice data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-normal data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-poison data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-psychic data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-rock data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-steel data-[state=on]:bg-opacity-20"></div>
			<div className="h-0 w-0 hidden data-[state=on]:bg-pokemon-water data-[state=on]:bg-opacity-20"></div>
		</div>
	);
}
