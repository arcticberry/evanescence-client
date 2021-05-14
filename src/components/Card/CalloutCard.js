import React from 'react';
import styles from './Card.module.css';
import cx from 'classnames';
import { StarHalf } from '@material-ui/icons';

const CalloutCard = ({ title, message, children, variant }) => {
	const containerClasses = [
		styles['Card'],
		styles['Card--Callout'],
		styles[`Card--Callout--${variant}`],
	]

	return (
		<section className={cx(containerClasses)}>
			<div className="w-24 h-24 flex items-center justify-center rounded-full border-white border-opacity-50 border-2">
				<StarHalf size="md" fontSize="large" htmlColor="#fff" />
			</div>
			<article className="mb-4 items-center justify-center">
				<h3 className="text-3xl text-gray-200 text-center my-4">{title}</h3>
				<p className="text-gray-200 text-center">{message}</p>
			</article>
			{children}
		</section>
	);
};

CalloutCard.defaultProps = {
	variant: 'alpha'
}

export default CalloutCard;
