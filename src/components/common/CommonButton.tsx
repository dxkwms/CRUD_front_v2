interface Props {
    buttonText: string;
    fn: () => void
}

export const Button = ({buttonText, fn}: Props) => {
    
    return (
      <button
        type="submit"
        disabled={fn}
        className="w-1/3 py-2 bg-buttonColor text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 self-center"
      >
        {Submit}
      </button>
    );
}