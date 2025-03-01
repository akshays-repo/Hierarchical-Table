import React, { ChangeEvent, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    className = "border rounded px-2 py-1 w-24 text-sm",
    ...rest
}) => {
    return (
        <input
            value={value}
            onChange={onChange}
            className={className}
            {...rest}
        />
    );
};

export default Input;
