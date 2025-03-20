import { useRef, useState } from "react";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";
import { FilterButton } from "@/components/admin/profile/FilterButton";
import { FILTERS } from "@/types/filtersEnum";

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
          <FilterButton
            onFilterChange={onFilterChange}
            buttonText={"Name"}
            changeValue={FILTERS.NAME}
          />
          <FilterButton
            onFilterChange={onFilterChange}
            buttonText={"Country"}
            changeValue={FILTERS.COUNTRY}
          />
          <FilterButton
            onFilterChange={onFilterChange}
            buttonText={"City"}
            changeValue={FILTERS.CITY}
          />
          <FilterButton
            onFilterChange={onFilterChange}
            buttonText={"Users 18+"}
            changeValue={FILTERS.AGE}
          />
        </div>
      )}
    </div>
  );
};
