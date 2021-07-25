import React from 'react'

import {InputGroup, Input} from '@zendeskgarden/react-forms'
import Button from 'components/Button'

const Password = (props) => {
  const [isPasswordVisible, setPasswordVisibility] = React.useState(false)

  const togglePasswordVisibility = () =>
    setPasswordVisibility(!isPasswordVisible)

  return (
    <>
      <InputGroup>
        <Input {...props} type={isPasswordVisible ? 'text' : 'password'} />
        {props?.value?.length ? (
          <Button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Button>
        ) : null}
      </InputGroup>
    </>
  )
}

Password.propTypes = {}

export default Password
