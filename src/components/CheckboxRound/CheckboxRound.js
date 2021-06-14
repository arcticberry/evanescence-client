import React from 'react'
import styles from './CheckboxRound.module.scss'
import PropTypes from 'prop-types'

const CheckboxRound = (props) => {
  return (
    <div className={styles.CheckboxRound}>
      <input type="checkbox" {...props} />
      <label htmlFor={props.id}></label>
    </div>
  )
}

CheckboxRound.defaultProps = {}

CheckboxRound.propTypes = {
  id: PropTypes.string.isRequired,
}

export default CheckboxRound
