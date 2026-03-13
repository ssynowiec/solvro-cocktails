import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePage } from "@/hooks/use-page";

interface CocktailsPaginationProps {
  perPage: number;
  total: number;
  lastPage: number;
}

export function CocktailsPagination({
  perPage,
  total,
  lastPage,
}: CocktailsPaginationProps) {
  const { page, setPage } = usePage();

  return (
    <div className="flex w-full flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-between">
      <p className="text-muted-foreground w-full text-center text-sm md:w-full md:text-left">
        Showing{" "}
        <span className="text-foreground font-medium">
          {(page - 1) * perPage + 1}
        </span>{" "}
        - <span className="text-foreground font-medium">{page * perPage}</span>{" "}
        from <span className="text-foreground font-medium">{total}</span>{" "}
      </p>

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
