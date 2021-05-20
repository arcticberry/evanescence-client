import React from 'react';
import { useTable, usePagination } from 'react-table';
import Pagination from './Pagination';

function BaseTable({ columns, data, onPageNavigation, onPageSizeUpdate, defaultPageIndex, defaultPageSize }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: defaultPageIndex, pageSize: defaultPageSize },
		},
		usePagination
	);

	const performPageNavigation = ({ page, direction }) => {
		let newPageIndex = page;

		if (direction === 'prev') {
			newPageIndex = pageIndex - 1;
			previousPage();
		} else if (direction === 'next') {
			newPageIndex = pageIndex + 1;
			nextPage();
		} else {
			gotoPage(page);
		}

		onPageNavigation(newPageIndex + 1);
	};

	const handlePageSizeChange = (pageSize) => {
		setPageSize(pageSize);
		onPageSizeUpdate(pageSize);
	};

	return (
		<>
			<table
				{...getTableProps()}
				className="w-full whitespace-nowrap rounded-lg divide-y divide-gray-300 overflow-hidden border-collapse"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							<th className="py-4 px-6 text-gray-400 uppercase text-left hidden lg:table-cell">S/N</th>

							{headerGroup.headers.map((column) => {
								return (
									<th
										{...column.getHeaderProps()}
										className="py-4 px-6 text-gray-400 uppercase text-left hidden lg:table-cell"
									>
										{column.render('Header')}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()} className="divide-y divide-gray-20">
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								className="flex bg-white mb-4 lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap"
							>
								<td className="hidden lg:w-auto px-6 py-4 lg:table-cell relative lg:static">
									{row.index + 1}
								</td>
								{row.cells.map((cell, i) => {
									return (
										<td
											{...cell.getCellProps()}
											className={`w-full ${
												i % 2 == 0 ? 'bg-gray-100' : ''
											} mb-2 lg:w-auto p-3 text-gray-800 block lg:table-cell relative lg:static`}
										>
											<div className="flex justify-between mr-24 items-center text-xs md:text-xl">
												<span className="lg:hidden px-2 py-1 text-xs font-bold uppercase">
													{cell.render('Header')}
												</span>
												{cell.render('Cell')}
											</div>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<Pagination
				pageIndex={pageIndex}
				pageSize={pageSize}
				pageCount={pageCount}
				dataCount={data.length}
				onPageSizeChange={handlePageSizeChange}
				onGotoPage={(page) => performPageNavigation({ page })}
				onPagePrev={() => performPageNavigation({ direction: 'prev' })}
				onPageNext={() => performPageNavigation({ direction: 'next' })}
			/>
		</>
	);
}

export default BaseTable;
