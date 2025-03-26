"use client";
import { useGetAllUsersQuery } from "@/lib/api/usersApi";
import { IUser } from "@/types/IUser";
import { UserProfile } from "@/components/admin/profile/UserProfile";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { FilterInput } from "@/common/FilterInput";
import { PAGINATION_LIMIT_COUNT } from "@/types/PAGINATION_LIMIT_COUNT";
import { usePaginateData } from "@/hooks/common/usePaginateData";

export const AllUsers = () => {
  const [searchUserByEmail, setSearchUserByEmail] = useState<string>("");
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching, refetch } = useGetAllUsersQuery({
    page,
    limit: PAGINATION_LIMIT_COUNT.users_limit,
  });

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const onPageChange = (newPage: number) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  const paginatedItemsPrepared = useMemo(
    () => data?.users?.filter(Boolean),
    [data?.users],
  );

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserByEmail(e.target.value);
  };

  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const filteredUsers = paginatedItemsPrepared?.filter((user: IUser) =>
    user.email.toLowerCase().includes(searchUserByEmail.toLowerCase()),
  );

  return (
    <div>
      <FilterInput
        filter={searchUserByEmail}
        filterUsers={filterUsers}
        filterText={"Search by email"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredUsers?.map((user: IUser) => (
          <UserProfile user={user} key={user._id} refetch={refetch} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        <span>
          {page} ... {totalPages}
        </span>
        <button
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={
            isFetching ||
            !data?.users ||
            data.users.length === 0 ||
            page === totalPages
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
