import React from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';
import EmptyState from 'components/EmptyState';
import { ReactComponent as NotFoundIllustration } from 'assets/gone-missing.svg';

const NotFound = () => {
	return (
		<EmptyState artwork={<NotFoundIllustration />} title="404" message="This page does not exist">
			<Link to="/dashboard" className="btn btn-primary btn-md font-weight-bold px-4">
				Go back to dashboard
			</Link>
		</EmptyState>
	);
	// return (
	//   <div className="account-pages mt-5 mb-5">
	//     <div className="container">
	//       <div className="row justify-content-center">
	//         <div>
	//           <h1 className="banner-title">404</h1>
	//           <p className="lead text-center">Not found</p>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	// );
};

export default NotFound;
