import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import Login from "@/pages/Auth/Login.tsx";
import RootLayout from "@/pages/Layout/RootLayout.tsx";
import withAuth from "@/hoc/withAuth.tsx";
import AuthLayout from "@/pages/Layout/AuthLayout.tsx";
import Signup from "@/pages/Auth/Signup.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
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
        ]
    },
    {
        Component: withAuth(RootLayout),
        children: [
            {
                path: '/admin',
                Component: App
            }
        ]
    }
]);

export default router;