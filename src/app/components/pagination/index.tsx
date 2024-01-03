import { FC, Fragment, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	totalCount: number;
	pageIndex: number;
	pageSize: number;
	link: string;
}
const Pagination: FC<IProps> = memo(({ totalCount, pageIndex, pageSize, link }) => {
	Pagination.displayName === 'Pagination';

	const [totalPagesCount, setTotalPagesCounts] = useState<number>(0);

	const handleCalculateTotalPages = (pageSize: number, totalCount: number) => {
		setTotalPagesCounts(Math.ceil(totalCount / pageSize));
	};

	const handleRenderPrevButton = (pageIndex: number) => {
		if (pageIndex <= 1) {
			return <div className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit cursor-not-allowed'>Prev</div>;
		}

		return (
			<Link
				to={{
					pathname: link,
					search: `pageIndex=${pageIndex <= 1 ? pageIndex : pageIndex - 1}&pageSize=${pageSize}`,
				}}
				className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit'
			>
				Prev
			</Link>
		);
	};

	const handleRenderNextButton = (pageIndex: number) => {
		if (pageIndex === totalPagesCount) {
			return (
				<div className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'>
					Next
				</div>
			);
		} else {
			return (
				<Link
					to={{
						pathname: link,
						search: `pageIndex=${pageIndex + 1}&pageSize=${pageSize}`,
					}}
					className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5'
				>
					Next
				</Link>
			);
		}
	};

	const handleRenderFirstButton = (pageIndex: number) => {
		if (pageIndex === 1) {
			return (
				<div className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'>
					First
				</div>
			);
		} else {
			return (
				<Link
					to={{
						pathname: link,
						search: `pageIndex=${1}&pageSize=${pageSize}`,
					}}
					className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5'
				>
					First
				</Link>
			);
		}
	};

	const handleRenderLastButton = (pageIndex: number) => {
		if (pageIndex === totalPagesCount) {
			return (
				<div className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'>
					Last
				</div>
			);
		} else {
			return (
				<Link
					to={{
						pathname: link,
						search: `pageIndex=${totalPagesCount}&pageSize=${pageSize}`,
					}}
					className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5'
				>
					Last
				</Link>
			);
		}
	};

	const handleRenderPageButtons = (totalPagesCount: number, pageIndex: number) => {
		// if total pages was equal to 6
		if (totalPagesCount <= 6) {
			return Array(totalPagesCount)
				.fill(0, 0)
				.map((_: undefined, index: number) => {
					if (index === pageIndex - 1) {
						return (
							<div
								className='bg-blue-800 text-white rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'
								key={index + 1}
							>
								{index + 1}
							</div>
						);
					} else {
						return (
							<Link
								to={{
									pathname: link,
									search: `pageIndex=${index + 1}&pageSize=${pageSize}`,
								}}
								className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5'
								key={index + 1}
							>
								{index + 1}
							</Link>
						);
					}
				});
		} else {
			// if current page was one of three last pages
			if (pageIndex >= totalPagesCount - 2) {
				return (
					<Fragment>
						<div className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'>
							...
						</div>
						{[totalPagesCount - 2, totalPagesCount - 1, totalPagesCount].map((pageNumber: number) => {
							if (pageIndex === pageNumber) {
								return (
									<div
										className='bg-blue-800 text-white rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'
										key={pageNumber}
									>
										{pageNumber}
									</div>
								);
							} else {
								return (
									<Link
										to={{
											pathname: link,
											search: `pageIndex=${pageNumber}&pageSize=${pageSize}`,
										}}
										className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5'
										key={pageNumber}
									>
										{pageNumber}
									</Link>
								);
							}
						})}
					</Fragment>
				);
			}
			// other pages
			else {
				return (
					<Fragment>
						{Array(3)
							.fill(0, 0)
							.map((_: undefined, index: number) => {
								const pageNumber = pageIndex + index;
								if (pageNumber <= totalPagesCount) {
									if (pageIndex === pageNumber) {
										return (
											<div
												className='bg-blue-800 text-white rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'
												key={pageNumber}
											>
												{pageNumber}
											</div>
										);
									} else {
										return (
											<Link
												to={{
													pathname: link,
													search: `pageIndex=${pageNumber}&pageSize=${pageSize}`,
												}}
												className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5'
												key={pageNumber}
											>
												{pageNumber}
											</Link>
										);
									}
								}
							})}

						<div className='bg-slate-100 rounded-md px-5 min-w-10 h-10 flex items-center justify-center text-inherit leading-10 pb-0.5 cursor-not-allowed'>
							...
						</div>
					</Fragment>
				);
			}
		}
	};

	useEffect(() => {
		handleCalculateTotalPages(pageSize, totalCount);
	}, [totalCount, pageSize]);

	return (
		<div className='flex justify-between w-full mt-6 gap-1 text-slate-900 text-sm leading-10 pb-0.5'>
			<div className='flex justify-start'>
				<p className='text-sm text-slate-500 font-normal leading-9 pb-1 mr-2'>Items per page: {pageSize}</p>
			</div>
			<div className='flex justify-end gap-1 text-inherit'>
				{!totalPagesCount ? null : <p className='text-sm text-slate-500 font-normal leading-9 pb-1 mr-2'>Total pages: {totalPagesCount}</p>}
				{handleRenderFirstButton(pageIndex)}
				{handleRenderPrevButton(pageIndex)}
				{handleRenderPageButtons(totalPagesCount, pageIndex)}
				{handleRenderNextButton(pageIndex)}
				{handleRenderLastButton(pageIndex)}
			</div>
		</div>
	);
});

export default Pagination;
