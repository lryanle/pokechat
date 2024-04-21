"use client"

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card"
import '../App.scss';

type PokemonCardProps = {
    pokemonID: number;
}

export const PokemonCard = ({pokemonID} : PokemonCardProps) => {
    // const [data, setData] = useState(null);

    useEffect(() => {
        //AXIOS GET ON THE POKEAPI PT 
    }, [pokemonID]);
    
    return (
        <Card>
            {pokemonID}
        </Card>
    );
}