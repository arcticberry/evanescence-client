import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import r from 'constants/routes';
import LoadingState from 'components/LoadingState';
import NotFound from 'screens/NotFound';
import RenderRoutes from './RenderRoutes';

function AppRouter() {
	const routes = [r.LANDING, r.LOGIN, r.REGISTER, r.PASSWORD_RESET, r.DASHBOARD];

	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingState />}>
				<Switch>
					<RenderRoutes routes={routes} />
					<Route component={NotFound} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}

export default AppRouter;
