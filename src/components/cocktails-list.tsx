"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { CocktailItem } from "@/components/cocktail-item";
import { CocktailItemSkeleton } from "@/components/cocktail-item-skeleton";
import { CocktailsFilters } from "@/components/cocktails-filters";
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
          <div className="min-h-[inherit] text-center">No cocktails found.</div>
        )}
        {cocktails != null && (
          <>
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cocktails.data.map(({ id, ...rest }) => (
                <CocktailItem key={id} id={id} {...rest} />
              ))}
            </ul>
            {/*<div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">*/}
            {/*  <p className="text-muted-foreground text-sm">*/}
            {/*    Wyświetlanie{" "}*/}
            {/*    <span className="text-foreground font-medium">*/}
            {/*      {(cocktails.meta.currentPage - 1) * cocktails.meta.perPage + 1}*/}
            {/*    </span>{" "}*/}
            {/*    -{" "}*/}
            {/*    <span className="text-foreground font-medium">*/}
            {/*      {cocktails.meta.currentPage * cocktails.meta.perPage}*/}
            {/*    </span>{" "}*/}
            {/*    z{" "}*/}
            {/*    <span className="text-foreground font-medium">*/}
            {/*      {cocktails.meta.total}*/}
            {/*    </span>{" "}*/}
            {/*    wyników*/}
            {/*  </p>*/}

            {/*  <Pagination>*/}
            {/*    <PaginationContent>*/}
            {/*      {cocktails.meta.previousPageUrl != null && (*/}
            {/*        <>*/}
            {/*          <PaginationItem>*/}
            {/*            <PaginationPrevious*/}
            {/*              href={cocktails.meta.previousPageUrl}*/}
            {/*            />*/}
            {/*          </PaginationItem>*/}
            {/*          {cocktails.meta.currentPage > 2 && (*/}
            {/*            <PaginationItem>*/}
            {/*              <PaginationEllipsis />*/}
            {/*            </PaginationItem>*/}
            {/*          )}*/}
            {/*          {cocktails.meta.nextPageUrl == null && (*/}
            {/*            <PaginationItem>*/}
            {/*              <PaginationLink*/}
            {/*                href={`/?page=${(cocktails.meta.currentPage - 2).toString()}`}*/}
            {/*              >*/}
            {/*                {cocktails.meta.currentPage - 2}*/}
            {/*              </PaginationLink>*/}
            {/*            </PaginationItem>*/}
            {/*          )}*/}
            {/*          <PaginationItem>*/}
            {/*            <PaginationLink href={cocktails.meta.previousPageUrl}>*/}
            {/*              {cocktails.meta.currentPage - 1}*/}
            {/*            </PaginationLink>*/}
            {/*          </PaginationItem>*/}
            {/*        </>*/}
            {/*      )}*/}
            {/*      <PaginationItem>*/}
            {/*        <PaginationLink href="#" isActive>*/}
            {/*          {cocktails.meta.currentPage}*/}
            {/*        </PaginationLink>*/}
            {/*      </PaginationItem>*/}
            {/*      {cocktails.meta.nextPageUrl == null ? null : (*/}
            {/*        <>*/}
            {/*          <PaginationItem>*/}
            {/*            <PaginationLink href={cocktails.meta.nextPageUrl}>*/}
            {/*              {cocktails.meta.currentPage + 1}*/}
            {/*            </PaginationLink>*/}
            {/*          </PaginationItem>*/}
            {/*          {cocktails.meta.previousPageUrl == null && (*/}
            {/*            <PaginationItem>*/}
            {/*              <PaginationLink*/}
            {/*                href={`/?page=${(cocktails.meta.currentPage + 2).toString()}`}*/}
            {/*              >*/}
            {/*                {cocktails.meta.currentPage + 2}*/}
            {/*              </PaginationLink>*/}
            {/*            </PaginationItem>*/}
            {/*          )}*/}
            {/*          {cocktails.meta.currentPage <*/}
            {/*            cocktails.meta.lastPage - 1 && (*/}
            {/*            <PaginationItem>*/}
            {/*              <PaginationEllipsis />*/}
            {/*            </PaginationItem>*/}
            {/*          )}*/}
            {/*          <PaginationItem>*/}
            {/*            <PaginationNext href={cocktails.meta.nextPageUrl} />*/}
            {/*          </PaginationItem>*/}
            {/*        </>*/}
            {/*      )}*/}
            {/*    </PaginationContent>*/}
            {/*  </Pagination>*/}
            {/*</div>*/}
          </>
        )}
      </section>
    </div>
  );
}
