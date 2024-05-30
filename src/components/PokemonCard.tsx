"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { capitalize, cn, pokeTypeToTW, pokeTypeToImg } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
	pokemon: any;
	index: number;
};

export const PokemonCard = React.memo(({ pokemon, index }: Props) => {
  const router = useRouter();

	return (
		<Card
			onClick={() => router.push(`/pokemon/${pokemon.id}`)}
			key={index}
			className={cn(
				`w-40 flex flex-col self-stretch drop-shadow-md hover:-translate-y-2 hover:drop-shadow-${pokeTypeToTW(
					pokemon.types[0].typeName
				)} cursor-pointer transition-all ease-in-out duration-200`
			)}
		>
			<CardHeader className="flex flex-row justify-between items-center p-4 pb-0 space-y-0">
				<p className="text-[22px] font-bold leading-none">{pokemon.id}</p>
				<div className="flex justify-end items-center gap-1">
					{pokemon.types.map(
						(type: any, index: number) =>
							pokeTypeToImg(type.typeName) !== "" && (
								<div
									key={index}
									className={cn(
										`bg-${pokeTypeToTW(type.typeName)} p-1.5 rounded-full`
									)}
								>
									<Image
										src={pokeTypeToImg(type.typeName)}
										alt={type.typeName}
										width={16}
										height={16}
									/>
								</div>
							)
					)}
				</div>
			</CardHeader>
			<CardContent className="flex flex-col items-center justify-center gap-4 p-4">
				<img
					width={96}
					height={96}
					src={pokemon.sprite}
					alt={`${pokemon.name}${pokemon.id}`}
					className="w-24 h-24"
				/>
				<p className="text-xl text-center">{capitalize(pokemon.name)}</p>
			</CardContent>
		</Card>
	);
});
