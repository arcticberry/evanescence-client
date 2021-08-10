import React from 'react'
import {Formik} from 'formik'

import ManageWebhooks from './components/ManageWebhooks/ManageWebhooks'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useUpdateApplicationCredentialsMutation from 'hooks/queries/useUpdateApplicationCredentialsMutation'

const initialFormValues = {
  dirty: false,
  url: ''
}

const ApplicationNotifications = ({match}) => {
  const [
    ,
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

  return (
    <>
      <Formik initialValues={initialFormValues}>
        {({handleSubmit, handleReset}) => (
          <form onSubmit={handleSubmit}>
            <ManageWebhooks
              applicationId={match.params.id}
              handleReset={handleReset}
            />
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthenticatedHoc(ApplicationNotifications)
