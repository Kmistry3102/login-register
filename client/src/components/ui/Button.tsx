import React from 'react'

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { className, children, onClick, variant = 'primary', disabled = false } = props;

  const baseClasses = `
    relative overflow-hidden
    px-6 py-2.5 rounded-xl
    font-semibold text-base tracking-wide
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

  const variants = {
    primary: `
      bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/30 hover:scale-[1.02] active:scale-[0.98]
    `,
    secondary: `
      bg-transparent text-black hover:border-gray-500 hover:shadow-lg hover:shadow-gray-500/10 hover:scale-[1.02] active:scale-[0.98] border border-gray-300 active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-gray-400 hover:text-gray-500 hover:bg-gray-800/50 hover:scale-[1.02] active:scale-[0.98] hover:border-gray-500 hover:text-gray-500
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
