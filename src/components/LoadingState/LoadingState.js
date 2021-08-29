import React from 'react'
import styles from './LoadingState.module.scss'

const BouncingLoader = () => (
  <div id="preloader">
    <div id="status">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
)

const RippleLoader = () => (
  <section className={styles.ripple}>
    <div />
    <div />
  </section>
)

const RingLoader = () => (
  <section className={styles.ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>{' '}
  </section>
)

const LoadingState = ({variant, useContainer}) => {
  const variants = {
    bounce: BouncingLoader,
    ripple: RippleLoader,
    ring: RingLoader,
  }

  const LoaderAnimation = variants[variant]

  return (
    <section className={useContainer ? styles.container : ''}>
      {<LoaderAnimation />}
    </section>
  )
}

LoadingState.propTypes = {}

LoadingState.defaultProps = {
  variant: 'ripple',
  useContainer: true,
}

export default LoadingState
