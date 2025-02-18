interface Props {
  buttonText: string;
  isDisabled: boolean;
}

export const CommonButton = ({ buttonText, isDisabled }: Props) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="w-1/2 py-2 bg-buttonColor text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 mx-auto block"
    >
      {buttonText}
    </button>
  );
};
