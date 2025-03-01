import React from "react";

type ButtonProps = {
    variant?: "primary" | "secondary" | "danger";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    id?: string;
};

const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
};

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    onClick,
    children,
    className = "text-sm py-1 px-3 rounded",
    id

}) => {
    return (
        <button
            className={`${variantClasses[variant]} ${className}`}
            onClick={onClick}
            id={id}
        >
            {children}
        </button>
    );
};

export default Button;
