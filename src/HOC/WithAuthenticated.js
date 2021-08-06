import React from 'react'
import {Redirect} from 'react-router-dom'

import r from 'constants/routes'
import {getStoredAuthToken} from 'utils/authToken'

const token = getStoredAuthToken()

const Authenticated = (Component, opts) => (props) => {
  return token || opts.fake ? (
    <Component {...props} />
  ) : (
    <Redirect to={r.LOGIN.path} />
  )
}

const AuthenticatedHoc = (Component) => {
  const opts = {fake: true}

  return Authenticated(Component, opts)
}

export default AuthenticatedHoc
