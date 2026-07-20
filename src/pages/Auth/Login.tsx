import Button from "@/components/ui/Button.tsx";
import Input from "@/components/ui/Input.tsx";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form>
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    <Button variant="primary" fullWidth type="submit">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
