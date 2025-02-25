import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonState {
    list: Pokemon[];
    filteredList: Pokemon[]; 
    searchTerm: string;
    loading: boolean;
}

const initialState: PokemonState = {
    list: [],
    filteredList: [],
    searchTerm: "",
    loading: false,
};

// Async thunk for fetching Pokémon
export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=180&offset=0");
    const data = await response.json();

    const detailedPokemon = await Promise.all(
      data.results.map(async (poke: any) => {
        const res = await fetch(poke.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
        };
      })
    );

    return detailedPokemon;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
        state.filteredList = state.list.filter((poke) =>
          poke.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPokemon.fulfilled,
        (state, action: PayloadAction<Pokemon[]>) => {
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPokemon.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const pokemonReducer = pokemonSlice.reducer;
export const { setSearchTerm } = pokemonSlice.actions;