import { PropsWithChildren } from "react";

interface IProps {
  className?: string;
}

export const FormWrapper = ({
  children,
  className = "",
}: PropsWithChildren<IProps>) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20`}
    >
      {children}
    </div>
  );
};
