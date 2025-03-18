"use client";
import { useGetAllUsersQuery } from "@/lib/api/usersApi";
import { IUser } from "@/types/IUser";
import { UserProfile } from "@/components/admin/profile/UserProfile";
import { ChangeEvent, useState } from "react";
import { FilterInput } from "@/common/FilterInput";

export const AllUsers = () => {
  const [searchUserByEmail, setSearchUserByEmail] = useState<string>("");
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserByEmail(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const filteredUsers = users?.filter((user: IUser) =>
    user.email.toLowerCase().includes(searchUserByEmail.toLowerCase()),
  );

  return (
    <div>
      <FilterInput filter={searchUserByEmail} filterUsers={filterUsers} />

      <div className={"flex flex-wrap gap-4"}>
        {filteredUsers?.map((user: IUser) => (
          <UserProfile user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};
