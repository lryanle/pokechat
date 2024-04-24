"use client";
import { Button } from "@/components/ui/button";
import { Book, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { capitalize, cn, pad } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SmallPokemonCard } from "@/components/SmallPokemonCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/Icons";
import { pokeTypeToTW } from "@/lib/utils";

type Props = {
	params: { slug: string };
};

export default function page({ params }: Props) {
	const [data, setData] = useState<any>();

	useEffect(() => {
		fetch(`/api/pokemon/${params.slug}`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
			});
	}, []);

	const router = useRouter();

	const index = 5;
	const pokemon = {
		id: 5,
		name: "charmeleon",
		sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
		types: [
			{
				typeName: "fire",
			},
			{
				typeName: "flying",
			},
		],
	};

	return (
		(data && (
			<div className="w-full h-full flex flex-col items-center bg-white">
				<div className="bg-[#c30000] w-full flex items-center pt-16 justify-center">
					<div className="max-w-[72rem] w-full px-6 py-4 flex justify-between items-center">
						<Button
							variant="ghost"
							onClick={() => router.push("/pokemon")}
							className="text-white text-sm flex justify-center items-center gap-1"
						>
							<ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
							<span>Back to Pokédex</span>
						</Button>
						<div className="flex flex-col items-center justify-center gap-1">
							<h1 className="text-5xl font-bold text-center text-secondary flex items-center justify-center gap-2">
								<Book className="h-10 w-10" strokeWidth={2.5} />
								<span>Pokémon</span>
							</h1>
						</div>
						<div className="min-w-40"></div>
					</div>
				</div>
				<div className="w-full h-full flex justify-center items-start max-w-[72rem] p-6">
					<div className="w-1/2 flex flex-col justify-center items-center gap-4 pr-2 border-r border-r-[#EFF3F6]">
						<Card className="w-full h-full">
							<CardContent className="flex flex-col justify-center items-center gap-4 p-4">
								{/* pokemon */}
								<div className="w-full flex justify-between items-center gap-1 px-1">
									{/* Titles */}
									<div className="flex justify-start items-start gap-2">
										{/* Name */}
										<h1 className="text-3xl font-bold text-primary">
											{capitalize(data.pokemon.name)}
										</h1>
										<p className="text-lg text-muted-foreground">{`#${pad(
											data.pokemon.id,
											3
										)}`}</p>
									</div>
									<div className="flex justify-center items-center gap-1">
										{/* Types */}
										{data.pokemon.types.map((type: string, index: number) => (
											<Badge
												className={cn(`bg-pokemon-${type} text-sm px-6`)}
												key={`type-${index}`}
											>
												{capitalize(type)}
											</Badge>
										))}
									</div>
								</div>
								<div className="w-full flex items-center justify-between">
									{/* Image */}
									{data.pokemonBeforeAfter[0].id ? (
										<Button
											variant="ghost"
											onClick={() =>
												router.push(
													`/pokemon/${data.pokemonBeforeAfter[0].id}`
												)
											}
											className="text-foreground text-lg flex flex-col justify-center items-end p-1 pl-0 leading-0 h-fit"
										>
											<Image
												src={data.pokemonBeforeAfter[0].image}
												alt={data.pokemonBeforeAfter[0].name}
												height={40}
												width={40}
											/>
											<div className="flex justify-center items-center gap-1">
												<ChevronLeft
													className="h-5 w-5"
													strokeWidth={2.5}
												/>
												<span>{`#${pad(
													data.pokemonBeforeAfter[0].id,
													3
												)}`}</span>
											</div>
											<p className="text-xs text-muted-foreground">
												{data.pokemonBeforeAfter[0].name}
											</p>
										</Button>
									) : (
										<div className="w-20 flex justify-start items-center"></div>
									)}
									<div className="flex items-center justify-center group">
										<Image
											src={data.pokemon.image}
											alt={data.pokemon.name}
											className={cn(
												`group-hover:hidden w-64 h-64 drop-shadow-2xl-${pokeTypeToTW(
													data.pokemon.types[0]
												)}`
											)}
											width={256}
											height={256}
										/>
										<Image
											src={data.pokemon.shinyImage}
											alt={data.pokemon.name}
											className={cn(
												`hidden group-hover:block w-64 h-64 drop-shadow-2xl-${pokeTypeToTW(
													data.pokemon.types[0]
												)}`
											)}
											width={256}
											height={256}
										/>
									</div>
									{data.pokemonBeforeAfter[1].id ? (
										<Button
											variant="ghost"
											onClick={() =>
												router.push(
													`/pokemon/${data.pokemonBeforeAfter[1].id}`
												)
											}
											className="text-foreground text-lg flex flex-col justify-center items-start p-1 pr-1 leading-0 h-fit"
										>
											<Image
												src={data.pokemonBeforeAfter[1].image}
												alt={data.pokemonBeforeAfter[1].name}
												height={40}
												width={40}
											/>
											<div className="flex justify-center items-center gap-1">
												<span>{`#${pad(
													data.pokemonBeforeAfter[1].id,
													3
												)}`}</span>
												<ChevronRight
													className="h-5 w-5"
													strokeWidth={2.5}
												/>
											</div>
											<p className="text-xs text-muted-foreground">
												{data.pokemonBeforeAfter[1].name}
											</p>
										</Button>
									) : (
										<div className="w-20 flex justify-start items-center"></div>
									)}
								</div>
							</CardContent>
						</Card>
						<div className="w-full h-full flex items-center justify-center">
							{/* Evolutions */}
							<Card className="w-full">
								<CardHeader className="flex justify-start items-center font-semibold text-xl p-0 py-2">
									Evolutions
								</CardHeader>
								<CardContent className="flex justify-evenly items-center gap-1 p-4 pt-0">
									{data.evolutionChain.map((evolution: any, index: number) => (
										<>
											{evolution.minlevel !== 1 && (
												<div className="flex flex-col items-center justify-center text-center text-muted-foreground">
													<MoveRight
														className="h-10 w-10"
														strokeWidth={2.5}
													/>
													{evolution.minlevel !== null && (
														<p className="text-sm -translate-y-2">{`lvl ${evolution.minlevel}`}</p>
													)}
												</div>
											)}
											<SmallPokemonCard
												key={evolution.id}
												pokemon={evolution}
												index={index}
											/>
										</>
									))}
								</CardContent>
							</Card>
						</div>
					</div>
					<div className="w-1/2 h-full flex flex-col justify-center items-start pl-2 border-l border-l-[#EFF3F6]">
						{/* info */}
						<Tabs defaultValue="about" className="h-full w-full">
							<TabsList className="w-full">
								<TabsTrigger value="about" className="w-1/2">
									About
								</TabsTrigger>
								<TabsTrigger value="moves" className="w-1/2">
									Moves
								</TabsTrigger>
							</TabsList>
							<TabsContent value="about" className="h-full w-full">
								{/* abilities */}
								{/* Training: EV Yield, catch rate, base friendship, base exp, growth rate, held items, weight, height */}
								{/* Breeding: egg groups, egg cycles, gender distribution */}
								{/* Typing */}
								{/* Stats */}
							</TabsContent>
							<TabsContent value="moves" className="h-full w-full">
								{/* Game Versions -> Level Up, TH/HM, Egg, Tutor */}
								{/* Moves */}
							</TabsContent>
						</Tabs>
					</div>
				</div>
				<div className="flex justify-between items-start flex-1 h-full max-w-[72rem] w-full"></div>
				<div className="h-0 w-0 hidden bg-pokemon-bug bg-pokemon-dark bg-pokemon-dragon bg-pokemon-electric bg-pokemon-fairy bg-pokemon-fighting bg-pokemon-fire bg-pokemon-flying bg-pokemon-ghost bg-pokemon-grass bg-pokemon-ground bg-pokemon-ice bg-pokemon-normal bg-pokemon-poison bg-pokemon-psychic bg-pokemon-rock bg-pokemon-steel bg-pokemon-water"></div>
				<div className="h-0 w-0 hidden drop-shadow-2xl-pokemon-bug drop-shadow-2xl-pokemon-dark drop-shadow-2xl-pokemon-dragon drop-shadow-2xl-pokemon-electric drop-shadow-2xl-pokemon-fairy drop-shadow-2xl-pokemon-fighting drop-shadow-2xl-pokemon-fire drop-shadow-2xl-pokemon-flying drop-shadow-2xl-pokemon-ghost drop-shadow-2xl-pokemon-grass drop-shadow-2xl-pokemon-ground drop-shadow-2xl-pokemon-ice drop-shadow-2xl-pokemon-normal drop-shadow-2xl-pokemon-poison drop-shadow-2xl-pokemon-psychic drop-shadow-2xl-pokemon-rock drop-shadow-2xl-pokemon-steel drop-shadow-2xl-pokemon-water"></div>
				<div className="h-0 w-0 hidden hover:shadow-pokemon-bug hover:shadow-pokemon-dark hover:shadow-pokemon-dragon hover:shadow-pokemon-electric hover:shadow-pokemon-fairy hover:shadow-pokemon-fighting hover:shadow-pokemon-fire hover:shadow-pokemon-flying hover:shadow-pokemon-ghost hover:shadow-pokemon-grass hover:shadow-pokemon-ground hover:shadow-pokemon-ice hover:shadow-pokemon-normal hover:shadow-pokemon-poison hover:shadow-pokemon-psychic hover:shadow-pokemon-rock hover:shadow-pokemon-steel hover:shadow-pokemon-water"></div>
			</div>
		)) || (
			<div className="w-full h-full flex flex-col justify-center items-start">
				<div className="bg-[#c30000] w-full flex items-center pt-16 justify-center">
					<div className="max-w-[72rem] w-full px-6 py-4 flex justify-center items-center">
						<div className="flex flex-col items-center justify-center gap-1">
							<h1 className="text-5xl font-bold text-center text-secondary flex items-center justify-center gap-2">
								<Book className="h-10 w-10" strokeWidth={2.5} />
								<span>Pokémon</span>
							</h1>
						</div>
					</div>
				</div>
				<div className="flex items-start justify-center gap-4 flex-1 h-[40rem] w-full py-16">
					<Icons.spinner className="animate-spin h-10 w-10 text-foreground" />
					<p className="text-3xl font-bold flex items-center justify-center text-center">
						Loading Pokemon...
					</p>
				</div>
			</div>
		)
	);
}
