import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AdminContextProvider } from "./context/AdminContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </Router>
  </React.StrictMode>
);
