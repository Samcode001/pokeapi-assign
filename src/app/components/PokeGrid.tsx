"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pokemonListState } from "../store/atoms";

interface Pokemon {
  name: string;
  image: string;
}

export default function PokeGrid() {
  const [pokemonList, setPokemonList] = useRecoilState(pokemonListState);
  const [loading, setLoading] = useState(true);

  async function fetchPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=12"
      );
      const data = await response.json();

      // Fetch details for each Pokémon
      const detailedPokemon = await Promise.all(
        data.results.map(async (poke: any) => {
          const res = await fetch(poke.url);
          const details = await res.json();
          return {
            name: details.name,
            image: details.sprites.other["official-artwork"].front_default, // Using default Pokémon sprite
          };
        })
      );
      console.log(data);

      setPokemonList(detailedPokemon);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return loading ? (
    <p className="text-gray-600 text-center">Loading Pokémon...</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((poke: any, index: any) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center"
        >
          <Image
            src={poke.image}
            alt={poke.name}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <h3 className="mt-3 text-lg font-semibold text-gray-800 capitalize">
            {poke.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
