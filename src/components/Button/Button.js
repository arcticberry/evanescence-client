import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

import { Button as GardenButton } from '@zendeskgarden/react-buttons';

const Button = ({ variant, children, ...props }) => {
	if (variant)
		return (
			<GardenButton isPrimary={variant === 'primary'} {...props}>
				{children}
			</GardenButton>
		);

	return (
		<button className={cx([styles.Button, styles['Button--Basic']])} {...props}>
			{children}
		</button>
	);
};

export default Button;
