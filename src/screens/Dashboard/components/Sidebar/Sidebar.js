import * as React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {LogoHaloed} from 'components/Logo/Logo'
import styles from './sidebar.module.css'
import {PowerSettingsNew as LogoutIcon} from '@material-ui/icons'

const Sidebar = ({
  items,
  currentItemPath,
  isExpanded,
  isVisible,
  onLogout,
  onToggleMenu,
}) => {
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
        <a
          href={'/dashboard'}
          className={classNames(styles.sidebar__item, [
            styles['sidebar__item--hasLogo'],
          ])}
        >
          <span className="w-8">
            <LogoHaloed collapsed color={'#fff'} />
            <span className={'sr-only'}>PayReflect</span>
          </span>
        </a>
        {Object.entries(items).map(([groupTitle, subItems]) => (
          <div className="mb-6" key={groupTitle}>
            <h5 className={classNames(styles.sidebar__heading)}>
              {groupTitle}
            </h5>
            {subItems.map(
              ({path, label, isCurrent, icon: Icon, ...otherOptions}) => {
                let transformedPath =
                  typeof path === 'string' ? path : path(otherOptions)
                return (
                  <Link
                    key={transformedPath}
                    to={transformedPath}
                    className={classNames(styles.sidebar__item, {
                      [styles['sidebar__item--isCurrent']]:
                        currentItemPath === path,
                    })}
                  >
                    <Icon className={classNames(styles.sidebar__item__icon)} />
                    <span className={styles.sidebar__item__text}>{label}</span>
                  </Link>
                )
              },
            )}
          </div>
        ))}

        <button
          className={classNames([styles.sidebar__item, 'mt-auto'])}
          onClick={onLogout}
        >
          <LogoutIcon className={classNames(styles.sidebar__item__icon)} />
          <span className={styles.sidebar__item__text}>Logout</span>
        </button>
      </nav>
    </>
  )
}

Sidebar.defaultProps = {
  expanded: true,
  isVisible: true,
}

export default Sidebar
