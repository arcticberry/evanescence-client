import React from 'react';
import { Form, Formik } from 'formik';
import { Spinner } from '@zendeskgarden/react-loaders';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { Input } from 'components/Form';

import usePasswordResetLink from 'hooks/usePasswordResetLink';

const ResetPasswordLinkForm = ({ onSuccess }) => {
	const defaults = {
		email: '',
	};

	const [generatePasswordResetLink, passwordResetLinkState] = usePasswordResetLink();

	React.useEffect(() => {
		if (passwordResetLinkState.isError) {
			toast.error(passwordResetLinkState.error.response.data.message);
		} else if (passwordResetLinkState.isSuccess) {
			onSuccess();
		}
	}, [passwordResetLinkState.isError, passwordResetLinkState.isSuccess, passwordResetLinkState.error, onSuccess]);

	return (
		<Formik initialValues={defaults} onSubmit={generatePasswordResetLink}>
			<Form action="/">
				<div className="mb-8">
					<Input label="Email" name={'email'} type="email" required />
				</div>

				<div className="my-8">
					<Button isStretched variant="primary" type="submit">
						{passwordResetLinkState.isLoading ? <Spinner delayMS={0} size={32} /> : 'Generate reset link'}
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default ResetPasswordLinkForm;
