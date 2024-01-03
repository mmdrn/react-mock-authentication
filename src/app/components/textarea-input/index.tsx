import { FC, Fragment, memo } from 'react';

import { ChangeEvent } from 'react';

interface Props {
	value: string;
	title?: string;
	disabled?: boolean;
	loading?: boolean;
	required?: boolean;
	className?: string;
	errors?: string[] | null;
	onChange?: (value: string) => void;
	onFocus?: (event: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
}

const TextareaInput: FC<Props> = memo(({ title, value, disabled, required, loading, className, errors, onChange: _onChange, onFocus: _onFocus }) => {
	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (!disabled && _onChange) {
			_onChange(event.target.value);
		}
	};

	const handleFocusInput = (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
		if (!disabled && _onFocus) {
			_onFocus(event);
		}
	};

	return (
		<Fragment>
			<label
				className={`w-full flex flex-col justify-start items-start text-sm ${className ? className : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
			>
				{title ? (
					<p className='text-inherit px-1 mb-1 text-slate-500 truncate'>
						{title}
						{required ? <span className='text-red-600 pl-1 leading-3 inline-block text-xl'>&#8226;</span> : null}
					</p>
				) : null}
				<textarea
					// className='block w-full border border-neutral-200 text-neutral-700 font-normal rounded-md leading-6 px-2 outline-none transition-all focus:border-blue-500 resize-y'
					className={`rounded-md text-inherit font-normal leading-6 w-full outline-none transition-colors bg-slate-100 border resize-y ${
						errors && errors.length ? 'border-red-500' : 'border-slate-100'
					} px-2 py-3 focus:border-blue-500 ${disabled ? 'cursor-not-allowed' : ''} ${loading ? '!cursor-progress animate-pulse' : ''}`}
					rows={4}
					disabled={disabled ? true : false}
					value={value}
					onChange={handleInputChange}
					onFocus={handleFocusInput}
				></textarea>

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
});

export default TextareaInput;
