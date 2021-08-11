import React from 'react'
import {connect} from 'react-redux'
import {Formik} from 'formik'

import ManageCredentials from './components/ManageCredentials/ManageCredentials'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useUpdateApplicationCredentialsMutation from 'hooks/queries/useUpdateApplicationCredentialsMutation'

const initialCredentialsForm = {
  dirty: false,
}

const ApplicationCredentials = ({match}) => {
  const [
    doUpdateApplicationCredentials,
    applicationCredentialsUpdateState,
  ] = useUpdateApplicationCredentialsMutation(match.params.id)
  useMutationNotifications({
    ...applicationCredentialsUpdateState,
    entity: 'application credentials',
    actionType: 'update',
  })

  const [, setDashboardState] = useDashboard()

  React.useEffect(() => {
    setDashboardState({
      isUpdatingApplicationCredentials:
        applicationCredentialsUpdateState.isLoading,
    })
  }, [applicationCredentialsUpdateState.isLoading, setDashboardState])

  React.useEffect(() => {
    setDashboardState({
      successFullyUpdatedApplicationCredentials:
        applicationCredentialsUpdateState.isSuccess,
    })
  }, [applicationCredentialsUpdateState.isSuccess, setDashboardState])

  const handleCredentialsFormSubmit = (values) => {
    const excludedFields = ['dirty']
    const isNotExcluded = (key) => !excludedFields.includes(key)

    const payloadReducer = (acc, curr) => {
      const currentValue = values[curr]
      const [provider, field] = curr.split('-')

      return {
        ...acc,
        [provider]: {
          ...acc[provider],
          ...(currentValue.length ? {[field]: currentValue} : {}),
        },
      }
    }

    const payload = Object.keys(values)
      .filter(isNotExcluded)
      .reduce(payloadReducer, {})

    doUpdateApplicationCredentials(payload)
  }

  return (
    <>
      <Formik
        initialValues={initialCredentialsForm}
        onSubmit={handleCredentialsFormSubmit}
      >
        {({handleSubmit, handleReset}) => (
          <form onSubmit={handleSubmit}>
            <ManageCredentials
              applicationId={match.params.id}
              handleReset={handleReset}
            />
          </form>
        )}
      </Formik>
    </>
  )
}
const mapStateToProps = () => ({})

const mapDispatchToProps = {}
export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(ApplicationCredentials),
)
