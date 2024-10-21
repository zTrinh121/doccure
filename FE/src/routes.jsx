//Splitting router into separate file
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

// import ProductPage from "./pages/ProductPage.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
export default router;
