"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { CocktailItem } from "@/components/cocktail-item";
import { CocktailItemSkeleton } from "@/components/cocktail-item-skeleton";
import { CocktailsFilters } from "@/components/cocktails-filters";
import { CocktailsPagination } from "@/components/cocktails-pagination";
import { env } from "@/env";
import { useFilters } from "@/hooks/use-filters";
import { usePage } from "@/hooks/use-page";
import { CocktailResponseSchema } from "@/types/cocktail";

export function CocktailsList() {
  const { page } = usePage();
  const { search, alcoholic, categories } = useFilters();
  const [debouncedSearch] = useDebounce(search, 1000);

  const alcoholicFilter = alcoholic === "all" ? "" : alcoholic;

  const { data: cocktails, isLoading } = useQuery({
    queryKey: ["cocktails", page, debouncedSearch, alcoholicFilter, categories],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/cocktails/?page=${page.toString()}&alcoholic=${alcoholicFilter}&category=${categories.join(",")}&name=%${debouncedSearch}%`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cocktails");
      }

      const parseResult = CocktailResponseSchema.safeParse(
        await response.json(),
      );

      if (!parseResult.success) {
        throw new Error(parseResult.error.message);
      }

      return parseResult.data;
    },
  });

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row">
        <CocktailsFilters />
        <section className="w-full lg:w-3/4">
          {isLoading ? (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 15 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  <CocktailItemSkeleton />
                </li>
              ))}
            </ul>
          ) : null}
          {cocktails?.data.length === 0 && !isLoading && (
            <div className="min-h-[inherit] text-center">
              No cocktails found.
            </div>
          )}
          {cocktails != null && (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cocktails.data.map(({ id, ...rest }) => (
                <CocktailItem key={id} id={id} {...rest} />
              ))}
            </ul>
          )}
        </section>
      </div>
      {cocktails?.meta == null ? null : (
        <CocktailsPagination
          perPage={cocktails.meta.perPage}
          total={cocktails.meta.total}
          lastPage={cocktails.meta.lastPage}
        />
      )}
    </>
  );
}
