import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "outline";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white",
  primary:
    "bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white",
  secondary:
    "bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700",
  danger:
    "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white",
  success:
    "bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
  outline:
    "bg-transparent border-2 border-emerald-400 text-emerald-500 hover:bg-emerald-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
           focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]
             ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
