import { NextRequest } from "next/server";
import { pokemons } from "@/data/pokemons";

type Data = {
  success: boolean;
  data?: any[];
  error?: string;
};

async function getPokeList() {
  try {
    // Locally cached data to prevent DDOSing the PokeAPI and to increase load times
    return pokemons.data;

    /*
    const pokelist = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=-1").then((res) => res.json());

    let pool = [];
    for (let i = 0; i < pokelist.results.length; i++) {
      pool.push(fetch(pokelist.results[i].url)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => ({
          id: data.id,
          name: data.name,
          sprite: data.sprites.other['home'].front_default,
          types: data.types.map((type: { type: { name: string }; }) => ({
            typeName: type.type.name,
          }))
        }))
        .catch(error => {
          console.error(`Error fetching ${pokelist.results[i].url}:`, error);
          return null;
        }));
    }

    const result = await Promise.all(pool);
    return result.filter(item => item !== null);
    */
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {

  try {
    const listings = await getPokeList();
    return Response.json({ success: true, data: listings });
  } catch (error) {
    return Response.json({ success: false, error: error });
  }
}