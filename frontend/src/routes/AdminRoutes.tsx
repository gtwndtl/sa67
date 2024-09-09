import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";

// Lazy load the components
const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const Dashboard = Loadable(lazy(() => import("../pages/home")));
const Vehiclemanage = Loadable(lazy(() => import("../pages/vehiclemanage")));
const ProfilePage = Loadable(lazy(() => import("../pages/profile")));
const CreateCar = Loadable(lazy(() => import("../pages/vehiclemanage/create")));
const CarEdit = Loadable(lazy(() => import("../pages/vehiclemanage/edit")));

const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/vehiclemanage",
        children: [
          {
            path: "",
            element: <Vehiclemanage />,
          },
          {
            path: "create",
            element: <CreateCar />,
          },
          {
            path: "edit/:id",
            element: <CarEdit />,
          },
        ],
      },
      {
        path: "/profile",
        element: <ProfilePage />, // Make sure this route is included
      },
    ],
  };
};


export default AdminRoutes;
