import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Layoute/Root";
import Register from "./SignUp/Register";
import Login from "./SignIn/Login";
import Banner from "./Home/Banner";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import AboutUs from "./AboutUs/AboutUs";
import MyDashboard from "./Dashboard/MyDashboard";
import DashboardLayoute from './Layoute/DashboardLayoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path:"/dashboard",
    element: <DashboardLayoute></DashboardLayoute>,
    children:[
      {
        path:"/dashboard",
        element:<MyDashboard></MyDashboard>,
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
  </React.StrictMode>
);
