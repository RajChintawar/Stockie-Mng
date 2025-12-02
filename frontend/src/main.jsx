import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { PortfolioProvider } from "./context/PortfolioContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);
