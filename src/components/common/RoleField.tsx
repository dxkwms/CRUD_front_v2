import { Field } from "formik";
import { ChangeEvent, ChangeEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  isChecked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const RoleField = ({
  onChange,
  isChecked,
  children,
  className = "",
}: Props) => {
  return (
    <>
      <Field
        type="checkbox"
        name="role"
        id="admin"
        className={`h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700 ${className}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        checked={isChecked}
      />
      <label htmlFor="admin" className="ml-2 text-gray-400">
        {children}
      </label>
    </>
  );
};
