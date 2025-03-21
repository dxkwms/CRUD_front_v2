import { GENDERS } from "@/types/gengersEnum";

interface IGenderCheckboxProps {
  id: string;
  value: GENDERS;
  selectedValue: string;
  setFieldValue: (field: string, value: GENDERS) => void;
  label: string;
}

export const GenderCheckbox = ({
  id,
  value,
  selectedValue,
  setFieldValue,
  label,
}: IGenderCheckboxProps) => {
  return (
    <div className="flex items-center mx-5">
      <input
        type="radio"
        id={id}
        name="gender"
        className="hidden peer"
        onChange={() => setFieldValue("gender", value)}
        checked={selectedValue === value}
      />
      <label
        htmlFor={id}
        className="w-4 h-4 border-2 border-[#D9D9D9] bg-[#D9D9D9] rounded-none cursor-pointer peer-checked:bg-buttonColor peer-checked:border-buttonColor"
      ></label>
      <span
        className="ml-2 text-gray-400 cursor-pointer"
        onClick={() => setFieldValue("gender", value)}
      >
        {label}
      </span>
    </div>
  );
};
