import { parseAsInteger, useQueryState } from "nuqs";

export const usePage = () => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger.withDefault(15).withOptions({ shallow: false }),
  );

  const handleChangePerPage = async (newPerPage: number) => {
    await setPerPage(newPerPage);
    await setPage(1);
  };

  return { page, setPage, perPage, handleChangePerPage };
};
