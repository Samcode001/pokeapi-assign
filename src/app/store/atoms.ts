import { atom } from "recoil";

interface Pokemon{
    name:string,
    image:string
}

export const pokemonListState = atom({
  key: "PokemonList",
  default:<Pokemon[]>[],
});
