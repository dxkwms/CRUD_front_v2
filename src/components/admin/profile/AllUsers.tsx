"use client";
import { useGetAllUsersQuery } from "@/lib/api/usersApi";
import { IUser } from "@/types/IUser";
import { UserProfile } from "@/components/admin/profile/UserProfile";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { FilterInput } from "@/common/FilterInput";
import { PAGINATION_LIMIT_COUNT } from "@/types/PAGINATION_LIMIT_COUNT";
import { PaginationController } from "@/components/pagination/PaginationController";
import { useDebounce } from "@/hooks/common/useDebounce";

export const AllUsers = () => {
  const [searchUserByEmail, setSearchUserByEmail] = useState<string>("");
  const [page, setPage] = useState(1);
  const debouncedValue = useDebounce({ value: searchUserByEmail, delay: 500 });

  const searchQuery = debouncedValue.length >= 3 ? debouncedValue : "";

  const { data, error, isLoading, isFetching, refetch } = useGetAllUsersQuery({
    page,
    limit: PAGINATION_LIMIT_COUNT.users_limit,
    searchEmail: searchQuery,
  });

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const onPageChange = (newPage: number) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserByEmail(e.target.value);
  };

  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;


  return (
    <div>
      <FilterInput
        filter={searchUserByEmail}
        filterUsers={filterUsers}
        filterText={"Search by email"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.users?.map((user: IUser) => (
          <UserProfile user={user} key={user._id} refetch={refetch} />
        ))}
      </div>

      <PaginationController
        data={data}
        isFetching={isFetching}
        onPageChange={onPageChange}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};
