export interface HeroType {
  id: number | string;
  name: string;
}

export const getHeroesData = async (): Promise<HeroType[]> => {
  try {
    const response = await fetch("http://localhost:4001/superheroes", {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch heroes");
    }
    const data: HeroType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching heroes:", error);
    throw error;
  }
};

export const addHero = async (heroData: HeroType): Promise<HeroType> => {
  try {
    const response = await fetch("http://localhost:4001/superheroes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(heroData),
    });

    if (!response.ok) {
      throw new Error("Failed to add hero");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding hero:", error);
    throw error;
  }
};

export const updateHero = async (
  id: number | string,
  updatedHeroData: HeroType
): Promise<HeroType> => {
  try {
    const response = await fetch(`http://localhost:4001/superheroes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHeroData),
    });

    if (!response.ok) {
      throw new Error("Failed to update hero");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating hero:", error);
    throw error;
  }
};

export const deleteHero = async (heroData: HeroType): Promise<HeroType> => {
  try {
    const response = await fetch(
      `http://localhost:4001/superheroes/${heroData.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete hero");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting hero:", error);
    throw error;
  }
};
