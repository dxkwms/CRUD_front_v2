export const isElementAtBottomOfPage = (): boolean => {
  return (
    document.documentElement.scrollHeight -
      (document.documentElement.scrollTop + window.innerHeight) <
    100
  );
};
