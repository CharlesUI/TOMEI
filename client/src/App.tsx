import { Routes, Route, Navigate } from "react-router-dom";
//Components
import NavBar from "./components/NavBar";
//Pages
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
//Hooks
import { useAdminContext } from "./hooks/useAdminContext";
import DashBoardMenu from "./components/DashBoardMenu";
import ControlPage from "./pages/ControlPage";
import RentalRecordPage from "./pages/RentalRecordPage";

const App = () => {
  const { state } = useAdminContext();

  console.log("Initial State in The App Component", state);

  return (
    <div className="h-screen flex flex-col justify-start relative bg-[#0d0508]">
      <NavBar />
      {state.user ? <DashBoardMenu /> : null}
      <div
        className={`w-full flex flex-col flex-1 justify-start overflow-y-auto overflow-x-hidden text-white ${
          state.user ? "pt-8 pb-4 px-0 md:pl-[310px] md:pr-8" : ""
        } `}
      >
        <Routes>
          <Route
            path="/"
            element={state.user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!state.user ? <LogInPage /> : <Navigate to="/" />}
          />
          <Route
            path="/control"
            element={state.user ? <ControlPage /> : <Navigate to="/" />}
          />
          <Route
            path="/rent-records"
            element={state.user ? <RentalRecordPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
