import { useEffect, useRef, useState } from "react";

type PaginateDataProps<T> = {
  data?: T[];
  page: number;
};

export const usePaginateData = <T,>({ data, page }: PaginateDataProps<T>) => {
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  const pageRef = useRef(page);
  pageRef.current = page;

  const prevPageRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prevPage = prevPageRef.current;

    if (prevPage !== undefined && prevPage >= pageRef.current) {
      setPaginatedData(data ?? []);
    } else if (data !== undefined) {
      setPaginatedData((paginatedData) => [...paginatedData, ...(data ?? [])]);
    }
    prevPageRef.current = pageRef.current;
  }, [data]);

  return paginatedData;
};
