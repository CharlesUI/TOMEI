import React, { ChangeEvent, FormEvent, useState } from "react";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { AdminType } from "../Types/AdminContextTypes copy";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";

type EditAdminPropsTypes = {
  toggleEdit: boolean;
  setToggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  admins: AdminType[];
  admin: AdminType;
  _id: string | undefined;
  token: string | undefined;
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
  setUpdateToggle: React.Dispatch<React.SetStateAction<boolean>>;
  updateToggle: boolean;
  renderedForm: ReactNode;
  setRenderedForm: Dispatch<SetStateAction<ReactNode>>;
};

const EditEmployeeBox = ({
  setToggleEdit,
  admins,
  admin,
  _id,
  token,
  setAdmins,
  setUpdateToggle,
  updateToggle,
}: EditAdminPropsTypes) => {
  const [adminToEdit, setAdminToEdit] = useState<AdminType>({
    username: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const { updateEmployee } = useUpdateEmployee();

  // Function to populate adminToEdit state with the selected admin's data
  const updateAdminToEdit = (admins: AdminType[], id: string | undefined) => {
    admins.forEach((admin: AdminType) => {
      if (admin._id === id) {
        setAdminToEdit({
          username: admin.username,
          firstName: admin.firstName,
          lastName: admin.lastName,
          contactNumber: admin.contactNumber,
          email: admin.email,
          password: "", // Ensure password field remains empty for security reasons
          role: admin.role,
        });
      }
    });
  };

  // Populate adminToEdit when component mounts
  useState(() => {
    if (admin) {
      updateAdminToEdit(admins, admin._id);
    } else {
      setToggleEdit(false);
    }
  });

  // Handle form input changes
  const toggleOnChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setAdminToEdit((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  // Handle form submission
  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateEmployee(_id, token, setAdmins, adminToEdit);
    setUpdateToggle(!updateToggle);
    setToggleEdit(false);
  };

  return (
    <>
      {adminToEdit && (
        <div className="z-50  absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-sm"
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Username"
                name="username"
                value={adminToEdit.username}
                onChange={(e) => toggleOnChange(e)}
                required
              />
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={adminToEdit.firstName}
                  onChange={(e) => toggleOnChange(e)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={adminToEdit.lastName}
                  onChange={(e) => toggleOnChange(e)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contact Number
              </label>
              <input
                id="contactNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Contact Number"
                name="contactNumber"
                value={adminToEdit.contactNumber}
                onChange={(e) => toggleOnChange(e)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                name="email"
                value={adminToEdit.email}
                onChange={(e) => toggleOnChange(e)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={adminToEdit.role}
                onChange={(e) => toggleOnChange(e)}
                required
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                name="password"
                value={adminToEdit.password}
                onChange={(e) => toggleOnChange(e)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                UPDATE
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setToggleEdit(false)}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditEmployeeBox;
