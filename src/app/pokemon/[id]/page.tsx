"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { use } from "react"; // Import `use` from React

const POKEMON_API = "https://pokeapi.co/api/v2/";

interface Pokemon {
  id: number;
  name: string;
  sprites: any;
  height: string;
  weight: string;
  base_experience: string;
  types: string[];
  abilities: string[];
  moves: any[];
  stats: { name: string; value: number }[];
}

export default function PokemonDetail() {
  const params = useParams();
  //   const params = use(paramsPromise); // Unwrap params correctly

  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      if (!params.id) return; // Ensure ID exists before fetching

      const response = await fetch(`${POKEMON_API}pokemon/${params.id}`);
      const data = await response.json();
      setPokemonDetails(data);
      setLoading(false);
    }

    fetchPokemon();
  }, [params.id]);

  if (loading) return <p>Loading Pokémon details...</p>;
  if (!pokemonDetails) return <p>Pokémon not found.</p>;

  return (
    <>
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold capitalize">{pokemonDetails.name}</h1>
        <img
          src={pokemonDetails.sprites.other["official-artwork"].front_default}
          alt={pokemonDetails.name}
          className="w-48 h-48"
        />
        <p>Height: {pokemonDetails.height}m</p>
        <p>Weight: {pokemonDetails.weight}kg</p>
        <p>Xp: {pokemonDetails.base_experience}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {pokemonDetails.sprites.other["official-artwork"].front_default && (
          <img
            src={pokemonDetails.sprites.other["official-artwork"].front_default}
            alt="Official Artwork"
            className="w-40 h-40 object-contain"
          />
        )}
        {pokemonDetails.sprites.front_default && (
          <img
            src={pokemonDetails.sprites.front_default}
            alt="Front Default"
            className="w-32 h-32 object-contain"
          />
        )}
        {pokemonDetails.sprites.back_default && (
          <img
            src={pokemonDetails.sprites.back_default}
            alt="Back Default"
            className="w-32 h-32 object-contain"
          />
        )}
        {pokemonDetails.sprites.front_shiny && (
          <img
            src={pokemonDetails.sprites.front_shiny}
            alt="Shiny Front"
            className="w-32 h-32 object-contain"
          />
        )}
        {pokemonDetails.sprites.other["dream_world"].front_default && (
          <img
            src={pokemonDetails.sprites.other["dream_world"].front_default}
            alt="Dream World"
            className="w-32 h-32 object-contain"
          />
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {pokemonDetails.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-lg text-center shadow-sm"
            >
              <p className="font-semibold">{stat.name}</p>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Moves Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">Moves</h2>
        <div className="flex flex-wrap gap-2">
          {pokemonDetails.moves.map((moveObj, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {moveObj.move.name} {/* Extract move name properly */}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
