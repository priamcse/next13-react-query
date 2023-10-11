import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { getHeroesData } from "@/lib/heroActions";
import HeroList from "@/components/HeroList";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["heroes"], getHeroesData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hydrate state={dehydratedState}>
        <HeroList />
      </Hydrate>
    </main>
  );
}
