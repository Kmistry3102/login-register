'use client'
import React, { useState, forwardRef } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: 'text' | 'email' | 'password';
    label?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { type = 'text', label, placeholder, className, icon, onChange, onBlur, ...rest } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const isFloating = isFocused || hasValue;
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`relative group ${className || ''}`}>
            {/* Glow effect on focus */}
            <div
                className={`absolute -inset-0.5 rounded-xl opacity-0 blur-sm transition-all duration-500 group-hover:opacity-30 ${isFocused ? 'opacity-60' : ''}`}
            />

            {/* Main input container */}
            <div className="relative">
                {/* Icon */}
                {icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-hover:text-gray-500 ${isFocused ? 'text-gray-500' : 'text-gray-600'}`}>
                        {icon}
                    </div>
                )}

                {/* Input field */}
                <input
                    ref={ref}
                    type={inputType}
                    placeholder={!label ? placeholder : isFloating ? placeholder : ''}
                    className={`
                        w-full px-4 py-4 
                        ${icon ? 'pl-12' : 'pl-4'} 
                        ${isPassword ? 'pr-12' : 'pr-4'}
                        rounded-xl text-base outline-none border border-gray-300 transition-all duration-300 ease-out ${isFloating && label ? 'pt-6 pb-2' : ''}
                        `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    {...rest}
                />

                {/* Floating label */}
                {label && (
                    <label
                        className={`
                            absolute left-4 
                            ${icon ? 'left-12' : 'left-4'}
                            transition-all duration-300 ease-out
                            pointer-events-none
                            ${isFloating
                                ? 'top-2 text-xs font-semibold tracking-wider uppercase'
                                : 'top-1/2 -translate-y-1/2 text-base'
                            }
                            ${isFocused
                                ? 'text-gray-500'
                                : isFloating
                                    ? 'text-gray-500'
                                    : 'text-gray-500'
                            }
                        `}
                    >
                        {label}
                    </label>
                )}

                {/* Password toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-500 transition-colors duration-300 focus:outline-none cursor-pointer group-hover:text-gray-500"
                    >
                        {showPassword ? (
                            <FaEye className="w-5 h-5" />
                        ) : (
                            <FaRegEyeSlash className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>

            {/* Bottom accent line */}
            <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 border-b border-gray-300 rounded-full transition-all duration-500 ease-out group-hover:border-gray-500 ${isFocused ? 'w-[calc(100%-2rem)] opacity-100' : 'w-0 opacity-0'}`}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
