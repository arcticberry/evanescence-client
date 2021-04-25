import React from 'react';
import { Field } from 'formik';

import { InputGroup, Input } from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';

const Password = ({ name, ...props }) => {
	const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

	const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);

	return (
		<Field name={name}>
			{({ field }) => (
				<InputGroup>
					<Input {...field} type={isPasswordVisible ? 'text' : 'password'} />
					{field.value.length ? (
						<Button onClick={togglePasswordVisibility}>{isPasswordVisible ? 'Hide' : 'Show'}</Button>
					) : null}
				</InputGroup>
			)}
		</Field>
	);
};

Password.propTypes = {};

export default Password;
