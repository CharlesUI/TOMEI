import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { useLogout } from "../hooks/useLogout";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  width: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, buttonRef, width }) => {
  const { logout } = useLogout();

  const handleLogout = (): void => {
    logout();
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        event.target instanceof Element &&
        !event.target.closest(".modal-content")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="text-black absolute top-[100%] right-0 modal-overlay flex items-center justify-center bg-black bg-opacity-50 rounded-md">
      <div
        className="modal-content bg-white p-2 shadow-lg rounded-md"
        style={{ width }}
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          <IoIosClose />
        </button>
        <ul className="flex flex-col gap-2 p-2">
          <li className="w-full flex border-b-2 border-[#0d0508]">
            <Link className="w-full text-center font-bold p-2" to="/account"  onClick={onClose}>
              Account
            </Link>
          </li>
          <li className="w-full flex border-b-2 border-[#0d0508]">
            <Link className="w-full text-center font-bold p-2" to="/my-rental"  onClick={onClose}>
              My Rent
            </Link>
          </li>
          <li className="w-full flex border-b-2 border-[#0d0508]">
            <Link className="w-full text-center font-bold p-2" to={'/'} onClick={handleLogout}>Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
