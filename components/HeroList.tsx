"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeroType, deleteHero, getHeroesData } from "@/lib/heroActions";

const HeroList = () => {
  const { data, isLoading } = useQuery<HeroType[]>({
    queryKey: ["heroes"],
    queryFn: getHeroesData,
  });
  const queryClient = useQueryClient();

  const deleteHeroMutation = useMutation({
    mutationFn: deleteHero,
    // onMutate: (deletedHero) => {
    //   // Update the cache optimistically to remove the hero
    //   queryClient.setQueryData<HeroType[] | undefined>(
    //     ["heroes"],
    //     (existingHeroes) => {
    //       return existingHeroes?.filter((hero) => hero.id !== deletedHero.id);
    //     }
    //   );
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
      // queryClient.invalidateQueries({ queryKey: ['reminders'] })
    },
  });

  //   Loading
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-2 text-center">Heroes</h1>
      <div className="flex flex-row items-center space-x-2">
        {data?.map((item) => (
          <div
            key={item.id}
            className="px-3 py-2 border rounded-md flex space-x-2"
          >
            <p>{item.name}</p>
            <div
              onClick={() => deleteHeroMutation.mutate(item)}
              className="cursor-pointer"
            >
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroList;
