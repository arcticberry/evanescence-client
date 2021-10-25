import React from 'react'
import {Field} from 'formik'

import {Label} from 'components/Form'
import Password from './Password'

const PasswordField = ({name, label, ...props}) => {
  return (
    <>
      {label ? <Label label={label} name={name} /> : null}

      <Field name={name}>
        {({field}) => <Password {...field} {...props} />}
      </Field>
    </>
  )
}

PasswordField.propTypes = {}

export default PasswordField
