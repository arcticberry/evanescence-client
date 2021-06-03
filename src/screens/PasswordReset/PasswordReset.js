import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { Spinner } from '@zendeskgarden/react-loaders';

import { ReactComponent as ResetPasswordIllustration } from 'assets/reset-password.svg';
import Button from 'components/Button';
import Logo from 'components/Logo/Logo';
import { Input } from 'components/Form';
import EmptyState from 'components/EmptyState';

import PasswordUpdateForm from './components/PasswordUpdateForm';

import usePasswordResetLink from 'hooks/usePasswordResetLink';

import useParamSearch from 'hooks/useParamSearch';

const ResetLinkForm = ({ onSubmit, loading }) => {
	const defaults = {
		email: '',
	};

	return (
		<Formik initialValues={defaults} onSubmit={onSubmit}>
			<Form action="/">
				<div className="mb-8">
					<Input label="Email" name={'email'} type="email" required />
				</div>

				<div className="my-8">
					<Button isStretched variant="primary" type="submit">
						{loading ? <Spinner delayMS={0} size={32} /> : 'Generate reset link'}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

const PasswordReset = ({ history, match }) => {
	const { token } = match.params;

	const [generatePasswordResetLink, passwordResetLinkState] = usePasswordResetLink();

	const [getRequestedResetValue] = useParamSearch('requestedReset');
	const requestedReset = getRequestedResetValue();

	React.useEffect(() => {
		if (passwordResetLinkState.isError) {
			toast.error(passwordResetLinkState.error.response.data.message);
		} else if (passwordResetLinkState.isSuccess) {
			history.push('/password/reset?requestedReset=1');
		}
	}, [passwordResetLinkState.isError, passwordResetLinkState.isSuccess, passwordResetLinkState.error, history]);

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
					{token ? <PasswordUpdateForm /> : <ResetLinkForm />}
					<div className="col-12 text-center">
						<p className="text-muted text-left">
							Don't have an account?{' '}
							<Link to="/register" className="text-brand-primary ml-1">
								<b>Sign Up</b>
							</Link>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PasswordReset;
