import React, { ReactNode } from "react";
//Context
import { AdminType } from "../Types/AdminContextTypes copy";
//Components
import AdminItem from "./AdminItem";

type AdminGridTypes = {
  admins: AdminType[];
  error: string | null;
  isLoading: boolean;
  token: string | undefined;
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
  updateToggle: boolean;
  setUpdateToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEdit: boolean;
  setToggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  renderedForm: ReactNode
  setRenderedForm: React.Dispatch<React.SetStateAction<React.ReactNode>>
};

const AdminGrid = ({
  admins,
  error,
  isLoading,
  token,
  setAdmins,
  updateToggle,
  setUpdateToggle,
  toggleEdit,
  setToggleEdit,
  renderedForm,
  setRenderedForm
}: AdminGridTypes) => {
  // Ensure admins is an array
  // const validAdmins = Array.isArray(admins) ? admins : [];

  console.log("valid  asdas", admins)
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 px-5 sm:px-20 my-2 py-2 gap-2 text-sm md:text-base">
      {Array.isArray(admins) && admins.map((admin) => {
        return (
          admin.role !== "super_admin" && (
            <AdminItem
              key={admin._id}
              admin={admin}
              admins={admins}
              setAdmins={setAdmins}
              token={token}
              updateToggle={updateToggle}
              setUpdateToggle={setUpdateToggle}
              toggleEdit={toggleEdit}
              setToggleEdit={setToggleEdit}
              renderedForm={renderedForm}
              setRenderedForm={setRenderedForm}
            />
          )
        );
      })}
    </div>
  );
};

export default AdminGrid;
