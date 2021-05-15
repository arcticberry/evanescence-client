import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Formik } from 'formik';
import routes from './routes';
import AuthenticatedHoc from 'HOC/WithAuthenticated';
import api from 'services/api';
import { fetchServices } from 'services/application/service.slice';
import { createApplication } from 'services/application/application.slice';

import Loading from 'components/LoadingState';
import { RenderRoutes } from 'components/AppRouter';
import Breadcrumb from 'components/Breadcrumb';

const NotFound = lazy(() => import('screens/NotFound'));
const AppCreationSuccess = lazy(() => import('./screens/AppCreationSuccess'));

const transformServices = (services) =>
	Object.keys(services).map((serviceId) => ({
		service_id: serviceId,
		vendors: services[serviceId],
	}));

const CreateApplication = ({ match: { path }, crumbs, fetchServices, services, createApplication, history }) => {
	React.useEffect(() => {
		if (!services.hasOwnProperty('entities')) {
			fetchServices();
		}
	}, [services, fetchServices]);

	const formValues = {
		name: '',
		services: {},
	};

	const applicationCreationRequest = async (payload) => api.post('applications', payload);

	const mutation = useMutation(applicationCreationRequest, {
		onSuccess: async () => {
			history.push(`${path}/success`);
		},
	});

	const handleFormSubmit = (values) => {
		const { name: label, services } = values;
		const payload = {
			label,
			services: transformServices(services),
		};

		mutation.mutate(payload);
	};

	return (
		<>
			<div className="px-16 md:px-24">
				<div className="row">
					<div className="mt-3 ">
						<Breadcrumb items={crumbs} />
					</div>
				</div>
			</div>
			<Formik initialValues={formValues} onSubmit={handleFormSubmit}>
				{({ handleSubmit }) => (
					<Suspense fallback={<Loading />}>
						<Switch>
							<Route path="/dashboard/applications/create/success" exact component={AppCreationSuccess} />
							<form onSubmit={handleSubmit}>
								<RenderRoutes routes={routes} />
							</form>
							<Route component={NotFound} />
							<Redirect to="/dashboard" />
						</Switch>
					</Suspense>
				)}
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
