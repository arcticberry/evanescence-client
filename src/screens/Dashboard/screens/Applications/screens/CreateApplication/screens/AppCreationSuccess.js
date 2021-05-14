import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import '../../../application.css';
import Button from 'components/Button';

const AppCreationSuccess = () => {
	return (
		<div className="px-16 md:px-24 h-screen">
			<section className="mb-16 h-3/4">
				<Card.Callout title="Application Successfully Created" message="Your application has been created">
					<Link to="/dashboard/applications">
						<Button>View applications</Button>
					</Link>
				</Card.Callout>
			</section>
		</div>
	);
};

export default AppCreationSuccess;
