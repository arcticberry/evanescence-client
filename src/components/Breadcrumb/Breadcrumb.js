import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

function Breadcrumb({ items }) {
	return (
		<ol className="breadcrumb">
			{items.map(({ label, href, active }, idx) => {
				const activeClass = active ? 'active' : '';

				return (
					<li className={`${activeClass} ${styles.Breadcrumb__Item}`} key={idx}>
						{active ? (
							<button className={styles.Breadcrumb__Link_active}>{label}</button>
						) : (
							<Link to={href || ''} className={styles.Breadcrumb__Link}>
								{label}
							</Link>
						)}
					</li>
				);
			})}
		</ol>
	);
}

Breadcrumb.defaultProps = {
	items: [],
};

export default Breadcrumb;
