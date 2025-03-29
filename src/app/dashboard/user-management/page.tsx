import React from "react";
import UserManagementTable from "./_components/user-management-table";

function page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <UserManagementTable />
    </div>
  );
}

export default page;
