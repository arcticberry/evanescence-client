import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { Spinner } from '@zendeskgarden/react-loaders';

import Button from 'components/Button';
import Logo from 'components/Logo/Logo';
import { PasswordInput, Input } from 'components/Form';
import useLoginMutation from 'hooks/queries/useLoginMutation';

const Login = ({ history }) => {
	const loginDetails = {
		email: '',
		password: '',
	};

	const [doLogin, loginState] = useLoginMutation();

	React.useEffect(() => {
		if (loginState.isError) {
			toast.error(loginState.error.response.data.message);
		} else if (loginState.isSuccess) {
			history.push('/dashboard');
		}
	}, [loginState.isError, loginState.isSuccess, loginState.error, history]);

	return (
		<div className="grid md:grid-cols-2">
			<section
				className="hidden md:block md:h-screen"
				style={{ backgroundImage: 'url(/img/account-page-bg.png)' }}
			></section>

			<section className="md:h-screen flex flex-col justify-center py-16 px-8 md:px-16 lg:px-48">
				<a href="/" className="w-48">
					<Logo variant="primary" />
				</a>
				<div>
					<h1 className="text-3xl py-16 font-light">Log In</h1>
					<Formik initialValues={loginDetails} onSubmit={doLogin}>
						<Form action="/">
							<div className="mb-8">
								<Input label="Email" name={'email'} type="email" required />
							</div>

							<div>
								<section className="mb-4">
									<label className="text-gray-500">Password</label>
									<a href="/password/reset" className="float-right font-bold text-brand-primary">
										<small>Forgot your password?</small>
									</a>
								</section>

								<PasswordInput name="password" required />
							</div>

							<div className="my-8">
								<Button isStretched variant="primary" type="submit">
									{loginState.isLoading ? <Spinner delayMS={0} size={32} /> : 'Log In'}
								</Button>
							</div>
						</Form>
					</Formik>
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

export default Login;
