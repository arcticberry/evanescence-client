import React from 'react';
import styles from './LoadingState.module.scss';

const LoadingState = () => {
	return (
		<section className={styles.container}>
			<section className={styles.ripple}>
				<div />
				<div />
			</section>
		</section>
	);
};

export default LoadingState;
