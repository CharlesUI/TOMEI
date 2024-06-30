import React, { useState, ChangeEvent, FormEvent } from "react";
//Hooks
import { useLogin } from "../hooks/useLogin";
//Types
import { FormCustomerType } from "../Types/CustomerTypes";
//ReactPackages
import { BarLoader } from "react-spinners";

type SignType = {
  setShowSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
  setShowSignUp: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SignInBox = ({setShowSignIn, setShowSignUp}: SignType) => {
  const { login, isLoading, error } = useLogin();

  const [formData, setFormData] = useState<FormCustomerType>({
    email: "",
    password: "",
  });

  console.log(formData)
  const toggleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log("toggleing formdate", name, value)
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(formData);
    setShowSignIn(false)
    setShowSignUp(false)
    console.log("form submitted", formData);
  };

  if (isLoading) {
    return <BarLoader className="m-auto" color="#36d7b7" />;
  }
  return (
    <div className="bg-white p-8 rounded shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
            required={true}
            value={formData.email}
            onChange={(e) => toggleInput(e)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required={true}
            value={formData.password}
            onChange={(e) => toggleInput(e)}
          />
        </div>
        {error ? <p className="w-full text-center text-red p-2">{error}</p> : null }
        <div className="flex items-center justify-between">
          <button
            className="bg-[#0d0508] hover:bg-[#2d8065] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-[#0d0508] hover:text-[#0d0508]"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignInBox;
