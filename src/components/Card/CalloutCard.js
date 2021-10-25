import React from 'react'
import styles from './Card.module.css'
import cx from 'classnames'

import {getRandomInt} from 'utils/index'

export const variants = ['alpha', 'beta', 'gamma', 'mu', 'phi']

const defaultProps = {
  renderCenter: () => {},
  renderBelow: () => {},
}

const CalloutCard = ({
  title,
  message,
  icon,
  children,
  variant,
  renderCenter,
  renderBelow,
  ...props
}) => {
  variant = variant ? variant : variants[getRandomInt(0, variants.length)]

  const containerClasses = [
    styles['Card'],
    styles['Card--Callout'],
    styles[`Card--Callout--${variant}`],
  ]

  return (
    <section className={cx(containerClasses)} {...props}>
      <section className={cx(styles.Card__inner)}>
        {icon ? (
          <div className={styles['Card--Callout__icon']}>{icon}</div>
        ) : null}
        {title || message ? (
          <article className="items-center justify-center">
            {title ? (
              <h3 className={styles['Card--Callout__title']}>{title}</h3>
            ) : null}
            {message ? (
              <p className="text-gray-200 text-center">{message}</p>
            ) : null}
          </article>
        ) : null}
        {renderCenter()}
      </section>
      {renderBelow()}
      {children}
    </section>
  )
}

CalloutCard.defaultProps = defaultProps

export default CalloutCard
