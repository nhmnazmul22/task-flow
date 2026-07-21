import * as React from "react";
import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router";
import Button from "@/components/ui/Button.tsx";
import Input from "@/components/ui/Input.tsx";
import {registerService} from "@/services/auth.ts";

type FormDataType = {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

const initialData: FormDataType = {
    name: "",
    email: "",
    password: "",
    avatar: ""
}

const useSignup = () => {
    const [formData, setFormData] = useState<FormDataType>({...initialData});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleChange = (key: keyof FormDataType, value: string | File | null) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }


    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log("file", file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => handleChange('avatar', ev.target?.result as string);
            reader.readAsDataURL(file);
            console.log("reader", reader);
        }
    };

    const removeAvatar = () => {
        handleChange('avatar', null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    const handleSubmit = async () => {
        try {
            const result = await registerService({...formData})
            if (!result.success) {
                alert(result.message)
                return;
            }
            alert(result.message)
            navigate('/login')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknow error';
            alert(message)
        }
    }

    return {formData, fileInputRef, handleChange, handleAvatarChange, removeAvatar, handleSubmit}
}


const Signup = () => {
    const {formData, fileInputRef, handleChange, handleAvatarChange, removeAvatar, handleSubmit} = useSignup()
    return (
        <div className="auth-slide-up">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
                <p className="text-gray-500 text-sm">
                    Start managing tasks with your team today
                </p>
            </div>
            {/* Avatar upload */}
            <div className="flex flex-col items-start mb-6">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors duration-200"
                >
                    {formData?.avatar ? (
                        <>
                            <img
                                src={formData?.avatar ?? ""}
                                alt="Avatar preview"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                </svg>
                            </div>
                        </>
                    ) : (
                        <div
                            className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-1 group-hover:bg-gray-50 transition-colors">
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>
                            <span className="text-[10px] text-gray-400 font-medium">Upload</span>
                        </div>
                    )}
                </button>
                {formData?.avatar && (
                    <button
                        type="button"
                        onClick={removeAvatar}
                        className="mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                        Remove photo
                    </button>
                )}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
                className="space-y-1"
            >
                <Input
                    id="name"
                    label="Full name"
                    type="text"
                    placeholder="Alex Johnson"
                    value={formData.name}
                    onChange={(e) =>
                        handleChange("name", e.target.value)}
                    required
                />
                <Input
                    id="email"
                    label="Work email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) =>
                        handleChange("email", e.target.value)}
                    required
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e) =>
                        handleChange("password", e.target.value)}
                    required
                    minLength={8}
                />

                <div className="flex items-start gap-2 mb-6 mt-2">
                    <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-500 leading-snug">
                        I agree to the{" "}
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Privacy Policy
                        </a>
                    </label>
                </div>

                <Button variant="primary" fullWidth type="submit">
                    Create account
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Signup;
