import { atom, useAtom, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const favoritesAtom = atomWithStorage<number[]>("favorites", []);

const toggleFavoriteAtom = atom(null, (get, set, id: number) => {
  const favorites = get(favoritesAtom);
  if (favorites.includes(id)) {
    set(
      favoritesAtom,
      favorites.filter((f) => f !== id),
    );
  } else {
    set(favoritesAtom, [...favorites, id]);
  }
});

export const useFavorite = () => {
  const [favorites] = useAtom(favoritesAtom);
  const toggleFavorite = useSetAtom(toggleFavoriteAtom);

  return { favorites, toggleFavorite };
};
