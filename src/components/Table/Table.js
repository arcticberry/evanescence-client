import React from 'react';
import BaseTable from './BaseTable';

function Table({ columns, data, defaultPageIndex, defaultPageSize, ...props }) {
	const memoizedColumns = React.useMemo(() => columns, [columns]);
	const pageIndex = React.useMemo(() => defaultPageIndex, [defaultPageIndex]);
	const pageSize = React.useMemo(() => defaultPageSize, [defaultPageSize]);

	return (
		<BaseTable
			columns={memoizedColumns}
			data={data}
			defaultPageIndex={pageIndex}
			defaultPageSize={pageSize}
			{...props}
		/>
	);
}

Table.defaultProps = {
	defaultPageIndex: 0,
	defaultPageSize: 40,
};

export default Table;
