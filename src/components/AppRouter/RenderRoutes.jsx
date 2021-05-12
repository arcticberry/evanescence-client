import React from 'react';
import { Route } from 'react-router-dom';
import { generateCrumbsForRoute } from 'utils';

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
		<>
			{routes.map(({ path, exact, Component }, key) => (
				<Route
					exact={exact === undefined ? true : exact}
					path={path}
					key={key}
					render={(props) => renderRoute(props, routes, Component)}
				/>
			))}
		</>
	);
}

export default RenderRoutes;
