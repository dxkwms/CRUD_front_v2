import { ChangeEvent } from "react";

interface IProps {
  filter: string;
  filterText: string;
  filterUsers: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FilterInput = ({ filterUsers, filter, filterText }: IProps) => {
  return (
    <input
      type="text"
      placeholder={`${filterText}`}
      value={filter}
      onChange={(e) => filterUsers(e)}
      className="mb-4 p-2 bg-formBackground text-textWhite rounded-xl"
    />
  );
};
