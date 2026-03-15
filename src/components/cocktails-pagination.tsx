import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
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
import { usePage } from "@/hooks/use-page";

interface CocktailsPaginationProps {
  perPage: number;
  total: number;
  lastPage: number;
}

export function CocktailsPagination({
  total,
  lastPage,
}: CocktailsPaginationProps) {
  const { page, setPage, perPage, handleChangePerPage } = usePage();

  return (
    <div className="flex w-full flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-between">
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <p className="text-muted-foreground w-auto text-center text-sm md:text-left">
          Showing{" "}
          <span className="text-foreground font-medium">
            {(page - 1) * perPage + 1}
          </span>{" "}
          -{" "}
          <span className="text-foreground font-medium">
            {page === lastPage ? total : page * perPage}
          </span>{" "}
          from <span className="text-foreground font-medium">{total}</span>{" "}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-sm md:text-left">per page</p>
          <Select
            defaultValue={perPage.toString()}
            onValueChange={async (value) => handleChangePerPage(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={async () => setPage(page - 1)}
              disabled={page === 1}
            />
          </PaginationItem>

          {page > 3 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          {page > 1 ? (
            <PaginationItem>
              <PaginationButton onClick={async () => setPage(page - 1)}>
                {page - 1}
              </PaginationButton>
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <PaginationButton isActive>{page}</PaginationButton>
          </PaginationItem>

          {page < lastPage ? (
            <PaginationItem>
              <PaginationButton onClick={async () => setPage(page + 1)}>
                {page + 1}
              </PaginationButton>
            </PaginationItem>
          ) : null}

          {page < lastPage - 1 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <PaginationNext
              onClick={async () => setPage(page + 1)}
              disabled={page === lastPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
