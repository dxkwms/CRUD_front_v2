import { useEffect, useState } from "react";

interface IProps {
  value: string;
  delay: number;
}

export const useDebounce = ({ value, delay }: IProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);
  return debouncedValue;
};
