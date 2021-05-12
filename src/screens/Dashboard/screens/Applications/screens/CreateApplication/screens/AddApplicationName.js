import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import Steps from 'components/Steps';
import { Button } from '@zendeskgarden/react-buttons';
import SectionTitle from 'components/SectionTitle';
import { Input } from 'components/Form';

import '../../../application.css';

const AddApplicationName = ({ crumbs }) => {
	return (
		<div className="app-creation-shell">
			<section className="mb-16">
				<SectionTitle title="It starts with a name." message="A simple name is always a nice start." />
			</section>

			<div className="flex w-full justify-around mb-16">
				<div className="mx-auto">
					<Steps steps={crumbs} />
				</div>
			</div>

			<div className="row py-2 flex justify-around items-center">
				<div className="lg:w-1/2 mt-4">
					<label className="flex items-center justify-between mb-2">
						<span className="text-gray-500">Application name</span>
						<button className="text-sm text-brand-primary">Generate magic name</button>
					</label>

					<Input name="applicationName" />
					<div className="py-6 flex justify-between">
						<Link
							to="/dashboard/applications"
							className="border-gray-200 border-2 py-2 px-8 text-brand-tertiary"
						>
							<ChevronLeft />
							Back
						</Link>
						<Link to="/dashboard/applications/create/pick-services">
							<Button isPrimary>
								<span className="font-bold">Pick services</span>
								<ChevronRight />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddApplicationName;
