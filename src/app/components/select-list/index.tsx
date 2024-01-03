import { FC, Fragment, memo, useEffect, useRef, useState } from 'react';

export interface Option {
	value: string;
	baseValue?: any;
	label: string;
}

interface IProps {
	value: Option | Option[] | null;
	title: string;
	loading?: boolean;
	disabled?: boolean;
	options: Option[];
	required?: boolean;
	className?: string;
	multiple?: boolean;
	errors?: string[] | null;
	placeholder?: string;
	onChange?: (value: Option | Option[] | null) => void;
}

const SelectList: FC<IProps> = memo(({ title, multiple, required, disabled, className, loading, errors, placeholder, value: _value, options, onChange }) => {
	SelectList.displayName = 'Select List';

	const selectListHTMLRef = useRef<HTMLSelectElement>(null);
	const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [mustEmit, setMustEmit] = useState(true);
	const [searchKeyowrd, setSearchKeyowrd] = useState('');

	const handleSelectChange = (value: string) => {
		if (multiple) {
			const selectedItems: string[] = [];
			Array.prototype.forEach.call(selectListHTMLRef.current?.options, (option) => {
				if (option.selected) selectedItems.push(option.value);
			});

			const selectedOptions = options.filter((o) => selectedItems.includes(o.value));
			setSelectedValue(selectedOptions);
		} else {
			if (value === '') {
				setSelectedValue({
					value: '',
					label: 'Select ...',
				});
			} else if (value !== undefined && value !== null) {
				const selectedItem = options.find((i) => i.value === value);

				if (selectedItem) {
					setSelectedValue(selectedItem);
				}
			} else {
				setSelectedValue(null);
			}
		}
	};

	const handleSelectOption = (option: Option) => {
		if (Array.isArray(selectedValue)) {
			const values = selectedValue.map((i) => i.value);
			const index = values.findIndex((i) => i === option.value);
			if (index > -1) {
				const values = Array.from(selectedValue);
				values.splice(index, 1);
				setSelectedValue(values);
			} else {
				setSelectedValue([...selectedValue, option]);
			}
		} else {
			setSelectedValue([option]);
		}
	};

	useEffect(() => {
		if (selectedValue && onChange) {
			onChange(selectedValue);
		} else if (mustEmit && onChange) onChange(selectedValue);
		setMustEmit(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

	useEffect(() => {
		if (multiple && _value) {
			const selectedItemsIDs = (_value as Option[]).map((i) => i.value);
			Array.prototype.forEach.call(selectListHTMLRef.current?.options as HTMLOptionsCollection, (option) => {
				if (selectedItemsIDs.includes(option.value)) {
					option['selected'] = true;
				}
			});
		}

		setMustEmit(false);
		setSelectedValue(_value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_value]);

	useEffect(() => {
		setSearchKeyowrd('');
	}, [isOpen]);

	return (
		<label
			className={`relative cursor-pointer w-full flex flex-col justify-start items-start text-sm ${className ? className : ''} ${
				disabled ? 'cursor-not-allowed' : ''
			}`}
		>
			{title ? (
				<p className='text-inherit px-1 mb-1 text-slate-500 truncate'>
					{title}
					{required ? <span className='text-red-600 pl-1 leading-3 inline-block text-xl'>&#8226;</span> : null}
				</p>
			) : null}

			<select
				className={
					multiple
						? 'invisible absolute'
						: `rounded-md h-10 text-inherit font-normal leading-9 w-full outline-none transition-colors bg-slate-100 border  ${
								errors && errors.length ? 'border-red-500' : 'border-slate-100'
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  } px-2 focus:border-blue-500 ${disabled ? 'cursor-not-allowed' : ''} ${loading ? '!cursor-progress animate-pulse' : ''}`
				}
				ref={selectListHTMLRef}
				value={!multiple && selectedValue ? (selectedValue as Option).value : undefined}
				onChange={(e) => {
					handleSelectChange(e.target.value);
				}}
				multiple={multiple}
				disabled={disabled ? true : false}
			>
				<option value=''>Select ...</option>

				{options.map((option) => (
					<option key={option.value} value={option.value.toString()}>
						{option.label}
					</option>
				))}
			</select>

			{/* multiple selectbox */}
			{multiple ? (
				<Fragment>
					<div
						className={`rounded-md min-h-[40px] text-inherit font-normal leading-9 w-full outline-none transition-colors bg-slate-100 border flex items-center justify-between
								${errors && errors.length ? 'border-red-500' : 'border-slate-100'} px-2 focus:border-blue-500 ${disabled ? 'cursor-not-allowed' : ''} ${
							loading ? '!cursor-progress animate-pulse' : ''
						}`}
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className='truncate'>
							{!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0) ? (
								placeholder ? (
									placeholder
								) : (
									'Select...'
								)
							) : (
								<span className='inline-flex gap-2 flex-wrap'>
									{(selectedValue as Option[]).map((i) => {
										return <span className='bg-white px-2 py-1 leading-5 text-xs rounded-md'>{i.label}</span>;
									})}
								</span>
							)}
						</span>
						<span className='material-symbols-rounded pt-0.5'>&#xe5cf;</span>
					</div>

					<div
						className={`absolute w-full max-h-40 bg-white border border-neutral-200 rounded-md overflow-scroll top-[72px] transition-opacity duration-200 z-10 shadow-selectListBox ${
							isOpen ? 'visible opacity-100' : 'invisible opacity-0'
						}`}
					>
						<input
							type='text'
							className='h-9 w-full px-2 outline-none'
							placeholder='Search'
							value={searchKeyowrd}
							onChange={(e) => {
								setSearchKeyowrd(e.target.value);
							}}
						/>

						{options.filter((o) => o.label.toLowerCase().includes(searchKeyowrd.toLowerCase())).length ? (
							options
								.filter((o) => o.label.toLowerCase().includes(searchKeyowrd.toLowerCase()))
								.map((option) => {
									return (
										<div
											className='flex items-center justify-start w-full truncate leading-8 font-normal cursor-pointer px-2 text-gray-700 hover:bg-gray-50 text-sm transition-colors duration-300'
											key={option.value}
											onClick={() => handleSelectOption(option)}
										>
											{selectedValue && Array.isArray(selectedValue) && selectedValue.map((i) => i.value).includes(option.value) ? (
												<span className='material-symbols-rounded text-gray-700 text-base mr-1'>&#xe834;</span>
											) : (
												<span className='material-symbols-rounded text-gray-700 text-base mr-1'>&#xe835;</span>
											)}
											<span className='truncate pr-2'>{option.label}</span>
										</div>
									);
								})
						) : (
							<div className='flex items-center justify-start w-full truncate leading-8 font-normal cursor-not-allowed px-2 text-gray-700 text-sm transition-colors duration-300'>
								<span className='truncate pr-2'>No Item</span>
							</div>
						)}
					</div>
				</Fragment>
			) : null}

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
	);
});

export default SelectList;
