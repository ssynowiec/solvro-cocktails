import { parseAsInteger, useQueryState } from "nuqs";

export const usePage = () => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  return { page, setPage };
};
