import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import Login from "@/pages/Auth/Login.tsx";
import RootLayout from "@/pages/Layout/RootLayout.tsx";
import withAuth from "@/hoc/withAuth.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/login",
        Component: Login,
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