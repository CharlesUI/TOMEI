import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { CustomerContextProvider } from "./context/CustomerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CustomerContextProvider>
        <App />
      </CustomerContextProvider>
    </Router>
  </React.StrictMode>
);
