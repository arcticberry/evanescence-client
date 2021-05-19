import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const Applications = lazy(() => import('screens/Dashboard/screens/Applications'));
const ViewApplication = lazy(() => import('screens/Dashboard/screens/Applications/screens/ViewApplication/index'));
const CreateApplication = lazy(() => import('screens/Dashboard/screens/Applications/screens/CreateApplication'));

export default [
	{
		path: '/dashboard',
		label: 'Dashboard',
		Component: () => <Redirect to={`/dashboard/applications`} />,
	},
	{
		path: '/dashboard/applications',
		label: 'Applications',
		exact: true,
		Component: Applications,
	},
	{
		path: '/dashboard/applications/create',
		label: 'Create Application',
		Component: CreateApplication,
		exact: true,
	},
	{
		path: '/dashboard/applications/:id',
		label: 'Overview',
		Component: ViewApplication,
		exact: true,
	},
];
