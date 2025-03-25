"use client";
import { useGetAllUsersQuery } from "@/lib/api/usersApi";
import { IUser } from "@/types/IUser";
import { UserProfile } from "@/components/admin/profile/UserProfile";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { FilterInput } from "@/common/FilterInput";
import { PAGINATION_LIMIT_COUNT } from "@/types/PAGINATION_LIMIT_COUNT";
import { usePaginateData } from "@/hooks/common/usePaginateData";
import { isElementAtBottomOfPage } from "@/utils/isElementAtBottomOfPage";
import { useScrollListener } from "@/hooks/dom/useScrollListener";

export const AllUsers = () => {
  const [searchUserByEmail, setSearchUserByEmail] = useState<string>("");
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit: PAGINATION_LIMIT_COUNT.users_limit,
  });

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const paginatedData = usePaginateData({
    data: data?.users,
    page,
  });

  const scrollHandler = useCallback(() => {
    if (isElementAtBottomOfPage() && !isFetchingRef.current) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useScrollListener(scrollHandler);

  const paginatedItemsPrepared = useMemo(
    () =>
      paginatedData?.filter(Boolean) as Array<
        NonNullable<(typeof paginatedData)[number]>
      >,
    [paginatedData],
  );

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserByEmail(e.target.value);
  };

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

      <div className={"flex flex-wrap gap-4"}>
        {filteredUsers?.map((user: IUser) => (
          <UserProfile user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};
