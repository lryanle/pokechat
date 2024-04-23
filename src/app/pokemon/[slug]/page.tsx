"use client";
import { Button } from "@/components/ui/button";
import { Book, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn, pad } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SmallPokemonCard } from "@/components/SmallPokemonCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
	params: { slug: string };
};

export default function page({ params }: Props) {
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
									<h1 className="text-3xl font-bold text-primary">Charmeleon</h1>
									<p className="text-lg text-muted-foreground">{`#${pad(
										5,
										3
									)}`}</p>
								</div>
								<div className="flex justify-center items-center gap-1">
									{/* Types */}
									<Badge className={cn(`bg-pokemon-${"fire"} text-sm px-6`)}>
										Fire
									</Badge>
								</div>
							</div>
							<div className="w-full flex items-center justify-between">
								{/* Image */}
								<Button
									variant="ghost"
									onClick={() => router.push("/pokemon/4")}
									className="text-foreground text-lg flex flex-col justify-center items-end p-1 pl-0 leading-0 h-fit"
								>
									<Image
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
										alt="Charmander"
                    height={40}
                    width={40}
									/>
									<div className="flex justify-center items-center gap-1">
										<ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
										<span>#004</span>
									</div>
									<p className="text-xs text-muted-foreground">Charmander</p>
								</Button>
								<div className="flex items-center justify-center group">
									<Image
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
										alt="Charmeleon"
										className={cn(
											`group-hover:hidden w-64 h-64 drop-shadow-2xl-${"pokemon-fire"}`
										)}
										width={256}
										height={256}
									/>
									<Image
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/5.png"
										alt="Charmeleon"
										className={cn(
											`hidden group-hover:block w-64 h-64 drop-shadow-2xl-${"pokemon-fire"}`
										)}
										width={256}
										height={256}
									/>
								</div>
								<Button
									variant="ghost"
									onClick={() => router.push("/pokemon/6")}
									className="text-foreground text-lg flex flex-col justify-center items-start p-1 pr-1 leading-0 h-fit"
								>
                  <Image
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
										alt="Charizard"
                    height={40}
                    width={40}
									/>
									<div className="flex justify-center items-center gap-1">
										<span>#006</span>
										<ChevronRight className="h-5 w-5" strokeWidth={2.5} />
									</div>
									<p className="text-xs text-muted-foreground">Charizard</p>
								</Button>
							</div>
						</CardContent>
					</Card>
					<div className="w-full h-full flex items-center justify-center">
						{/* Evolutions */}
						<Card className="w-full">
							<CardHeader className="flex justify-start items-center font-semibold text-xl p-0 py-2">
								Evolutions
							</CardHeader>
							<CardContent className="flex justify-between items-center gap-1 p-4 pt-0">
								<SmallPokemonCard pokemon={pokemon} index={index} />
								<div className="flex flex-col items-center justify-center text-center text-muted-foreground">
									<MoveRight className="h-10 w-10" strokeWidth={2.5} />
									<p className="text-sm -translate-y-2">{`lvl ${16}`}</p>
								</div>
								<SmallPokemonCard pokemon={pokemon} index={index} />

								<div className="flex flex-col items-center justify-center text-center text-muted-foreground">
									<MoveRight className="h-10 w-10" strokeWidth={2.5} />
									<p className="text-sm -translate-y-2">{`lvl ${16}`}</p>
								</div>
								<SmallPokemonCard pokemon={pokemon} index={index} />
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
						</TabsContent>
						<TabsContent value="moves" className="h-full w-full">
							Change your password here.
						</TabsContent>
					</Tabs>
				</div>
			</div>
			<div className="flex justify-between items-start flex-1 h-full max-w-[72rem] w-full"></div>
			<div className="h-0 w-0 hidden bg-pokemon-bug bg-pokemon-dark bg-pokemon-dragon bg-pokemon-electric bg-pokemon-fairy bg-pokemon-fighting bg-pokemon-fire bg-pokemon-flying bg-pokemon-ghost bg-pokemon-grass bg-pokemon-ground bg-pokemon-ice bg-pokemon-normal bg-pokemon-poison bg-pokemon-psychic bg-pokemon-rock bg-pokemon-steel bg-pokemon-water"></div>
			<div className="h-0 w-0 hidden drop-shadow-2xl-pokemon-bug drop-shadow-2xl-pokemon-dark drop-shadow-2xl-pokemon-dragon drop-shadow-2xl-pokemon-electric drop-shadow-2xl-pokemon-fairy drop-shadow-2xl-pokemon-fighting drop-shadow-2xl-pokemon-fire drop-shadow-2xl-pokemon-flying drop-shadow-2xl-pokemon-ghost drop-shadow-2xl-pokemon-grass drop-shadow-2xl-pokemon-ground drop-shadow-2xl-pokemon-ice drop-shadow-2xl-pokemon-normal drop-shadow-2xl-pokemon-poison drop-shadow-2xl-pokemon-psychic drop-shadow-2xl-pokemon-rock drop-shadow-2xl-pokemon-steel drop-shadow-2xl-pokemon-water"></div>
			<div className="h-0 w-0 hidden hover:shadow-pokemon-bug hover:shadow-pokemon-dark hover:shadow-pokemon-dragon hover:shadow-pokemon-electric hover:shadow-pokemon-fairy hover:shadow-pokemon-fighting hover:shadow-pokemon-fire hover:shadow-pokemon-flying hover:shadow-pokemon-ghost hover:shadow-pokemon-grass hover:shadow-pokemon-ground hover:shadow-pokemon-ice hover:shadow-pokemon-normal hover:shadow-pokemon-poison hover:shadow-pokemon-psychic hover:shadow-pokemon-rock hover:shadow-pokemon-steel hover:shadow-pokemon-water"></div>
		</div>
	);
}
