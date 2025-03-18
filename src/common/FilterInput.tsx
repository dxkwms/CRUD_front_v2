import { ChangeEvent } from "react";

interface IProps {
  filter: string;
  filterUsers: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FilterInput = ({ filterUsers, filter }: IProps) => {
  return (
    <input
      type="text"
      placeholder="Search by email"
      value={filter}
      onChange={(e) => filterUsers(e)}
      className="mb-4 p-1 bg-formBackground text-textWhite rounded-xl"
    />
  );
};
