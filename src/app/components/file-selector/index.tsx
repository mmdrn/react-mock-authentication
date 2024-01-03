import { FC, Fragment, memo } from 'react';

import { ChangeEvent } from 'react';

interface IProps {
	title?: string;
	buttonTitle?: string;
	disabled?: boolean;
	loading?: boolean;
	required?: boolean;
	className?: string;
	errors?: string[] | null;
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const FileSelector: FC<IProps> = memo(
	({ title, buttonTitle = 'Browse', disabled, required, className, onChange: _onChange, onFocus: _onFocus }) => {
		return (
			<Fragment>
				<label
					className={`w-full flex flex-col justify-start items-start text-sm ${className ? className : ''} ${
						disabled ? 'cursor-not-allowed' : ''
					} cursor-pointer`}
				>
					{title ? (
						<p className='text-inherit px-1 mb-1 text-slate-500 truncate'>
							{title}
							{required ? <span className='text-red-600 pl-1 leading-3 inline-block text-xl'>&#8226;</span> : null}
						</p>
					) : null}

					<div className='flex w-full'>
						<span className='rounded-tl-md rounded-bl-md bg-slate-100 px-4 h-10 pb-0.5 truncate w-28 block leading-[39px] text-center'>{buttonTitle}</span>
						<span className='rounded-tr-md rounded-br-md border border-slate-100 bg-slate-50 px-4 block leading-[39px] h-10 w-[calc(100%-7rem)] truncate'>
							Selected file name goes here
						</span>
					</div>

					<input type='file' className='absolute w-0 h-0 opacity-0 invisible' onChange={_onChange} />
				</label>
			</Fragment>
		);
	},
);

export default FileSelector;
