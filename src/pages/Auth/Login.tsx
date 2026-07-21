import {useState} from "react";
import {Link} from "react-router";
import Button from "@/components/ui/Button.tsx";
import Input from "@/components/ui/Input.tsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="auth-slide-up">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
                <p className="text-gray-500 text-sm">
                    Sign in to continue to TaskFlow
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-1"
            >
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                        Forgot password?
                    </a>
                </div>

                <Button variant="primary" fullWidth type="submit">
                    Sign in
                </Button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
                >
                    Create one free
                </Link>
            </p>
        </div>
    );
};

export default Login;
