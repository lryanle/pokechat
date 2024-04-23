"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { capitalize, cn, pokeTypeToTW, pokeTypeToImg, pad } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type Props = {
	pokemon: any;
	index: number;
};

export const SmallPokemonCard = React.memo(({ pokemon, index }: Props) => {
	const router = useRouter();

	return (
		<Card
			onClick={() => router.push(`/pokemon/${pokemon.id}`)}
			key={index}
			className={cn(
				`flex flex-col self-stretch drop-shadow-md hover:-translate-y-2 hover:drop-shadow-${pokeTypeToTW(
					pokemon.types[0].typeName
				)} cursor-pointer transition-all ease-in-out duration-200`
			)}
		>
			<CardContent className="flex flex-col items-center justify-center gap-1 p-2">
				<Image
					width={96}
					height={96}
					src={pokemon.sprite}
					alt={`${pokemon.name}${pokemon.id}`}
					className="w-24 h-24"
				/>
				<div className="flex items-start justify-start">
					<p className="text-sm text-center text-foreground">
						{capitalize(pokemon.name)}
					</p>
					<p className="text-xs text-center text-muted-foreground">{`#${pad(
						pokemon.id,
						3
					)}`}</p>
				</div>
				<div className="flex justify-center items-center gap-2">
					{pokemon.types.map((type: any, index: number) => (
						<Badge
							key={type + index + "scard"}
							className={cn(`bg-pokemon-${type.typeName}`)}
						>
							{capitalize(type.typeName)}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
});
