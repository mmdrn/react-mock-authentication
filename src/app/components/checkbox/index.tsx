import React, { FC, useEffect, useState } from 'react';

interface IProps {
	title?: string;
	disabled?: boolean;
	loading?: boolean;
	required?: boolean;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const Checkbox: FC<IProps> = ({ title, disabled, loading, required, checked, onChange }) => {
	Checkbox.displayName = 'Checkbox';

	const [isChecked, setIsChecked] = useState(checked);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!disabled) {
			const isChecked = event.target.checked;
			setIsChecked(isChecked);
			onChange(isChecked);
		}
	};

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	return (
		<label
			className={`flex items-center justify-start max-w-full h-10 mb-0.5 cursor-pointer text-sm ${disabled ? 'cursor-not-allowed' : ''} ${
				loading ? 'animate-pulse !cursor-progress' : ''
			}`}
		>
			<input type='checkbox' checked={isChecked} onChange={handleChange} className='invisible opacity-0 cursor-pointer w-0 h-0 overflow-auto absolute' />

			<div className={`rounded-full w-11 p-1 transition-colors duration-300 ${checked ? 'bg-blue-100' : 'bg-slate-100'}`}>
				<span
					className={`block w-4 h-4 rounded-full transition-transform duration-300 ${checked ? 'translate-x-5 bg-blue-500' : 'translate-x-0 bg-slate-500'}`}
				></span>
			</div>

			<p className='text-inherit px-2 text-slate-500 truncate w-[calc(100%-2.5rem)]'>
				{title}
				{required ? <span className='text-red-600 pl-1 leading-3 inline-block text-2xl'>&#8226;</span> : null}
			</p>
		</label>
	);
};

export default Checkbox;
