import React from 'react'
import {Field} from 'formik'

import {InputGroup, Input as ZendeskInput} from '@zendeskgarden/react-forms'
import Label from 'components/Form/Label'

const Input = ({name, label, ...props}) => {
  return (
    <>
      {label ? <Label label={label} name={name} /> : null}
      <Field name={name}>
        {({field}) => (
          <InputGroup>
            <ZendeskInput {...field} id={name} {...props} />
          </InputGroup>
        )}
      </Field>
    </>
  )
}

Input.propTypes = {}
Input.defaultProps = {
  type: 'text',
}

export default Input
