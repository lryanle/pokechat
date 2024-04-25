"use client";
import { Button } from "@/components/ui/button";
import { Book, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { capitalize, cn, pad, titleCase, pokeTypeToHex, shadeColor } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SmallPokemonCard } from "@/components/SmallPokemonCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/Icons";
import { pokeTypeToTW } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ErrorBar } from "recharts";
import Link from "next/link";

type Props = {
	params: { slug: string };
};

export default function page({ params }: Props) {
	const [data, setData] = useState<any>();
	const [pokemonStats, setPokemonStats] = useState<any>([])

	useEffect(() => {
		fetch(`/api/pokemon/${params.slug}`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);

				// for the graph
				const stats = data.data.pokemon.stats.map((stat: { name: string; baseStat: number; minStat: number; maxStat: number; }) => {
					return {
						name: stat.name === "special-attack" ? capitalize("Sp.Attack", true) : stat.name === "special-defense" ? capitalize("Sp.Defense", true) : capitalize(stat.name, true),
						base: stat.baseStat,
						min: stat.minStat,
						max: stat.maxStat,
					}
				})
				setPokemonStats(stats)
			});
	}, []);

	const router = useRouter();

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
										// <div key={evolution+index} className="flex justify-evenly items-center gap-1">
										<Fragment key={evolution+index}>
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
												key={evolution.name}
												pokemon={evolution}
												index={index}
											/>
										</Fragment>
										// </div>
									))}
								</CardContent>
							</Card>
						</div>
					</div>
					<div className="w-1/2 h-full flex flex-col justify-center items-start pl-2 border-l border-l-[#EFF3F6]">
						{/* info */}
						<Tabs defaultValue="about" className="h-full self-stretch p-2 w-full border rounded-lg">
							<TabsList className="w-full">
								<TabsTrigger value="about" className="w-1/2">
									About
								</TabsTrigger>
								<TabsTrigger value="stats" className="w-1/2">
									Stats
								</TabsTrigger>
								<TabsTrigger value="typing" className="w-1/2">
									Typing
								</TabsTrigger>
								<TabsTrigger value="moves" className="w-1/2">
									Moves
								</TabsTrigger>
							</TabsList>
							<TabsContent value="about" className="h-full w-full p-2">
								<div className="flex flex-col items-start justify-center gap-1 mb-4">
									<Label className="text-lg font-semibold text-primary">Abilities</Label>
									<div className="w-full flex items-center justify-start gap-2">
										{data.pokemon.abilities.map((ability: string, index: number) => (
											<Badge
												key={ability+index}
												className={cn(`bg-primary text-sm px-3 bg-pokemon-${data.pokemon.types[0]}`)}
											>
												{capitalize(ability)}
											</Badge>
										))}
									</div>
								</div>
								<div className="flex flex-col items-start justify-center gap-1 mb-4">
									<Label className="text-lg font-semibold text-primary">Information</Label>
									<div className="w-full flex items-center justify-start flex-wrap gap-2">
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Height</Label>
											<p className="text-sm text-muted-foreground">{data.pokemon.height}</p>
										</div>
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Weight</Label>
											<p className="text-sm text-muted-foreground">{data.pokemon.weight}</p>
										</div>
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Base Exp</Label>
											<p className="text-sm text-muted-foreground">{data.pokemon.baseExp}</p>
										</div>
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Growth Rate</Label>
											<p className="text-sm text-muted-foreground">{data.species.growthRate}</p>
										</div>
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Catch Rate</Label>
											<p className="text-sm text-muted-foreground">{data.species.captureRate}</p>
										</div>
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Base Happiness</Label>
											<p className="text-sm text-muted-foreground">{data.species.baseFriendship}</p>
										</div>
										<div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">EV Yield</Label>
											{
												data.pokemon.stats.map((stat: { name: string; ev: number }, index: number) => (
													stat.ev !== 0 && <div key={stat.name+index} className="flex items-center justify-center gap-1">
														<p className="text-sm text-muted-foreground">{`${stat.ev} ${capitalize(stat.name)}`}</p>
													</div>
												))
											}
										</div>
										{data.pokemon.heldItems.length !== 0 && <div className="flex flex-col items-center justify-center gap-1 p-4 min-h-10 w-fit border self-stretch rounded-lg">
											<Label className="text-sm font-semibold text-primary">Held Items</Label>
											<div className="w-full flex items-center justify-start gap-2">
												{data.pokemon.heldItems.map((item: string, index: number) => (
													<p key={item+index} className="text-sm text-muted-foreground bg-zinc-200 px-1 py-0.5 rounded">{capitalize(item)}</p>
												))}
											</div>
										</div>}
									</div>
								</div>
								<div className="flex flex-col items-start justify-center gap-1">
									<Label className="text-lg font-semibold text-primary">More Information</Label>
									<Link href={data.pokemon.bulbapedia} target="_blank">
										<Button variant="secondary" className="flex justify-center items-center gap-1">
											<Image src="/bulbapedia.png" alt="Bulbapedia" width={16} height={16} />
											{capitalize(data.pokemon.name)} on Bulbapedia
										</Button>
									</Link>
								</div>
							</TabsContent>
							<TabsContent value="stats" className="h-full w-full p-2">
								<div className="flex flex-col items-start justify-center gap-1 mb-4">
									<Label className="text-lg font-semibold text-primary">Statistics</Label>
									<ResponsiveContainer width="100%" height="100%" className="!h-64">
										<BarChart
											width={400}
											height={300}
											data={pokemonStats}
											margin={{
												top: 10,
												right: 10,
												left: 35,
												bottom: 5,
											}}
											layout="vertical"
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis type="number" />
											<YAxis dataKey="name" type="category" />
											<Tooltip />
											<Legend />
											<Bar dataKey="base" stackId="a" fill={shadeColor(pokeTypeToHex(data.pokemon.types[0]),-0.2)} />
											<Bar dataKey="min" stackId="a" fill={pokeTypeToHex(data.pokemon.types[0])} />
											<Bar dataKey="max" stackId="a" fill={shadeColor(pokeTypeToHex(data.pokemon.types[0]),0.20)} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</TabsContent>
							<TabsContent value="typing" className="h-full w-full p-2">
								<div className="flex flex-col items-start justify-center gap-1 mb-4">
									<Label className="text-lg font-semibold text-primary">Attack Type Effectiveness</Label>
									<div className="w-full flex items-center justify-start gap-2 flex-wrap">
										{/* get data.typeEffectiveness.damageTo, sort, and display */}
										{Object.entries(data.typeEffectiveness.damageTo).sort((a: any, b: any) => b[1] - a[1]).map(([type, value], index) => (
											<div key={type+index} className="flex flex-col items-center justify-center gap-2">
												<Badge
													className={cn(`bg-primary text-sm px-1 pr-2 bg-pokemon-${type} flex justify-center items-center gap-2`)}
												>
													<p className="text-xs bg-muted text-muted-foreground bg-opacity-10 px-1 py-0.5 rounded-full">{value === 4 ? "4x" : value === 2 ? "2x" : value === 0.5 ? ".5x" : value === 0.25 ? ".25x" : "1x"}</p>
													{capitalize(type)}
												</Badge>
											</div>
										))}
									</div>
								</div>
								<div className="flex flex-col items-start justify-center gap-1">
										<Label className="text-lg font-semibold text-primary">Defense Type Effectiveness</Label>
										<div className="w-full flex items-center justify-start gap-2 flex-wrap">
											{/* get data.typeEffectiveness.damageFrom, sort, and display */}
											{Object.entries(data.typeEffectiveness.damageFrom).sort((a: any, b: any) => b[1] - a[1]).map(([type, value], index) => (
												<div key={type+index} className="flex flex-col items-center justify-center gap-2">
													<Badge
														className={cn(`bg-primary text-sm px-1 pr-2 bg-pokemon-${type} flex justify-center items-center gap-2`)}
													>
														<p className="text-xs bg-muted text-muted-foreground bg-opacity-10 px-1 py-0.5 rounded-full">{value === 4 ? "4x" : value === 2 ? "2x" : value === 0.5 ? ".5x" : value === 0.25 ? ".25x" : "1x"}</p>
														{capitalize(type)}
													</Badge>
												</div>
											))}
										</div>
									</div>
							</TabsContent>
							<TabsContent value="moves" className="h-full w-full p-2">
								To be implemented!
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
