import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  width: string;
  color: string;
  hoverColor: string;
  clickedFn?: (id?: string | null) => void;
}

export const CommonButton = ({
  children,
  disabled,
  clickedFn,
  hoverColor,
  color,
  width,
}: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={clickedFn}
      className={`
        w-${width} py-2 bg-${color} text-white font-bold rounded-lg hover:bg-${hoverColor} focus:outline-none focus:ring-2 focus:ring-${hoverColor} mx-auto block transition
      `}
    >
      {children}
    </button>
  );
};
