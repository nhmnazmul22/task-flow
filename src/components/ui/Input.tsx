import type {InputHTMLAttributes} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

const Input = ({label, id, className = '', ...props}: InputProps) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
