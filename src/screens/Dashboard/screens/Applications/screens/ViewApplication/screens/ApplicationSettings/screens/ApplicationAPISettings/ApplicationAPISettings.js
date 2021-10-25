import React from 'react'
import {Formik} from 'formik'

import ManageWebhooks from './components/ManageWebhooks/ManageWebhooks'
import ManageAppAvatar from './components/ManageAppAvatar/ManageAppAvatar'
import LoadingState from 'components/LoadingState'
import ErrorLoading from 'components/ErrorLoading'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'

const initialFormValues = {
  dirty: false,
  url: '',
}

const ApplicationAPISettings = ({match}) => {
  const {
    isLoading: isLoadingApplication,
    isError,
    data: application,
  } = useApplicationsQuery(match.params.id)

  const [
    doUpdateApplicationWebhook,
    applicationWebhookUpdateState,
  ] = useUpdateApplicationMutation(match.params.id + '/webhook', 'put')
  useMutationNotifications({
    ...applicationWebhookUpdateState,
    entity: 'application webhook',
    actionType: 'update',
  })

  const [, setDashboardState] = useDashboard()

  React.useEffect(() => {
    setDashboardState({
      isUpdatingApplicationWebhook: applicationWebhookUpdateState.isLoading,
    })
  }, [applicationWebhookUpdateState.isLoading, setDashboardState])

  React.useEffect(() => {
    setDashboardState({
      successFullyUpdatedApplicationWebhook:
        applicationWebhookUpdateState.isSuccess,
    })
  }, [applicationWebhookUpdateState.isSuccess, setDashboardState])

  if (isLoadingApplication)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )

  if (isError)
    return (
      <ErrorLoading
        title="Oops..."
        message="Something unexpected happened. Please retry."
      />
    )

  const handleWebhookFormSubmit = ({url}) => {
    doUpdateApplicationWebhook({url})
  }

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleWebhookFormSubmit}
      >
        {({handleSubmit, handleReset}) => (
          <form onSubmit={handleSubmit}>
            <ManageWebhooks
              url={application.payload.webhook.url}
              handleReset={handleReset}
            />
            <ManageAppAvatar url={application.payload.webhook.url} />
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthenticatedHoc(ApplicationAPISettings)
