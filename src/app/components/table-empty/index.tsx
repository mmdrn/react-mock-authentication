import { FC, memo } from 'react';

const TableEmpty: FC<{ colSpan: number }> = memo(({ colSpan }) => {
	return (
		<tr>
			<td colSpan={colSpan} className='bg-white'>
				<div className='text-center py-20 flex flex-col justify-center items-center text-blue-900'>
					<span className='material-symbols-rounded text-6xl'>&#xeb57;</span>
					<p className='mt-1 font-light'>This list is empty.</p>
				</div>
			</td>
		</tr>
	);
});

export default TableEmpty;
