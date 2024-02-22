import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailPage } from "./pages/DetailPage/DetailPage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound/>
  },
  {
    path: "/details/:taskId",
    element: <DetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className={"container"}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
