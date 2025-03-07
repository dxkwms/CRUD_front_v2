import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  disabled: boolean;
}

export const CommonButton = ({ children, disabled }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-1/2 py-2 bg-buttonColor text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 mx-auto block"
    >
      {children}
    </button>
  );
};
