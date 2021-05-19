import React from 'react';

export default [
	{
		Header: 'Reference',
		accessor: 'reference',
	},
	{
		Header: 'Vendor Reference',
		accessor: 'vendor_reference',
	},
	{
		Header: 'Date',
		accessor: 'date',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Currency',
		accessor: 'currency',
	},
	{
		Header: () => <div className="text-right">Amount</div>,
		Cell: ({ value }) => <div className="text-right">{value}</div>,
		accessor: 'amount',
	},
];
