import { useState } from "react";
import { Link } from "react-router-dom";
//Hooks
import { useAdminContext } from "../hooks/useAdminContext";
import { useLogout } from "../hooks/useLogout";
//Icons
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const NavBar = () => {
  const { state } = useAdminContext();
  console.log("Initial State in the Nav Component", state);

  const { logout } = useLogout();

  const handleLogout = (): void => {
    handleNav();
    logout();
  };

  const [nav, setNav] = useState<boolean>(true);

  const handleNav = () => {
    setNav((prevNav) => !prevNav);
  };

  return (
    <header className="bg-[#0d0508] flex w-full justify-between items-center mx-auto py-4 px-4 border-b-2 border-[#102C57] text-white max-h-[74px]">
      {!state.user ? (
        <div className="w-full text-3xl md:text-5xl text-center font-bold  uppercase text-white">
          TOMEI Car Rental
        </div>
      ) : (
        <nav className="w-full flex justify-between">
          <div className="text-3xl font-bold text-white px-2 text-nowrap">
            <Link to={"/"}>TOMEI</Link>
          </div>
          <div className="w-full hidden md:flex justify-between px-2">
            <div className="flex p-2 gap-4 w-full flex-wrap">
              <div className="flex grow gap-4">
                <p className="flex justify-center items-center text-white">
                  <FaPhone /> +63 955 309 4543
                </p>
                <p className="flex justify-center items-center text-white">
                  <MdEmail /> tomeirentalcar@gmail.com
                </p>
              </div>
              <p className="flex justify-center items-center text-white">
                <FaLocationDot />
                Dasmarinas, Cavite
              </p>
            </div>
          </div>
          {/* Burger Menu Button for Mobile */}
          {nav ? (
            <div
              onClick={() => handleNav()}
              className="block p-2 text-center md:hidden bg-white rounded-md"
            >
              <AiOutlineMenu size={20} />
            </div>
          ) : null}
          {/* Menu for Mobile */}
          <div
            className={
              !nav
                ? " z-50 fixed top-0 left-0 w-full sm:w-[300px] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
                : " z-50 fixed left-[-100%]"
            }
          >
            <div
              onClick={() => handleNav()}
              className="absolute top-0 right-0 lg:hidden p-2"
            >
              <AiOutlineClose size={20} />
            </div>
            <h1 className="w-full text-3xl font-bold text-gray-800  m-4">
              TOMEI
            </h1>
            <div className="mb-4 rounded-md shadow-lg p-4">
              <div className="flex items-center mb-2">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Head Admin"
                  className="w-12 h-12 border-2 border-black mr-2 rounded-full"
                />
                <p>
                  Admin {`${state.user?.firstName} ${state.user?.lastName}`}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-md shadow-lg p-2">
              <Link
                onClick={() => handleNav()}
                to={"/"}
                className="hover:border-2 rounded-md mb-2 p-2 text-center border-b-2 border-gray-200"
              >
                Dashboard
              </Link>
              <div className="flex flex-col space-y-2">
                <Link
                  onClick={() => handleNav()}
                  to={"/rent-records"}
                  className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200"
                >
                  Rental Records
                </Link>
                {state.user.role === "super_admin" && (
                  <Link
                    onClick={() => handleNav()}
                    to={"/control"}
                    className="w-full block mb-2 hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2 border-gray-200"
                  >
                    Control Management
                  </Link>
                )}
                {/* <Link
                  onClick={() => handleNav()}
                  to={"/inventory"}
                  className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200"
                >
                  Inventory
                </Link>
                <Link
                  onClick={() => handleNav()}
                  to={"/schedule"}
                  className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2 border-gray-200"
                >
                  Schedule
                </Link>
                <Link
                  onClick={() => handleNav()}
                  to={"/appointment"}
                  className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2 border-gray-200"
                >
                  Appointment
                </Link> */}
                <button className="mt-2 hover:border-2" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
              {/* <SettingsModal show={showModal} onClose={toggleModal} /> */}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
