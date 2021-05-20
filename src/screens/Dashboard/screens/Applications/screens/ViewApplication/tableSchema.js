import React from 'react';

import Icon from 'components/Icon';
import Badge from 'components/Badge';

import { getBadgeStatus } from 'utils';

console.log({ a: getBadgeStatus('pending') });

export default () => {
	return [
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
			Cell: ({ value }) => (
				<div className="flex items-center">
					<Badge status={getBadgeStatus(value)} className=" capitalize">
						{value}
					</Badge>
				</div>
			),
		},
		{
			Header: 'Vendor',
			accessor: 'vendor',
			Cell: ({ value }) => (
				<div className="flex items-center">
					<Icon name={`vendors/${value}`} />
					<span className="ml-3 capitalize">{value}</span>
				</div>
			),
		},
		{
			Header: 'Currency',
			accessor: 'currency',
			Cell: ({ value }) => (
				<div className="flex items-center">
					<Icon name="flags/nigeria" />
					<span className="ml-3">{value}</span>
				</div>
			),
		},
		{
			Header: () => <div className="text-right">Amount</div>,
			Cell: ({ value }) => <div className="text-right">{value}</div>,
			accessor: 'amount',
		},
	];
};
