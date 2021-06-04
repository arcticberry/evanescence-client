import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as ResetPasswordIllustration } from 'assets/reset-password.svg';
import Button from 'components/Button';
import Logo from 'components/Logo/Logo';
import EmptyState from 'components/EmptyState';

import PasswordUpdateForm from './components/PasswordUpdateForm';
import ResetPasswordLinkForm from './components/ResetPasswordLinkForm';

import useParamSearch from 'hooks/useParamSearch';

const PasswordReset = ({ history, match }) => {
	const { token } = match.params;

	const [getRequestedResetValue] = useParamSearch('requestedReset');
	const requestedReset = getRequestedResetValue();

	if (requestedReset)
		return (
			<EmptyState
				artwork={<ResetPasswordIllustration />}
				title="Password reset link sent"
				message="We just sent a reset link to your inbox."
			>
				<Link to="/login">
					<Button>Back to login</Button>
				</Link>
			</EmptyState>
		);

	return (
		<div className="grid md:grid-cols-2">
			<section
				className="hidden md:block md:h-screen"
				style={{ backgroundImage: 'url(/img/account-page-bg.png)' }}
			></section>

			<section className="md:h-screen flex flex-col justify-center py-16 px-8 md:px-16 lg:px-48">
				<a href="/" className="w-32 md:w-48">
					<Logo variant="primary" />
				</a>
				<div>
					<h1 className="text-3xl py-16 font-light">Reset Password</h1>
					{token ? (
						<PasswordUpdateForm token={token} />
					) : (
						<>
							<ResetPasswordLinkForm onSuccess={() => history.push('/password/reset?requestedReset=1')} />
							<div className="col-12 text-center">
								<p className="text-muted text-left">
									Don't have an account?{' '}
									<Link to="/register" className="text-brand-primary ml-1">
										<b>Sign Up</b>
									</Link>
								</p>
							</div>
						</>
					)}
				</div>
			</section>
		</div>
	);
};

export default PasswordReset;
