import { lazy } from 'react';

const LandingPage = lazy(() => import('screens/Landing'));
const Login = lazy(() => import('screens/Login'));
const Register = lazy(() => import('screens/Register'));
const PasswordReset = lazy(() => import('screens/PasswordReset'));
const Dashboard = lazy(() => import('screens/Dashboard/Dashboard'));

// Dashboard Application routes
const AddApplicationName = lazy(() =>
	import('screens/Dashboard/screens/Applications/screens/CreateApplication/screens/AddApplicationName')
);
const PickServices = lazy(() =>
	import('screens/Dashboard/screens/Applications/screens/CreateApplication/screens/PickServices')
);
const AppCreationSuccess = lazy(() =>
	import('screens/Dashboard/screens/Applications/screens/CreateApplication/screens/AppCreationSuccess')
);
const Applications = lazy(() => import('screens/Dashboard/screens/Applications'));
const ViewApplication = lazy(() => import('screens/Dashboard/screens/Applications/screens/ViewApplication/index'));
const CreateApplication = lazy(() => import('screens/Dashboard/screens/Applications/screens/CreateApplication'));

export default Object.freeze({
	LANDING: {
		label: 'Welcome',
		path: '/',
		component: LandingPage,
		exact: true,
	},
	LOGIN: {
		label: 'Login',
		path: '/login',
		component: Login,
		exact: true,
	},
	REGISTER: {
		label: 'Register',
		path: '/register',
		component: Register,
		exact: true,
	},
	PASSWORD_RESET: {
		label: 'Password Reset',
		path: '/password/reset/:token?',
		component: PasswordReset,
		exact: true,
	},
	DASHBOARD: {
		label: 'Dashboard',
		path: '/dashboard',
		component: Dashboard,
		exact: false,
	},
	APPLICATIONS_LIST: {
		path: '/dashboard/applications',
		label: 'Applications',
		exact: true,
		Component: Applications,
	},
	CREATE_APPLICATION: {
		path: '/dashboard/applications/create',
		label: 'Create Application',
		component: CreateApplication,
		exact: true,
	},
	VIEW_APPLICATION: {
		path: '/dashboard/applications/:id',
		label: 'Overview',
		Component: ViewApplication,
		exact: true,
	},

	ADD_APPLICATION_NAME: {
		path: '/dashboard/applications/create',
		component: AddApplicationName,
		exact: true,
	},
	PICK_APPLICATION_SERVICES: {
		path: '/dashboard/applications/create/pick-services',
		label: 'Pick services',
		exact: true,
		component: PickServices,
	},
	APP_CREATION_SUCCESS: {
		path: '/dashboard/applications/create/success',
		label: 'Success',
		component: AppCreationSuccess,
	},
});
