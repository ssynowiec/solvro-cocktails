"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import type { ChangeEvent } from "react";
import { useDebounce } from "use-debounce";

import { CocktailItem } from "@/components/cocktail-item";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { usePage } from "@/hooks/use-page";
import { CocktailResponseSchema } from "@/types/cocktail";

export function CocktailsList() {
  const { page, setPage } = usePage();
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [alcoholic] = useQueryState("alcoholic", {
    defaultValue: "",
  });
  const [debouncedSearch] = useDebounce(search, 1000);

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await setSearch(event.target.value);
    await setPage(1);
  };

  const { data: cocktails, isLoading } = useQuery({
    queryKey: ["cocktails", page, debouncedSearch, alcoholic],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/cocktails/?page=${page.toString()}&alcoholic=${alcoholic}&name=%${debouncedSearch}%`,
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
      <div className="flex gap-4">
        <Input
          type="search"
          placeholder="Search..."
          defaultValue={search}
          onChange={handleSearchChange}
        />
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="alcoholic" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="alcoholic">alcoholic</SelectItem>
              <SelectItem value="no-alcoholic">no-alcoholic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <ul>
          {Array.from({ length: 15 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex items-center gap-4 p-4">
              <Skeleton className="h-24 w-24 rounded-lg" />
              <Skeleton className="h-4 w-48" />
              {/*{cocktail.alcoholic ? <Wine /> : <WineOff />}*/}
            </div>
          ))}
        </ul>
      ) : null}
      {cocktails == null && !isLoading && <p>No cocktails found.</p>}
      {cocktails != null && (
        <>
          <ul>
            {cocktails.data.map(({ id, ...rest }) => (
              <CocktailItem key={id} id={id} {...rest} />
            ))}
          </ul>

          <Pagination>
            <PaginationContent>
              {cocktails.meta.previousPageUrl != null && (
                <>
                  <PaginationItem>
                    <PaginationPrevious href={cocktails.meta.previousPageUrl} />
                  </PaginationItem>
                  {cocktails.meta.currentPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {cocktails.meta.nextPageUrl == null && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/?page=${(cocktails.meta.currentPage - 2).toString()}`}
                      >
                        {cocktails.meta.currentPage - 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink href={cocktails.meta.previousPageUrl}>
                      {cocktails.meta.currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {cocktails.meta.currentPage}
                </PaginationLink>
              </PaginationItem>
              {cocktails.meta.nextPageUrl == null ? null : (
                <>
                  <PaginationItem>
                    <PaginationLink href={cocktails.meta.nextPageUrl}>
                      {cocktails.meta.currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {cocktails.meta.previousPageUrl == null && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/?page=${(cocktails.meta.currentPage + 2).toString()}`}
                      >
                        {cocktails.meta.currentPage + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {cocktails.meta.currentPage < cocktails.meta.lastPage - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext href={cocktails.meta.nextPageUrl} />
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
}
