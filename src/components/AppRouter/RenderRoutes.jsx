import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { generateCrumbsForRoute } from 'utils/index';

function renderRoute(props, routes, Component) {
	const { match, location } = props;

	const { pathname } = location;

	const crumbs = generateCrumbsForRoute({
		routes,
		route: { pathname, ...match },
	});

	return <Component {...props} crumbs={crumbs} />;
}

function RenderRoutes({ routes }) {
	return (
		<Switch>
			{routes.map(({ path, exact, component }, key) => (
				<Route
					exact={exact === undefined ? true : exact}
					path={path}
					key={key}
					render={(props) => renderRoute(props, routes, component)}
				/>
			))}
		</Switch>
	);
}

export default RenderRoutes;
