import { FC, Fragment, memo } from 'react';

import { ChangeEvent } from 'react';

interface TextInputProps {
	value: string;
	title?: string;
	disabled?: boolean;
	loading?: boolean;
	password?: boolean;
	required?: boolean;
	className?: string;
	errors?: string[] | null;
	placeholder?: string;
	onChange?: (value: string) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const TextInput: FC<TextInputProps> = memo(
	({ title, value, disabled, loading, password, required, errors, className, placeholder, onChange: _onChange, onFocus: _onFocus }) => {
		const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
			if (!disabled && _onChange) {
				_onChange(event.target.value);
			}
		};

		const handleFocusInput = (event: React.FocusEvent<HTMLInputElement, Element>) => {
			if (!disabled && _onFocus) {
				_onFocus(event);
			}
		};

		return (
			<Fragment>
				<label className={`w-full flex flex-col justify-start items-start text-sm ${className ? className : ''} ${disabled ? 'cursor-not-allowed' : ''}`}>
					{title ? (
						<p className='text-inherit px-1 mb-1 text-slate-500 truncate'>
							{title}
							{required ? <span className='text-red-600 pl-1 leading-3 inline-block text-xl'>&#8226;</span> : null}
						</p>
					) : null}
					<input
						className={`rounded-md h-10 text-inherit font-normal leading-9 w-full outline-none transition-colors bg-slate-100 border ${
							errors && errors.length ? 'border-red-500' : 'border-slate-100'
						} px-2 focus:border-blue-500 ${disabled ? 'cursor-not-allowed' : ''} ${loading ? '!cursor-progress animate-pulse' : ''}`}
						type={password ? 'password' : 'text'}
						disabled={disabled ? true : false}
						value={value}
						onChange={handleInputChange}
						onFocus={handleFocusInput}
						placeholder={placeholder}
					/>

					{errors && errors.length ? (
						<div className='px-1 leading-6 text-sm text-red-600 flex flex-col'>
							{errors.map((error) => {
								return (
									<span className='block text-inherit font-normal' key={error}>
										{error}
									</span>
								);
							})}
						</div>
					) : null}
				</label>
			</Fragment>
		);
	},
);

export default TextInput;
