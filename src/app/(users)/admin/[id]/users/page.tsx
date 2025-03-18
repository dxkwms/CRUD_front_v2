import { AllUsers } from "@/components/admin/profile/AllUsers";
import { Typography } from "@/components/common/Typography";

export const AdminPage = () => {
  return (
    <div className={"flex flex-col ml-2"}>
      <Typography variant={"h2"} className={"font-bold self-center"}>
        Users
      </Typography>
      <AllUsers />;
    </div>
  );
};

export default AdminPage;
