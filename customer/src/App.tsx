import { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//Components
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import SignInBox from "./components/SignInBox";
import SignUpBox from "./components/SignUpBox";
//Pages
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
//Context
import { useCustomerContext } from "./hooks/useCustomerContext";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import BlogPage from "./pages/BlogPage";
import RentalPage from "./pages/RentalPage";
import RentHistoryPage from "./pages/RentHistoryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const { state } = useCustomerContext();


  const [showSignIn, setShowSignIn] = useState<Boolean>(false);
  const [showSignUp, setShowSignUp] = useState<Boolean>(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      showSignIn &&
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setShowSignIn(!showSignIn);
    }
    if (
      showSignUp &&
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setShowSignUp(!showSignUp);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignIn, showSignUp]);

  return (
    <div className="h-screen flex flex-col justify-start relative">
      <NavBar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
      {showSignIn && (
        <div
          ref={signInRef}
          className="absolute inset-x-0 mt-20 z-50 w-[90%] max-w-[450px] sm:w-[420px] flex flex-col m-auto bg-white border-2 border-gray-400 rounded-lg"
        >
          <SignInBox
            setShowSignIn={setShowSignIn}
            setShowSignUp={setShowSignUp}
          />
        </div>
      )}
      {showSignUp && (
        <div
          ref={signUpRef}
          className="absolute inset-x-0 mt-20 z-50 w-[90%] max-w-[450px] sm:w-[420px] flex flex-col m-auto bg-white border-2 border-gray-400 rounded-lg"
        >
          <SignUpBox
            setShowSignIn={setShowSignIn}
            setShowSignUp={setShowSignUp}
          />
        </div>
      )}
      <div
        className={`bg-[#0d0508] w-full flex flex-col flex-1 justify-start overflow-y-auto overflow-x-hidden text-black`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/rental"
            element={state.user ? <RentalPage /> : <Navigate to="/" />}
          />
          <Route
            path="/my-rental"
            element={state.user ? <RentHistoryPage /> : <Navigate to="/" />}
          />
          <Route
            path="/account"
            element={state.user ? <AccountSettingsPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      {pathname === "/" ? null : <Footer />}
    </div>
  );
}

export default App;
