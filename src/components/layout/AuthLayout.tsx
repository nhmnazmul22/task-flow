import {Outlet} from "react-router";
import AuthVisual from "@/components/auth/AuthVisual";

const AuthLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <AuthVisual/>
            <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-md">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
