import { AllUsers } from "@/components/admin/profile/AllUsers";

export const AdminPage = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4"> Users</h2>
      <AllUsers />;
    </>
  );
};

export default AdminPage;
