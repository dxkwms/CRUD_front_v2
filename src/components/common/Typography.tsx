import React from "react";

type TypographyProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "subtitle"
    | "caption";
  className?: string;
  children: React.ReactNode;
};

export const Typography = ({
  variant = "body",
  className = "",
  children,
}: TypographyProps) => {
  const baseStyles = "font-sans text-gray-800";

  const variantStyles: Record<string, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-xl font-normal",
    h5: "text-lg font-normal",
    h6: "text-base font-normal",
    body: "text-base font-normal",
    subtitle: "text-lg font-semibold ",
    caption: "text-sm text-white",
  };

  const variantClass = variantStyles[variant] || variantStyles.body;

  return (
    <p className={`${baseStyles} ${variantClass} ${className}`}>{children}</p>
  );
};
