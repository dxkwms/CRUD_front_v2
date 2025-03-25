import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

interface Props {
  ref: RefObject<null | HTMLDivElement>;
  setIsListOpen: Dispatch<SetStateAction<boolean>>;
}

export const useOutsideDetect = ({ ref, setIsListOpen }: Props): void => {
  useEffect(() => {
    function isClickOutside(e): void {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsListOpen(false);
      }
    }
    document.addEventListener("mousedown", isClickOutside);
    return () => {
      document.removeEventListener("mousedown", isClickOutside);
    };
  }, [ref, setIsListOpen]);
};
