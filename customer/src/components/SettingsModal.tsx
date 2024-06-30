import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export type SettingsModalProps = {
  show: boolean;
  onClose: () => void;
};

const SettingsModal = ({ show, onClose }: SettingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-2 rounded relative">
        <h2 className="border-b-2 border-gray-600 p-2">Settings</h2>
        <button onClick={onClose} className="absolute top-0 right-0 m-2">
          X
        </button>
        <div className="mt-4">
          <Link
            onClick={onClose}
            to={"/account"}
            className="w-full block hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2 border-gray-200"
          >
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
