import React from 'react'
import styles from './Card.module.css'
import cx from 'classnames'

import {getRandomInt} from 'utils/index'

export const variants = ['alpha', 'beta', 'gamma']

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
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-white border-opacity-50 border-4">
            {icon}
          </div>
        ) : null}
        {title || message ? (
          <article className="items-center justify-center">
            {title ? (
              <h3 className="text-2xl text-gray-100 text-center my-4">
                {title}
              </h3>
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
