import { Link } from "react-router-dom";
import { useAdminContext } from "../hooks/useAdminContext";
import { useLogout } from "../hooks/useLogout";
const DashBoardMenu = () => {
  const { state } = useAdminContext();
  console.log("Initial State in the Nav Component", state);

  const { logout } = useLogout();

  const handleLogout = (): void => {
    logout();
  };

  return (
    <div className="basis-1/5 min-w-[200px] min-h-[460px] p-2 text-black rounded-md bg-white  hidden md:block absolute top-[106px] left-8">
      <div className="mb-1 rounded-md shadow-lg p-2 bg-white">
        <div className="flex items-center mb-2">
          <img
            src="https://via.placeholder.com/50"
            alt="Head Admin"
            className="w-12 h-12 border-2 border-black mr-2 rounded-full"
          />
          <p>Admin {`${state.user?.firstName} ${state.user?.lastName}`}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-md shadow-lg p-2 bg-white">
        <Link
          to={"/"}
          className="mb-2 p-2 text-center border-b-2 border-gray-200"
        >
          Dashboard
        </Link>
        <div className="flex flex-col space-y-2">
          <Link
            to={"/rent-records"}
            className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200"
          >
            Rental Records
          </Link>
          {state.user?.role === "super_admin" && (
            <Link
              to={"/control"}
              className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200"
            >
              Control Management
            </Link>
          )}
          <button
            className="hover:border-2 text-center border-b-2 rounded-md shadow-lg p-2  border-gray-200"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardMenu;
