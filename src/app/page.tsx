"use client";

import Image from "next/image";
import SearchBar from "./components/Searchbar";
import PokeGrid from "./components/PokeGrid";
import ReduxProvider from "./store/Provider";

export default function Home() {
  return (
    <ReduxProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            src="/assets/pokemon-logo.png"
            alt="Pokemon Logo"
            width={200}
            height={120}
            className="w-72 sm:w-80 rounded-xl overflow-hidden"
          />
          <SearchBar />
          <PokeGrid />
        </main>
      </div>
    </ReduxProvider>
  );
}
