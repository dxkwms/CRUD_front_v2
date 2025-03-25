import { useEffect } from "react";

export const useScrollListener = (
  scrollHandler: (event: Event) => void,
): void => {
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);
};
