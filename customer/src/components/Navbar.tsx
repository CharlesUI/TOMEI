import React from "react";
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCustomerContext } from "../hooks/useCustomerContext";
import { useLogout } from "../hooks/useLogout";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
import Modal from "./Modal";

type NavBarProps = {
  setShowSignIn: React.Dispatch<React.SetStateAction<Boolean>>;
  setShowSignUp: React.Dispatch<React.SetStateAction<Boolean>>;
};

const NavBar = ({ setShowSignIn, setShowSignUp }: NavBarProps) => {
  const { state } = useCustomerContext();

  const { logout } = useLogout();

  const handleLogout = (): void => {
    handleNav();
    logout();
  };

  const location = useLocation();
  const { pathname } = location;

  const [nav, setNav] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [buttonWidth, setButtonWidth] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleNav = () => {
    setNav((prevNav) => !prevNav);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleModalOpen = () => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <header
      className={`bg-[#0d0508] sticky top-0 z-50 border-[#102C57] text-white flex w-full justify-between items-center mx-auto py-3 ${
        pathname === "/" ? "bg-[#171717]" : ""
      }`}
    >
      <nav className="w-full flex justify-between items-center">
        <div className="flex gap-2 text-3xl font-bold px-2 text-nowrap">
          <div className="text-3xl font-bold text-white px-2 text-nowrap">
            <Link to={"/"}>TOMEI</Link>
          </div>
        </div>
        <div className="w-full hidden min-[900px]:flex justify-between px-2">
          <div className="w-full flex px-2 gap-14 justify-start items-center font-bold">
            <Link
              to="/"
              className={`relative py-1 px-2 ${
                pathname === "/" ? "text-white" : "text-current"
              } ease-in-out duration-300 group`}
            >
              Home
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#102C57] transition-all duration-300 group-hover:w-full ${
                  pathname === "/" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            <Link
              to="/about"
              className={`relative py-1 px-2 ${
                pathname === "/about" ? "text-white" : "text-current"
              } ease-in-out duration-300 group`}
            >
              About Us
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#102C57] transition-all duration-300 group-hover:w-full ${
                  pathname === "/about" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            <Link
              to="/blog"
              className={`relative py-1 px-2 ${
                pathname === "/blog" ? "text-white" : "text-current"
              } ease-in-out duration-300 group`}
            >
              Blog
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#102C57] transition-all duration-300 group-hover:w-full ${
                  pathname === "/blog" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            <Link
              to="/contact"
              className={`relative py-1 px-2 ${
                pathname === "/contact" ? "text-white" : "text-current"
              } ease-in-out duration-300 group`}
            >
              Contact Us
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#102C57] transition-all duration-300 group-hover:w-full ${
                  pathname === "/contact" ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
            {state.user ? (
              <Link
                to="/rental"
                className={`relative py-1 px-2 ${
                  pathname === "/rental" ? "text-white" : "text-current"
                } ease-in-out duration-300 group`}
              >
                Rental
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#102C57] transition-all duration-300 group-hover:w-full ${
                    pathname === "/rental" ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
            ) : null}
          </div>
          <div className="min-w-36 flex text-sm border-2 border-[#102C57] rounded-md">
            {!state.user ? (
              <>
                <button
                  className="w-full relative py-1 px-2 border-r-[1.5px] border-[#102C57] rounded-md"
                  onClick={() => handleSignInClick()}
                >
                  Sign In
                </button>
                <button
                  className="w-full relative py-1 px-2 group rounded-md"
                  onClick={() => handleSignUpClick()}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative w-full">
                <button
                  ref={buttonRef}
                  className="w-full relative py-1 px-2 border-[#102C57] group"
                  onClick={handleModalOpen}
                >
                  {state.user.email}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#102C57] transition-all duration-300 group-hover:w-full"></span>
                </button>
                {modalOpen && (
                  <Modal
                    isOpen={modalOpen}
                    onClose={handleModalClose}
                    buttonRef={buttonRef}
                    width={buttonWidth}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {nav ? (
          <div
            onClick={() => handleNav()}
            className="block p-2 text-center min-[900px]:hidden"
          >
            <AiOutlineMenu size={20} />
          </div>
        ) : null}
        <div
          className={
            !nav
              ? "bg-white z-50 fixed top-0 left-0 w-full sm:w-[300px] h-full border-r border-r-gray-900 ease-in-out duration-500 text-gray-800"
              : " z-50 fixed left-[-100%]"
          }
        >
          <div
            onClick={() => handleNav()}
            className="absolute top-0 right-0 md:hidden p-2"
          >
            <AiOutlineClose size={20} />
          </div>
          <h1 className="w-full text-3xl font-bold m-4">TOMEI</h1>
          <ul className="uppercase p-4">
            <li className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200">
              <Link to={"/"} onClick={() => handleNav()}>
                Home
              </Link>
            </li>
            <li className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200">
              <Link to={"/about"} onClick={() => handleNav()}>
                About Us
              </Link>
            </li>
            <li className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200">
              <Link to={"/blog"} onClick={() => handleNav()}>
                Blog
              </Link>
            </li>
            <li className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200">
              <Link to={"/contact"} onClick={() => handleNav()}>
                Contact
              </Link>
            </li>
            {state.user ? (
              <li className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200">
                <Link to={"/rental"} onClick={() => handleNav()}>
                  Rental
                </Link>
              </li>
            ) : null}
            <li className="ml-2 hover:border-2 flex items-center justify-center text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200">
              {state.user ? (
                <button
                  onClick={handleLogout}
                  className="flex p-4 justify-center items-center gap-2 text-nowrap shadow-white"
                >
                  LOG OUT <SlLogout />
                </button>
              ) : (
                <>
                  <button
                    className="w-full p-4 items-center gap-2 text-nowrap shadow-md"
                    onClick={() => handleSignInClick()}
                  >
                    Sign In
                  </button>
                  <button
                    className="w-full p-4 items-center gap-2 text-nowrap shadow-md"
                    onClick={() => handleSignUpClick()}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
