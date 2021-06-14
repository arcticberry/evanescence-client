import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProfile} from 'services/profile/profile.slice'

import r from 'constants/routes'
import {getStoredAuthToken} from 'utils/authToken'

const AuthenticatedHoc = (Component) => {
  function Authenticated(props) {
    const token = getStoredAuthToken()

    return token ? <Component {...props} /> : <Redirect to={r.LOGIN.path} />
  }

  const mapDispatchToProps = {fetchProfile}
  const mapStateToProps = (state) => ({
    profile: state.profile,
    ...state,
  })

  return connect(mapStateToProps, mapDispatchToProps)(Authenticated)
}

export default AuthenticatedHoc
