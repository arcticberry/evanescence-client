import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';

import AuthenticatedHoc from 'HOC/WithAuthenticated';
import EmptyState from 'components/EmptyState';
import LoadingState from 'components/LoadingState';
import { ReactComponent as CreateApplicationIllustration } from 'assets/create-application.svg';
import { ReactComponent as ErrorOccurredIllustration } from 'assets/error-occurred.svg';
import { toggleApplicationStatus } from 'services/application/application.slice';
import api from 'services/api';
import Button from 'components/Button';

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

const Applications = ({ fetchApplications, controlAppActivation }) => {
	const { isLoading: loadingApplications, error, data: applications } = useQuery('applications', () =>
		api.getAll('applications')
	);

	const toggleApplicationStatus = async ({ applicationId, isActive }) => {};

	if (loadingApplications)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<LoadingState />
			</div>
		);

	if (error) return <ErrorLoading title="Oops..." message="Something unexpected happened. Please retry." />;

	return applications.length ? (
		<div className="row mt-5">
			<div className="col-md-12">
				<div className="card">
					<div className="card-body">
						<div className="d-flex align-items-baseline justify-content-between">
							<div>
								<h4 className="header-title">Applications</h4>
								<p className="text-muted font-14">View All Applications Within The System</p>
							</div>
							<Link to="/account/create-application" className="float-right btn btn-primary wizard-btn">
								Create Application
							</Link>
						</div>
						<table className="table table-centered mb-0">
							<thead>
								<tr>
									<th>Name</th>
									<th>API Keys</th>
									<th>Active?</th>
								</tr>
							</thead>
							<tbody>
								{applications.map((application, index) => {
									return (
										<tr key={index}>
											<td>{application.label}</td>
											<td>{application.api_key.toUpperCase()}</td>
											<td>
												<div>
													<input
														type="checkbox"
														id={`switch${index}`}
														checked={application.is_active}
														onChange={(event) =>
															toggleApplicationStatus(event, application)
														}
														data-switch="success"
													/>
													<label
														htmlFor={`switch${index}`}
														data-on-label="Yes"
														data-off-label="No"
														className="mb-0 d-block"
													></label>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						)}
					</div>
				</div>
			</div>
		</div>
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
