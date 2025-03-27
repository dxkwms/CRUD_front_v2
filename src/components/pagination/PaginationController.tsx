import { IUser } from "@/types/IUser";

interface IProps {
  page: number;
  totalPages: number;
  data?: { users: IUser[]; totalPages: number; currentPage: number };
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationController = ({
  page,
  totalPages,
  data,
  isFetching,
  onPageChange,
}: IProps) => {
  return (
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
  );
};
