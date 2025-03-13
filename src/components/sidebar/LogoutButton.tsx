import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/slice/authSlice";
import { Typography } from "@/components/common/Typography";

export const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <button
      onClick={onLogout}
      className="w-1/5 text-white font-light rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 mb-5 ml-5"
    >
      <Typography variant={"h6"} className="text-amber-50 font-bold">
        Log Out
      </Typography>
    </button>
  );
};
