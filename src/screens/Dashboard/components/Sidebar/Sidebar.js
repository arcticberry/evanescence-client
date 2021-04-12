import * as React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { LogoHaloed } from "components/Logo";
import styles from "./sidebar.module.css";
import { Dashboard as DashboardIcon, Apps as AppsIcon, PowerSettingsNew as LogoutIcon } from "@material-ui/icons";

const Sidebar = ({ isExpanded = true }) => {
  return (
    <nav
      className={classNames([styles.sidebar, styles["sidebar--primary"]], {
        [styles["sidebar--expanded"]]: isExpanded,
      })}
    >
      <a
        href={"/"}
        className={classNames(styles.sidebar__item, [styles['sidebar__item--hasLogo']])}
      >
        <span className="w-8">
          <LogoHaloed collapsed color={"#fff"} />
          <span className={'sr-only'}>PayReflect</span>
        </span>
      </a>
      <Link
        to="/dashboard"
        className={classNames(styles.sidebar__item, {
          [styles["sidebar__item--isCurrent"]]: true,
        })}
      >
        <DashboardIcon className="mx-2" />
        <span className={styles.sidebar__item__text}>Dashboard</span>
      </Link>

      <Link
        to="/dashboard/transactions"
        className={classNames(styles.sidebar__item)}
      >
        <AppsIcon className="mx-2" />
        <span className={styles.sidebar__item__text}>My Apps</span>
      </Link>

      <button
        className={classNames([styles.sidebar__item, 'mt-auto'])}
      >
        <LogoutIcon className="mx-2" />
        <span className={styles.sidebar__item__text}>Logout</span>
      </button>
    </nav>
  );
};

export default Sidebar;
