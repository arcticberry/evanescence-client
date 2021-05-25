import React from 'react';
import { useTable, usePagination } from 'react-table';
import Pagination from './Pagination';
import './Table.css';

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
			<table {...getTableProps()} className={'Table'}>
				<thead className="Thead">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							<th className="Th">S/N</th>

							{headerGroup.headers.map((column) => {
								return (
									<th {...column.getHeaderProps()} className="Th">
										{column.render('Header')}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()} className="Tbody">
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} className="Tr">
								<td className="Td row-index" data-label="S/N">
									<div className="Td__inner"> {row.index + 1}</div>
								</td>
								{row.cells.map((cell, i) => {
									const Header = cell.render('Header');

									return (
										<td
											{...cell.getCellProps()}
											data-label={typeof Header === 'string' ? Header : cell.column.id}
											className={`Td`}
										>
											<div className="Td__inner">{cell.render('Cell')}</div>
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
