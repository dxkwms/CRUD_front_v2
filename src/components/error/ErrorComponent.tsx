export const ErrorComponent = ({ errorValue }: { errorValue: string }) => {
  return <div className="text-red-500 text-center mt-4">{errorValue}</div>;
};
