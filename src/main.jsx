import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import DeveloperContext from "./context/DeveloperContext.jsx";
import AdminContext from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminContext>
      <DeveloperContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DeveloperContext>
    </AdminContext>
  </StrictMode>
);
