"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { capitalize, cn, pokeTypeToTW, pokeTypeToImg, pad } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Icons } from "./Icons";

type Props = {
	pokemon: any;
	index: number;
};

export const SmallPokemonCard = React.memo(({ pokemon, index }: Props) => {
	console.log(pokemon);
	const [pokemonData, setPokemonData] = React.useState<any>(
		typeof pokemon === "number" || parseInt(pokemon) > 0
			? { id: -1, types: ["-1"], name: "-1", image: "-1" }
			: pokemon
	);

	useEffect(() => {
		if (typeof pokemon === "number") {
			fetch(`/api/pokemon/${pokemon + 1}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data.data.pokemon);
					setPokemonData(data.data.pokemon);
				});
		}
	}, []);

	console.log(pokemonData);
	const router = useRouter();

	return (
		<Card
			onClick={() => {
				pokemonData.id !== -1 ? router.push(`/pokemon/${pokemonData.id}`) : {};
			}}
			key={index}
			className={cn(
				`flex flex-col self-stretch drop-shadow-md hover:-translate-y-2 hover:drop-shadow-${
					pokemonData.types[0] !== "-1" ? pokeTypeToTW(pokemonData.types[0]) : ""
				} cursor-pointer transition-all ease-in-out duration-200`
			)}
		>
			<CardContent className="flex flex-col items-center justify-center gap-1 p-2">
				{pokemonData.image !== "-1" ? (
					<>
						<img
							width={80}
							height={80}
							src={pokemonData.image}
							alt={`${pokemonData.name}${pokemonData.id}`}
							className="w-20 h-20"
						/>
						<div className="flex items-start justify-start">
						<p className="text-sm text-center text-foreground">
							{capitalize(pokemonData.name)}
						</p>
						<p className="text-xs text-center text-muted-foreground">
							{`#${pad(pokemonData.id, 3)}`}
						</p>
					</div>
					<div className="flex justify-center items-center gap-2">
						{pokemonData.types.map((type: any, index: number) => (
							<Badge key={type + index + "scard"} className={cn(`bg-pokemon-${type}`)}>
								{capitalize(type)}
							</Badge>
						))}
					</div>
				</>
				) : (
					<div className="w-20 h-20 flex flex-col justify-center items-center gap-2">
						<div className="animate-spin">
							<Icons.spinner className="w-8 h-8 scale-100 animate-spin color-black"/>
						</div>
						<p className="text-lg font-bold">Loading</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
});
