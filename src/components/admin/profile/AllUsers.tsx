"use client";
import { useGetAllUsersQuery } from "@/lib/api/usersApi";
import { IUser } from "@/types/IUser";

import { UserProfile } from "@/components/admin/profile/UserProfile";

export const AllUsers = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className={"flex flex-wrap gap-4"}>
      {users?.map((user: IUser) => <UserProfile user={user} key={user._id} />)}
    </div>
  );
};
