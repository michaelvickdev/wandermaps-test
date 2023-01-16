import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element[] | JSX.Element | string;
  fullWidth?: boolean;
}


function Button({ children, fullWidth, ...props }: ButtonProps) {
  return (
    <button {...props} className={`text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded ${fullWidth ? 'w-full' : ''}`}>
      {children}
    </button>
  );
}

export default Button;