import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
