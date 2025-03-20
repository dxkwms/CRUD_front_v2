interface IFilterButtonProps {
  buttonText: string;
  changeValue: string;
  onFilterChange: (filterType: string) => void;
}

export const FilterButton = ({
  onFilterChange,
  buttonText,
  changeValue,
}: IFilterButtonProps) => {
  return (
    <button
      className="block px-4 py-2 w-full text-left hover:bg-gray-700"
      onClick={() => onFilterChange(changeValue)}
    >
      {buttonText}
    </button>
  );
};
