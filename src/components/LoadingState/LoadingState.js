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

const LoadingState = ({variant}) => {
  const variants = {
    bounce: BouncingLoader,
    ripple: RippleLoader,
  }

  const LoaderAnimation = variants[variant]

  return <section className={styles.container}>{<LoaderAnimation />}</section>
}

LoadingState.propTypes = {}

LoadingState.defaultProps = {
  variant: 'ripple',
}

export default LoadingState
