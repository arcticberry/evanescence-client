import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile } from '../services/profile/profile.slice';

const AuthenticatedHoc = (Component) => {
	class Authenticated extends React.Component {
		componentDidMount() {
			if (localStorage.getItem('token')) {
				if (Object.entries(this.props.profile.profile).length === 0) {
					// this.props.fetchProfile();
				}
			} else {
				// window.location.assign('/login');
			}
		}

		render() {
			const isAuthenticated = true;

			if (this.props.profile.isFetching) {
				return (
					<div id="preloader">
						<div id="status">
							<div className="bouncing-loader">
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				);
			}
			return <div>{!isAuthenticated ? <Redirect to="/" /> : <Component {...this.props} />}</div>;
		}
	}

	const mapDispatchToProps = { fetchProfile };
	const mapStateToProps = (state) => ({
		profile: state.profile,
		...state,
	});
	return connect(mapStateToProps, mapDispatchToProps)(Authenticated);
};

export default AuthenticatedHoc;
