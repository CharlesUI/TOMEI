import React, { useState, Dispatch, SetStateAction, ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { BiDotsVertical } from "react-icons/bi";
import { AdminType } from "../Types/AdminContextTypes copy";
import { useDeleteAdmin } from "../hooks/useDeleteAdmin";
import EditEmployeeBox from "./EditEmployeeBox";

interface AdminItemProps {
  admin: AdminType;
  admins: AdminType[];
  token: string | undefined;
  setAdmins: Dispatch<SetStateAction<AdminType[]>>;
  updateToggle: boolean;
  setUpdateToggle: Dispatch<SetStateAction<boolean>>;
  toggleEdit: boolean;
  setToggleEdit: Dispatch<SetStateAction<boolean>>;
  renderedForm: ReactNode;
  setRenderedForm: Dispatch<SetStateAction<ReactNode>>;
}

const AdminItem: React.FC<AdminItemProps> = ({
  admin,
  admins,
  token,
  setAdmins,
  updateToggle,
  setUpdateToggle,
  toggleEdit,
  setToggleEdit,
  renderedForm,
  setRenderedForm,
}) => {
  const { deleteAdmin } = useDeleteAdmin();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex items-center border-b-2 border-[#102C57] py-2">
      <div className="w-1/4">
        <img
          className="w-full rounded-md"
          src="../public/images/blank-profile-picture-973460_1280.png"
          alt=""
        />
      </div>
      <div className="flex flex-col ml-4">
        <p className="font-bold text-lg mb-1">{`${admin.firstName} ${admin.lastName}`}</p>
        <p className="text-sm text-gray-700">{admin.email}</p>
        <p className="text-sm text-gray-700">{admin.role}</p>
        <p className="text-sm text-gray-700">{admin.contactNumber}</p>
      </div>
      <div className="ml-auto relative">
        <button
          onClick={toggleVisibility}
          className="text-[#102C57] hover:text-black"
        >
          {!isVisible ? <BiDotsVertical /> : <IoClose />}
        </button>
        {isVisible && (
          <div className="absolute right-0 top-10 bg-white border border-[#102C57] rounded-md p-2 flex gap-2">
            <button
              onClick={async () => {
                const _id = admin._id;
                await deleteAdmin(_id, token, setAdmins);
                setUpdateToggle(!updateToggle);
              }}
              title="Delete Item"
              className="p-1 bg-red-400 text-white rounded-sm"
            >
              <MdDeleteForever />
            </button>
            <button
              onClick={() => {
                const _id = admin._id;
                setToggleEdit(true);
                setRenderedForm(
                  <EditEmployeeBox
                    toggleEdit={toggleEdit}
                    setToggleEdit={setToggleEdit}
                    admin={admin}
                    admins={admins}
                    _id={_id}
                    token={token}
                    setAdmins={setAdmins}
                    setUpdateToggle={setUpdateToggle}
                    updateToggle={updateToggle}
                    renderedForm={renderedForm}
                    setRenderedForm={setRenderedForm}
                  />
                );
              }}
              title="Update Item"
              className="p-1 bg-blue-400 text-white rounded-sm"
            >
              <GrDocumentUpdate />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminItem;
