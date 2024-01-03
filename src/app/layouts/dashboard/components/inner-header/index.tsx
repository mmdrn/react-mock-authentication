import { memo } from 'react';
import { InnerHeaderProps } from './types';

const InnerHeader = memo((props: InnerHeaderProps) => {
	return (
		<div className='flex items-center justify-between rounded-lg bg-white mb-6 min-h-[40px]'>
			<h1 className='text-indigo-800 inline-flex items-center'>
				<p className='text-xl leading-8 font-bold'>{props.title}</p>
			</h1>

			<div>{props.children}</div>
		</div>
	);
});

export default InnerHeader;
