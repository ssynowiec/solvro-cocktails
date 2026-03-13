import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from "nuqs";
import type { ChangeEvent } from "react";

import { categories as categoriesArray } from "@/constants/categories";
import { usePage } from "@/hooks/use-page";

export const useFilters = () => {
  const { setPage } = usePage();

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await setSearch(event.target.value);
    await setPage(1);
  };

  const [alcoholic, setAlcoholic] = useQueryState(
    "alcoholic",
    parseAsStringLiteral(["all", "alcoholic", "non-alcoholic"]).withDefault(
      "all",
    ),
  );

  const [categories, setCategories] = useQueryState(
    "category",
    parseAsArrayOf(parseAsStringLiteral(categoriesArray)).withDefault([]),
  );

  return {
    search,
    handleSearchChange,
    alcoholic,
    setAlcoholic,
    categories,
    setCategories,
  };
};
