import {createBrowserRouter} from "react-router";
import App from "@/App.tsx";
import Login from "@/pages/Auth/Login.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/login",
        Component: Login,
    },
]);

export default router;