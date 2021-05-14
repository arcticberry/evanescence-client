import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from 'components/LoadingState';
import AuthenticatedHoc from 'HOC/WithAuthenticated';
import Sidebar from 'screens/Dashboard/components/Sidebar';
import './dashboard.scss';
import routes from './routes';
import { RenderRoutes } from 'components/AppRouter';

const Dashboard = () => {
	const NotFound = lazy(() => import('screens/NotFound'));

	return (
		<div className="flex" id="wrapper">
			<Sidebar isExpanded={true} />

			<section className="h-full w-full bg-gray-100" id="page-content-wrapper">
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

export default AuthenticatedHoc(Dashboard);
// export default Dashboard;
