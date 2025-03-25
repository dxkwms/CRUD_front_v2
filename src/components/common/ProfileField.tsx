import { Field } from "formik";
import { ChangeEvent } from "react";

interface Props {
  type: string;
  name: string;
  placeholder: string;
  value: string | number | Date;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileField = ({
  type,
  name,
  placeholder,
  onChange,
  value,
}: Props) => {
  return (
    <Field
      type={`${type}`}
      name={`${name}`}
      placeholder={`${placeholder}`}
      value={value}
      onChange={onChange}
      className={"bg-[#12130FEB] p-2 rounded-xl w-full text-textWhite mt-2"}
    />
  );
};
