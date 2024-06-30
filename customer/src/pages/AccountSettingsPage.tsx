import { FormEvent, useState } from "react";
import { API_URL } from "../hooks/config";
import { useCustomerContext } from "../hooks/useCustomerContext";

const AccountSettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState("");

  const { state } = useCustomerContext();
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const token = state.user?.token;
      const response = await fetch(
        `${API_URL}/client/change-password/${state.user?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to change password");
      }
  
      setMessage("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");
    } catch (error) {
      // setError(error.message || "Failed to change password");
    }
  };

  return (
    <div className="bg-white w-full flex flex-col grow sm:flex-row p-4 rounded-md relative">
      <div className="sm:w-4/5 flex flex-col w-full text-left justify-start p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Account Settings
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <div className="flex flex-col space-y-2">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
