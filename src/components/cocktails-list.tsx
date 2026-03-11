"use client";

import { CocktailItem } from "@/components/cocktail-item";
import { CocktailResponseSchema } from "@/types/cocktail";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env";
import { usePage } from "@/hooks/usePage";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { ChangeEvent } from "react";

export const CocktailsList = () => {
  const { page, setPage } = usePage();
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [alcoholic, setAlcoholic] = useQueryState("alcoholic", {
    defaultValue: "",
  });
  const [debouncedSearch] = useDebounce(search, 1000);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const { data: cocktails, isLoading } = useQuery({
    queryKey: ["cocktails", page, debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/cocktails/?page=${page}&alcoholic=${alcoholic}&name=%${debouncedSearch}%`,
      );
      const json = await res.json();
      const parseResult = CocktailResponseSchema.safeParse(json);
      if (!parseResult.success) throw new Error(parseResult.error.message);

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
      {isLoading && (
        <ul>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 items-center">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <Skeleton className="w-48 h-4" />
              {/*{cocktail.alcoholic ? <Wine /> : <WineOff />}*/}
            </div>
          ))}
        </ul>
      )}
      {!cocktails && !isLoading && <p>No cocktails found.</p>}
      {cocktails && (
        <>
          <ul>
            {cocktails.data.map(({ id, ...rest }) => (
              <CocktailItem key={id} id={id} {...rest} />
            ))}
          </ul>

          <Pagination>
            <PaginationContent>
              {cocktails.meta.previousPageUrl && (
                <>
                  <PaginationItem>
                    <PaginationPrevious href={cocktails.meta.previousPageUrl} />
                  </PaginationItem>
                  {cocktails.meta.currentPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {!cocktails.meta.nextPageUrl && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/?page=${cocktails.meta.currentPage - 2}`}
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
              {cocktails.meta.nextPageUrl && (
                <>
                  <PaginationItem>
                    <PaginationLink href={cocktails.meta.nextPageUrl}>
                      {cocktails.meta.currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {!cocktails.meta.previousPageUrl && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/?page=${cocktails.meta.currentPage + 2}`}
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
};
