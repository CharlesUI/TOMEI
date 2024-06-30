import React, { useState, useEffect, ReactNode } from "react";
import { BarLoader } from "react-spinners";
import { IoIosPersonAdd } from "react-icons/io";
import AdminGrid from "../components/AdminGrid";
import AddEmployeeBox from "../components/AddEmployeeBox";
import { useAdminContext } from "../hooks/useAdminContext";
import { useFetchAdmins } from "../hooks/useFetchAdmins";
import { AdminType } from "../Types/AdminContextTypes copy";

const ControlPage: React.FC = () => {
  const { state } = useAdminContext();
  const { fetchAdmins, error, isLoading } = useFetchAdmins();
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [renderedForm, setRenderedForm] = useState<ReactNode>(null);
  const [renderedFormAddEmployee, setRenderedFormAddEmployee] =
    useState<ReactNode>(null);

  useEffect(() => {
    if (state.user?.token && state.user.role === "super_admin") {
      fetchAdmins(state.user.token, setAdmins);
    }
  }, [state.user?.token, updateToggle]);

  const handleAddEmployeeToggle = () => {
    setToggleAdd(!toggleAdd);
    setRenderedFormAddEmployee(() => (
      <AddEmployeeBox
        toggleAdd={toggleAdd}
        setToggleAdd={setToggleAdd}
        token={state.user?.token}
        setAdmins={setAdmins}
        updateToggle={updateToggle}
        setUpdateToggle={setUpdateToggle}
      />
    ));
  };

  if (isLoading) {
    return <BarLoader className="m-auto" color="#36d7b7" />;
  }

  return (
    <div className="w-full min-h-full flex bg-white rounded-md">
      <div className="w-full rounded-md shadow-lg p-4 overflow-y-scroll">
        {state.user?.role === "super_admin" && (
          <div className="w-full">
            <div className="py-2 border-b-2 border-[#102C57] flex items-center">
              <button
                onClick={handleAddEmployeeToggle}
                className="ml-5 text-black hover:border-[#0d0508] border-2 rounded-md py-2 px-4 flex items-center gap-2"
              >
                <IoIosPersonAdd className="text-xl" />
                <span className="font-bold ">Add Employee</span>
              </button>
            </div>
            {toggleEdit && renderedForm}
            {toggleAdd && renderedFormAddEmployee}
            <AdminGrid
              admins={admins}
              error={error}
              isLoading={isLoading}
              token={state.user?.token}
              setAdmins={setAdmins}
              updateToggle={updateToggle}
              setUpdateToggle={setUpdateToggle}
              toggleEdit={toggleEdit}
              setToggleEdit={setToggleEdit}
              renderedForm={renderedForm}
              setRenderedForm={setRenderedForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPage;
