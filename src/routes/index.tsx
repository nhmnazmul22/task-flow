import { createBrowserRouter } from "react-router";
import App from "@/App.tsx";
import Login from "@/pages/Auth/Login.tsx";
import withAuth from "@/hoc/withAuth.tsx";
import AuthLayout from "@/components/layout/AuthLayout";
import Signup from "@/pages/Auth/Signup.tsx";
import Home from "@/pages/Home/Home";
import AdminLayout from "@/components/layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
    ],
  },
  {
    Component: withAuth(AdminLayout),
    children: [
      {
        path: "/admin",
        Component: App,
      },
    ],
  },
]);

export default router;
