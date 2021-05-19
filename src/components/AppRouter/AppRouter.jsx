import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoadingState from 'components/LoadingState';
import NotFound from 'screens/NotFound';

function AppRouter() {
	const LandingPage = lazy(() => import('screens/Landing'));
	const Login = lazy(() => import('screens/Login'));
	const Register = lazy(() => import('screens/Register'));
	const Dashboard = lazy(() => import('screens/Dashboard/Dashboard'));

	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingState />}>
				<Switch>
					<Route component={LandingPage} exact path="/" />
					<Route component={Login} exact path="/login" />
					<Route component={Register} exact path="/register" />
					<Route component={Dashboard} path="/dashboard" />
					<Route component={NotFound} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}

export default AppRouter;
