import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

import { Button as GardenButton } from '@zendeskgarden/react-buttons';

const Button = ({ variant, size, children, className, ...props }) => {
	if (variant)
		return (
			<GardenButton isPrimary={variant === 'primary'} size={size} {...props} className={className}>
				{children}
			</GardenButton>
		);

	return (
		<button
			className={cx([styles.Button, styles[`Button--${size}`], styles['Button--Basic'], className])}
			{...props}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	size: 'medium',
	className: '',
};

export default Button;
