import React, { FormEvent, useState } from "react";
// Types
import { CustomerItemContext, CustomerTypeBody } from "../Types/CustomerTypes";
// Hooks
import { useRegister } from "../hooks/useRegister";

type SignType = {
  setShowSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
  setShowSignUp: React.Dispatch<React.SetStateAction<Boolean>>;
};

const SignUpBox = ({ setShowSignIn, setShowSignUp }: SignType) => {
  const [newCustomer, setNewCustomer] = useState<CustomerTypeBody>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    contact: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { registerCustomer } = useRegister();

  const handleCustomerRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newCustomer.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await registerCustomer(newCustomer);
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full">
      <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
      <form onSubmit={handleCustomerRegistration}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              value={newCustomer.lastName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, lastName: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              value={newCustomer.firstName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, firstName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
            <input
              type="date"
              name="appointmentDate"
              value={newCustomer.birthDate}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, birthDate: e.target.value })
              }
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contact"
              name="contact"
              type="text"
              placeholder="Contact"
              required
              value={newCustomer.contact}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, contact: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            value={newCustomer.password}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, password: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-[#0d0508] hover:bg-[#0d0508] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpBox;
