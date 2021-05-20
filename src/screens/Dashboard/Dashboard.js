import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Breadcrumb from 'components/Breadcrumb';
import Loading from 'components/LoadingState';
import AuthenticatedHoc from 'HOC/WithAuthenticated';
import WithBreadcrumbs from 'HOC/WithBreadcrumbs';
import Sidebar from 'screens/Dashboard/components/Sidebar';
import './dashboard.scss';
import routes from './routes';
import { RenderRoutes } from 'components/AppRouter';

const Dashboard = ({ breadcrumbs, history }) => {
	const NotFound = lazy(() => import('screens/NotFound'));
	const handleLogout = () => {
		localStorage.removeItem('token');
		history.push('/login');
	};

	return (
		<div className="flex bg-gray-100" id="wrapper">
			<Sidebar isExpanded={true} onLogout={handleLogout} />

			<section className="h-full w-full" id="page-content-wrapper">
				<div className="px-16 md:px-24 py-6">
					<div className="row">
						<div className="">
							<Breadcrumb items={breadcrumbs} />
						</div>
					</div>
				</div>

				<Suspense fallback={<Loading />}>
					<Switch>
						<RenderRoutes routes={routes} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</section>
		</div>
	);
};

export default WithBreadcrumbs(routes)(AuthenticatedHoc(Dashboard));
