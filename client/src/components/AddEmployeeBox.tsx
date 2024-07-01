import React, { FormEvent, useState } from "react";
//Hooks
import { useAddEmployee } from "../hooks/useAddEmployee";
//Context
import { AdminType } from "../Types/AdminContextTypes copy";

type AddEmployeeProps = {
  toggleAdd: boolean;
  setToggleAdd: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | undefined;
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
  updateToggle: boolean;
  setUpdateToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddEmployeeBox = ({
  setToggleAdd,
  setAdmins,
  updateToggle,
  setUpdateToggle,
}: AddEmployeeProps) => {
  const [newAdmin, setNewAdmin] = useState<AdminType>({
    username: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const { addEmployee } = useAddEmployee();

  const handleAddItemSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addEmployee(newAdmin, setAdmins);
    setUpdateToggle(!updateToggle);
    setToggleAdd(false);
  };

  return (
    <>
      {newAdmin && (
        <div className="z-50 absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-sm">
            <form onSubmit={handleAddItemSubmit}>
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
                  value={newAdmin.username}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, username: e.target.value })
                  }
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
                    value={newAdmin.firstName}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, firstName: e.target.value })
                    }
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
                    value={newAdmin.lastName}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, lastName: e.target.value })
                    }
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
                  value={newAdmin.contactNumber}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      contactNumber: e.target.value,
                    })
                  }
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
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, role: e.target.value })
                  }
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
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  ADD
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setToggleAdd(false)}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployeeBox;
