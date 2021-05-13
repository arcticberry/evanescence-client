import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
				<BrowserRouter>
					<Suspense fallback={() => <>Loading...</>}>
						<Switch>
							<Route path="/dashboard/applications/create/success" exact={true} component={NotFound} />

							<RenderRoutes routes={routes} />
							<Route component={NotFound} />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</section>
		</div>
	);
};

export default AuthenticatedHoc(Dashboard);
// export default Dashboard;
