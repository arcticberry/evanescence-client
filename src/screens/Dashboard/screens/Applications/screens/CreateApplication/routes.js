import React from 'react';

const AddApplicationName = React.lazy(() =>
	import('screens/Dashboard/screens/Applications/screens/CreateApplication/screens/AddApplicationName')
);

const PickServices = React.lazy(() =>
	import('screens/Dashboard/screens/Applications/screens/CreateApplication/screens/PickServices')
);

export default [
	{
		path: '/dashboard/applications/create',
		label: 'Create',
		Component: AddApplicationName,
	},
	{
		path: '/dashboard/applications/create/pick-services',
		label: 'Pick services',
		exact: true,
		Component: PickServices,
	},
];
