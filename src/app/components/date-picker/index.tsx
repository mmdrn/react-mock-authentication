import { FC, memo } from 'react';
import TextInput from '../text-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface IProps {
	date: Date;
	title?: string;
	disabled?: boolean;
	loading?: boolean;
	required?: boolean;
	className?: string;
	errors?: string[] | null;
	placeholder?: string;
	onChange: (date: Date) => void;
}

const InputDatePicker: FC<IProps> = memo(({ date, title, disabled, loading, required, className, errors, placeholder, onChange }) => {
	return (
		<div>
			<DatePicker
				selected={date}
				onChange={(date: Date) => onChange(date)}
				customInput={
					<TextInput
						value={moment(date).format('MMMM Do YYYY')}
						title={title}
						disabled={disabled}
						loading={loading}
						required={required}
						className={className}
						errors={errors}
						placeholder={placeholder}
					/>
				}
			/>
		</div>
	);
});

export default InputDatePicker;
