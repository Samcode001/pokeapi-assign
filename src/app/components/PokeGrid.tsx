"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../store/slices/pokemonSlice";
import { RootState, AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";

export default function PokeGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, filteredList, searchTerm, loading } = useSelector(
    (state: RootState) => state.pokemon
  );
  console.log(filteredList);
  const router = useRouter();

  useEffect(() => {
    if (list.length === 0) dispatch(fetchPokemon());
  }, [dispatch, list]);

  return loading ? (
    <p className="text-gray-600 text-center">Loading Pokémon...</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {(searchTerm.length == 0 ? list : filteredList).map((poke, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center"
          onClick={() => router.push(`/pokemon/${poke.id}`)}
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
      {searchTerm.length > 0 && filteredList.length === 0 && (
        <p className="text-gray-600 text-center">No Pokemon found</p>
      )}
    </div>
  );
}
