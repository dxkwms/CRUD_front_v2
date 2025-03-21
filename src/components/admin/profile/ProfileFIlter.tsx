import { useRef, useState } from "react";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";
import { FILTERS } from "@/types/filtersEnum";
import { CommonButton } from "@/components/common/CommonButton";

interface IProps {
  onFilterChange: (filterType: string) => void;
}

export const ProfileFilter = ({ onFilterChange }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsListOpen: setIsOpen });

  return (
    <div className="relative z-10 opacity-95">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-formBackground text-white px-4 py-2 ${isOpen ? "rounded-t-xl" : "rounded-xl"} w-32`}
      >
        Filter {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div
          className="absolute bg-formBackground text-white rounded-b-xl w-32"
          ref={wrapperRef}
        >
          <CommonButton
            variant="filter"
            clickedFn={() => onFilterChange(FILTERS.NAME)}
          >
            Name
          </CommonButton>
          <CommonButton
            variant="filter"
            clickedFn={() => onFilterChange(FILTERS.COUNTRY)}
          >
            Country
          </CommonButton>
          <CommonButton
            variant="filter"
            clickedFn={() => onFilterChange(FILTERS.CITY)}
          >
            City
          </CommonButton>
          <CommonButton
            variant="filter"
            clickedFn={() => onFilterChange(FILTERS.AGE)}
          >
            Users 18
          </CommonButton>
        </div>
      )}
    </div>
  );
};
