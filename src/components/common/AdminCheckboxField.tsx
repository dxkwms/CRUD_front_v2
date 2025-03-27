import { Field, FormikErrors } from "formik";
import { Role } from "@/types/IUser";

interface Props {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<HTMLInputElement>>;
  role: Role;
}

export const AdminCheckboxField = ({ setFieldValue, role }: Props) => {
  return (
    <>
      <Field
        type="checkbox"
        name="role"
        id="admin"
        className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700 mt-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldValue("role", e.target.checked ? Role.Admin : Role.User);
        }}
        checked={role === Role.Admin}
      />
      <label htmlFor="admin" className="ml-2 text-gray-400">
        Admin
      </label>
    </>
  );
};
