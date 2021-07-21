import React from 'react'
import {Redirect} from 'react-router-dom'

import r from 'constants/routes'
import {getStoredAuthToken} from 'utils/authToken'

const token = getStoredAuthToken()

const Authenticated = (Component) => (props) => {
  return token ? <Component {...props} /> : <Redirect to={r.LOGIN.path} />
}

const AuthenticatedHoc = (Component) => {
  return Authenticated(Component)
}

export default AuthenticatedHoc
