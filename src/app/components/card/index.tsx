import React, { FC } from 'react';

interface IProps {
	children: React.ReactNode;
	className?: string;
}

const Card: FC<IProps> = ({ className, children }) => {
	return <div className={`p-6 bg-white rounded-md shadow-wrapperShadow ${className ? className : ''}`}>{children}</div>;
};

export default Card;
