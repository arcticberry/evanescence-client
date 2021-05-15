import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import { StarHalf } from '@material-ui/icons';

import AuthenticatedHoc from 'HOC/WithAuthenticated';
import Button from 'components/Button';
import EmptyState from 'components/EmptyState';
import LoadingState from 'components/LoadingState';

import { ReactComponent as CreateApplicationIllustration } from 'assets/create-application.svg';
import { ReactComponent as ErrorOccurredIllustration } from 'assets/error-occurred.svg';
import { toggleApplicationStatus } from 'services/application/application.slice';
import api from 'services/api';

import './applications.css';
import CalloutCard, { variants } from 'components/Card/CalloutCard';

const ErrorLoading = ({ title = 'Something unexpected happened', message }) => {
	return (
		<EmptyState artwork={<ErrorOccurredIllustration />} title={title} message={message}>
			<Link to="/dashboard/applications" className="btn btn-primary btn-md font-weight-bold px-4">
				Retry
				<i className="ml-1 mdi mdi-reload" />
			</Link>
		</EmptyState>
	);
};

const Applications = () => {
	const { isLoading: loadingApplications, error, data } = useQuery('applications', () => api.getAll('applications'));

	if (loadingApplications)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<LoadingState />
			</div>
		);

	if (error) return <ErrorLoading title="Oops..." message="Something unexpected happened. Please retry." />;

	const applications = data.results;

	return applications.length ? (
		<>
			<CalloutCard variant="mu">
				<div className="py-8 text-gray-100">You have {applications.length} active applications</div>
			</CalloutCard>
			<div className="container mt-5">
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
					{applications.map((application, idx) => {
						let variant = variants[idx % variants.length];
						return (
							<section className="mb-8 shadow-lg h-3/4" key={idx}>
								<CalloutCard
									icon={<StarHalf size="md" fontSize="large" htmlColor="#fff" />}
									variant={variant}
									title={application.label}
								/>
								<div className="w-full bg-white py-4 text-center">
									<Button>
										<b>Manage Application</b>
									</Button>
								</div>
							</section>
						);
					})}
				</section>
			</div>
		</>
	) : (
		<section className="w-full h-full">
			<EmptyState
				artwork={<CreateApplicationIllustration />}
				title="Start with your first app."
				message="Apps allow you to gain total control of all of Payreflect’s goodies."
			>
				<Link to="/dashboard/applications/create">
					<Button variant="primary">
						<span className="font-semibold">
							Create first application
							<i className="mdi mdi-chevron-right" />
						</span>
					</Button>
				</Link>
			</EmptyState>
		</section>
	);
};
const mapStateToProps = () => ({});

const mapDispatchToProps = { toggleApplicationStatus };
export default AuthenticatedHoc(connect(mapStateToProps, mapDispatchToProps)(Applications));
