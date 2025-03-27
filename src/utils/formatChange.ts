export const formatChange = (changes: object) => {
  return Object.entries(changes)
    .map(([key, value]) => {
      if (key === "avatar") {
        return `Avatar changed`;
      }
      return `${key}: ${value}`;
    })
    .join(", ");
};
