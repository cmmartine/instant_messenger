import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);