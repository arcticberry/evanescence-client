import React from 'react';
import { Field } from 'formik';

import { InputGroup, Input } from '@zendeskgarden/react-forms';

const InputComponent = ({ name, ...props }) => {
	return (
		<Field name={name}>
			{({ field }) => (
				<InputGroup>
					<Input {...field} {...props} />
				</InputGroup>
			)}
		</Field>
	);
};

InputComponent.propTypes = {};
InputComponent.defaultProps = {
	type: 'text',
};

export default InputComponent;
