import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/signIn");
  };

  return (
    <button
      onClick={onLogout}
      className=" text-white font-light rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
    >
      Log Out
    </button>
  );
};
