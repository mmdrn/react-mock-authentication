import { FC, memo } from 'react';

const TableOperationFailed: FC<{ colSpan: number }> = memo(({ colSpan }) => {
	return (
		<tr>
			<td colSpan={colSpan} className='bg-white'>
				<div className='text-center py-20 flex flex-col justify-center items-center text-red-900'>
					<span className='material-symbols-rounded text-6xl'>&#xe000;</span>
					<p className='mt-1 font-light'>
						Operation failed.
						<br />
						Please reload page or signin again.
					</p>
				</div>
			</td>
		</tr>
	);
});

export default TableOperationFailed;
