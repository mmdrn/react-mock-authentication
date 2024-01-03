import React from 'react';

interface IProps {
	title?: string;
	isOpen: boolean;
	children: React.ReactNode;
	wrapperClassName?: string;
}

const Modal: React.FC<IProps> = ({ title, isOpen, children, wrapperClassName }) => {
	return (
		<div className={`fixed inset-0 flex items-center justify-center z-50 transition-all ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
			{/* overlay */}
			<div className='bg-gray-800 opacity-80 absolute w-full h-full'></div>

			{/* wrapper */}
			<div className={`bg-white rounded-lg p-6 shadow-lg z-10 w-[600px] absolute top-20 ${wrapperClassName ? wrapperClassName : ''}`}>
				{title ? <h2 className='text-xl font-bold mb-4'>{title}</h2> : null}
				{children}
			</div>
		</div>
	);
};

export default Modal;
