import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { Formik } from 'formik';

import routes from './routes';
import AuthenticatedHoc from 'HOC/WithAuthenticated';
import { fetchServices } from 'services/application/service.slice';
import { createApplication } from 'services/application/application.slice';

import { RenderRoutes } from 'components/AppRouter';
import Breadcrumb from 'components/Breadcrumb';

const NotFound = lazy(() => import('screens/NotFound'));

const CreateApplication = ({ crumbs, fetchServices, services, createApplication, history }) => {
	React.useEffect(() => {
		if (!services.hasOwnProperty('entities')) {
			fetchServices();
		}
	}, [services, fetchServices]);

	const formValues = {
		applicationName: '',
		services: {},
	};

	return (
		<>
			<div className="px-16 md:px-24">
				<div className="row">
					<div className="mt-3 mb-8">
						<Breadcrumb items={crumbs} />
					</div>
				</div>
			</div>
			<Formik initialValues={formValues}>
				<BrowserRouter>
					<Suspense fallback={() => <>Loading...</>}>
						<Switch>
							<RenderRoutes routes={routes} />
							<Redirect to="/dashboard" />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</Formik>
		</>
	);
};

const mapStateToProps = ({ service }) => {
	return {
		services: service.services,
	};
};

const mapDispatchToProps = { fetchServices, createApplication };

export default AuthenticatedHoc(connect(mapStateToProps, mapDispatchToProps)(CreateApplication));
