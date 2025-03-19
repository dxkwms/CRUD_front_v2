import { useRef, useState } from "react";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";

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
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => onFilterChange("name")}
          >
            Name
          </button>
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => onFilterChange("country")}
          >
            Country
          </button>
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => onFilterChange("city")}
          >
            City
          </button>
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-700"
            onClick={() => onFilterChange("age")}
          >
            Users 18+
          </button>
        </div>
      )}
    </div>
  );
};
