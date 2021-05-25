import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Breadcrumb from 'components/Breadcrumb';
import Loading from 'components/LoadingState';
import AuthenticatedHoc from 'HOC/WithAuthenticated';
import WithBreadcrumbs from 'HOC/WithBreadcrumbs';
import Sidebar from 'screens/Dashboard/components/Sidebar';
import Header from 'screens/Dashboard/components/Header';
import './dashboard.scss';
import routes from './routes';
import { RenderRoutes } from 'components/AppRouter';

const Dashboard = ({ breadcrumbs, history }) => {
	const [isSidebarOpen, setSidebarOpen] = React.useState(false);

	const NotFound = lazy(() => import('screens/NotFound'));
	const handleLogout = () => {
		localStorage.removeItem('token');
		history.push('/login');
	};
	const handleMenuToggle = () => setSidebarOpen(!isSidebarOpen);

	return (
		<div className={`dashboard ${isSidebarOpen ? 'has-sidebar-open' : ''}`} id="wrapper">
			<section className="h-full" id="page-content-wrapper">
				<Header onToggleMenu={handleMenuToggle}>
					<Breadcrumb items={breadcrumbs} />
				</Header>
				<Sidebar isVisible={isSidebarOpen} isExpanded onToggleMenu={handleMenuToggle} onLogout={handleLogout} />

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
