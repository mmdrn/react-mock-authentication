import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit';
	status?: 'danger' | 'success' | 'info' | 'warning';
	disabled?: boolean;
	to?: string;
	loading?: boolean;
}

const Button: FC<ButtonProps> = ({ type = 'button', status = 'info', className, disabled = false, loading, to, onClick: _onClick, children }) => {
	const HandleGetColors = useCallback((status: string) => {
		switch (status) {
			case 'info':
				return `bg-blue-500 ${!disabled || !loading ? 'hover:bg-blue-700' : ''} text-white`;
			case 'success':
				return `bg-green-500 ${!disabled || !loading ? 'hover:bg-green-700' : ''} text-white`;
			case 'danger':
				return `bg-red-500 ${!disabled || !loading ? 'hover:bg-red-700' : ''} text-white`;
			case 'warning':
				return `bg-orange-500 ${!disabled || !loading ? 'hover:bg-orange-700' : ''} text-white`;
		}
	}, []);

	return !to ? (
		<button
			type={type}
			disabled={disabled}
			className={`block text-center px-3 w-full leading-10 rounded-md font-normal transition-colors duration-300 
			${HandleGetColors(status)} ${className ? className : ''} ${disabled ? 'cursor-not-allowed' : ''} ${loading ? 'animate-pulse cursor-progress' : ''}`}
			onClick={() => {
				!disabled && _onClick ? _onClick() : null;
			}}
		>
			{children}
		</button>
	) : (
		<Link
			to={to}
			className={`block text-center px-3 w-full leading-10 rounded-md font-normal transition-colors duration-300 
			${HandleGetColors(status)} ${className ? className : ''} ${loading ? 'animate-pulse cursor-progress' : ''}`}
		>
			{children}
		</Link>
	);
};

export default Button;
