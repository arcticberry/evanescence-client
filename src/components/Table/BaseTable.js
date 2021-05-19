import React from 'react';
import { useTable, usePagination } from 'react-table';
import Button from 'components/Button';
import Pagination from './Pagination';

function BaseTable({ columns, data, onPageNavigation, onPageSizeUpdate, defaultPageIndex, defaultPageSize }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
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

		if (direction === 'previous') {
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

	const startOffset = pageIndex * pageSize + 1;
	const endOffset = (pageIndex + 1) * pageSize;

	const isFirstPage = pageIndex === 0;
	const isLastPage = pageCount - 1 === pageIndex;

	const midPoint = Math.ceil(parseInt(pageCount / 2));
	const phase = midPoint >= pageIndex ? 'start' : 'end';
	const pageGap = 3;

	const handlePageSizeChange = (pageSize) => {
		setPageSize(pageSize);
		onPageSizeUpdate(pageSize);
	};

	return (
		<>
			<table
				{...getTableProps()}
				className="w-full whitespace-nowrap rounded-lg divide-y divide-gray-300 overflow-hidden"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							<th className="py-4 px-6 text-gray-400 uppercase text-left">S/N</th>

							{headerGroup.headers.map((column) => {
								return (
									<th
										{...column.getHeaderProps()}
										className="py-4 px-6 text-gray-400 uppercase text-left"
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
							<tr {...row.getRowProps()}>
								<td className="px-6 py-4">{row.index + 1}</td>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} className="px-6 py-4">
											{cell.render('Cell')}
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
