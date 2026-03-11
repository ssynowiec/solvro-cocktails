import { CocktailsList } from "@/components/cocktails-list";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CocktailsList />
      {/*<CocktailsPagination />*/}
    </main>
  );
};

export default Home;
