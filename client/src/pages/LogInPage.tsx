import { ChangeEvent, FormEvent, useState } from "react";
//Context
import { FormDataType } from "../Types/AdminContextTypes";
//Hooks
import { useLogin } from "../hooks/useLogin";
//ReactPackages
import { BarLoader } from "react-spinners";

const LogInPage = () => {
  const { login, isLoading, error } = useLogin()

  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: ""
  })

  const toggleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(formData)
  }

  if(isLoading) {
    return <BarLoader className="m-auto" color="#36d7b7" />
  }

  return (
    <div className="w-[95%] sm:w-[420px] flex flex-col bg-white m-auto shadow-md shadow-slate-600 rounded-md">
      <div className="w-full text-3xl font-bold text-gray-600 text-center p-4">ADMIN</div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-around items-center p-4 gap-5">
        <input
          className="w-full p-4 border-2 border-gray-600 rounded-lg text-black  focus:outline-none"
          type="text"
          placeholder="admin"
          name="username"
          value={formData.username}
          onChange={(event) => toggleInput(event)}
        />
        <input
          className="w-full p-4 border-2 border-gray-600 rounded-lg text-black  focus:outline-none"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={(event) => toggleInput(event)}
        />
        <button
        className="w-full bg-[#102C57] text-white rounded-xl mx-auto p-4 font-bold hover:bg-gray-700"
        disabled={isLoading}
        >
          Log In
        </button>
        {error ? <div className="text-red-600">{error}</div> : null}
      </form>
    </div>
  );
};

export default LogInPage;
