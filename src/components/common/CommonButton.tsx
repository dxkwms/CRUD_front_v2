import { MouseEventHandler, ReactNode } from "react";

interface CommonButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "apply" | "cancel" | "filter";

  clickedFn?: MouseEventHandler<HTMLButtonElement>;
}

export const CommonButton = ({
  children,
  disabled,
  clickedFn,
  variant = "cancel",
  className = "",
  type = "button",
}: CommonButtonProps) => {
  const baseStyles =
    "h-10 text-textWhite font-bold rounded-lg focus:outline-none focus:ring-2 mx-auto block transition";

  const variantStyles = {
    apply: "bg-editButtonColor hover:bg-[#7cc47a] focus:ring-[#7cc47a]",
    cancel: "bg-buttonColor hover:bg-red-800 focus:ring-red-800",
    filter: "block px-4 py-2 w-full text-left hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={clickedFn}
      className={`
      ${className} ${variantStyles[variant]} ${baseStyles}`}
    >
      {children}
    </button>
  );
};
