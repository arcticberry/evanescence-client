import React from 'react';
import cx from 'classnames';

import styles from './Badge.module.css';

const Badge = ({ status, size, children, className, ...props }) => {
	return (
		<span
			className={cx([styles.Badge, styles[`Badge--${size}`], styles[`Badge--${status}`], className])}
			{...props}
		>
			{children}
		</span>
	);
};

Badge.defaultProps = {
	size: 'medium',
	status: 'info',
};

export default Badge;
