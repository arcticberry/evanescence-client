import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as ErrorOccurredIllustration } from 'assets/error-occurred.svg';

import Button from 'components/Button';
import EmptyState from 'components/EmptyState';
// import LoadingState from 'components/LoadingState';
import CalloutCard from 'components/Card/CalloutCard';
import Table from 'components/Table';

import AuthenticatedHoc from 'HOC/WithAuthenticated';
// import useApplications from 'hooks/useApplications';
import useParamSearch from 'hooks/useParamSearch';

import makeData from 'utils/makeData';
import tableSchema from './tableSchema';
import { setSelectedApplication } from 'services/application/application.slice';
import '../../applications.css';

export const ErrorLoading = ({ title = 'Something unexpected happened', message }) => {
	return (
		<EmptyState artwork={<ErrorOccurredIllustration />} title={title} message={message}>
			<Link to="/dashboard/applications" className="btn btn-primary btn-md font-weight-bold px-4">
				Retry
				<i className="ml-1 mdi mdi-reload" />
			</Link>
		</EmptyState>
	);
};

const ViewApplication = () => {
	// const { isLoading: loadingApplications, error } = useApplications();
	const [getPageParamValue, setPageParamValue] = useParamSearch('page');
	const [getPageSizeParamValue, setPageSizeParamValue] = useParamSearch('pageSize');

	// if (loadingApplications)
	// 	return (
	// 		<div className="w-full h-full flex items-center justify-center">
	// 			<LoadingState />
	// 		</div>
	// 	);

	// if (error) return <ErrorLoading title="Oops..." message="Something unexpected happened. Please retry." />;
	const pageParamValue = getPageParamValue();
	const pageSizeParamValue = getPageSizeParamValue();

	const defaultTableOptions = {
		...(pageParamValue && { defaultPageIndex: Number(pageParamValue - 1) }),
		...(pageSizeParamValue && { defaultPageSize: Number(pageSizeParamValue) }),
	};

	const data = React.useMemo(() => makeData(100), []);

	return (
		<>
			<CalloutCard variant="mu">
				<div className="px-4 md:px-24 pb-8 flex flex-col md:flex-row items-center justify-between text-gray-100">
					<span className="mb-2">You can switch between your apps easily</span>
					<Link to="/dashboard/applications">
						<Button>Switch application</Button>
					</Link>
				</div>
			</CalloutCard>
			<div className="py-12 px-4 lg:px-16">
				<section className="">
					<h1 className="text-xl mb-3">Recent transactions</h1>
					<p className="text-md text-gray-400">A short breakdown of all records for this app</p>
				</section>
			</div>
			<div className="mx-auto lg:px-16">
				<Table
					columns={tableSchema()}
					data={data}
					onPageNavigation={setPageParamValue}
					onPageSizeUpdate={setPageSizeParamValue}
					{...defaultTableOptions}
				/>
			</div>
		</>
	);
};
const mapStateToProps = ({ application: { selectedApplication } }) => ({
	selectedApplication,
});

const mapDispatchToProps = { setSelectedApplication };
export default AuthenticatedHoc(connect(mapStateToProps, mapDispatchToProps)(ViewApplication));
