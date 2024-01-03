import { FC, ReactNode } from 'react';

interface IProps {
	title?: string;
	className?: string;
	children?: ReactNode;
}

const CardHeader: FC<IProps> = ({ title, className, children }) => {
	return (
		<div className={`pb-6 mb-6 border-b-2 flex items-center justify-between ${className ? className : ''}`}>
			{title ? <h2 className='text-slate-900 font-black text-xl truncate leading-10 w-1/2'>{title}</h2> : <span></span>}
			<div className='w-1/2 flex items-center justify-end'>{children}</div>
		</div>
	);
};

export default CardHeader;
