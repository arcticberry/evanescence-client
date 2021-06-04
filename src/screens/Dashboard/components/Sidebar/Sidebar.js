import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LogoHaloed } from 'components/Logo/Logo';
import styles from './sidebar.module.css';
import { Dashboard as DashboardIcon, Apps as AppsIcon, PowerSettingsNew as LogoutIcon } from '@material-ui/icons';

const Sidebar = ({ isExpanded, isVisible, onLogout, onToggleMenu }) => {
	return (
		<>
			<div
				className={`${
					isVisible ? 'block' : 'hidden'
				} fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden `}
				onClick={onToggleMenu}
			/>
			<nav
				className={classNames([styles.sidebar, styles['sidebar--tertiary']], {
					[styles['sidebar--expanded']]: isExpanded,
					[styles['sidebar--hidden']]: !isVisible,
				})}
			>
				<a href={'/dashboard'} className={classNames(styles.sidebar__item, [styles['sidebar__item--hasLogo']])}>
					<span className="w-8">
						<LogoHaloed collapsed color={'#fff'} />
						<span className={'sr-only'}>PayReflect</span>
					</span>
				</a>
				<Link
					to="/dashboard"
					className={classNames(styles.sidebar__item, {
						[styles['sidebar__item--isCurrent']]: true,
					})}
				>
					<DashboardIcon className="mx-2 text-brand-primary" />
					<span className={styles.sidebar__item__text}>Overview</span>
				</Link>

				<Link to="/dashboard/applications" className={classNames(styles.sidebar__item)}>
					<AppsIcon className="mx-2 text-brand-primary" />
					<span className={styles.sidebar__item__text}>Apps</span>
				</Link>

				<button className={classNames([styles.sidebar__item, 'mt-auto'])} onClick={onLogout}>
					<LogoutIcon className="mx-2 text-brand-primary" />
					<span className={styles.sidebar__item__text}>Logout</span>
				</button>
			</nav>
		</>
	);
};

Sidebar.defaultProps = {
	expanded: true,
	isVisible: true,
};

export default Sidebar;
