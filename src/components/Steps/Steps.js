import React from 'react';
import { Link } from 'react-router-dom';
import { Done } from '@material-ui/icons';

import styles from './Steps.module.scss';

import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function Steps({ steps }) {
	let activeStepIdx = steps.length;

	return (
		<div className={styles.Steps__Wrapper}>
			<ol className={styles.Steps}>
				{steps.map(({ label, href, active }, idx) => {
					if (active) {
						activeStepIdx = idx;
					}

					const isStepCompleted = activeStepIdx > idx;
					const isLastStep = idx === steps.length - 1;

					let stepClasses = cx({
						Step: true,
						Step__Last: isLastStep,
						Step__Current: active,
						Step__Completed: isStepCompleted,
					});

					return (
						<li className={stepClasses} key={idx}>
							<div className={styles.Step__Milestone}>
								<Done fontSize="small" />
							</div>
							{active ? (
								<span className={styles.Step__Label}>{label}</span>
							) : (
								<Link to={href} className={styles.Step__Label}>
									{label}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
}

Steps.defaultProps = {
	steps: [],
};

export default Steps;
