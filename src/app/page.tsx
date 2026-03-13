import { CocktailsList } from "@/components/cocktails-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CocktailsList />
      {/*<CocktailsPagination />*/}
    </main>
  );
}
