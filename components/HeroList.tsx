"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeroType, getHeroesData } from "@/lib/heroActions";

const HeroList = () => {
  const { data, isLoading } = useQuery<HeroType[]>({
    queryKey: ["heroes"],
    queryFn: getHeroesData,
  });
  const queryClient = useQueryClient();

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
            <div>x</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroList;
