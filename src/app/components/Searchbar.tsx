"use client";
import { Search } from "lucide-react";
import { setSearchTerm } from "../store/slices/pokemonSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

export default function SearchBar() {

    const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Pikachu,Mewtwo etc."
        className="w-full pl-12 pr-4 py-2 rounded-full border text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none shadow-sm transition-all"
  onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
      />
    </div>
  );
}
