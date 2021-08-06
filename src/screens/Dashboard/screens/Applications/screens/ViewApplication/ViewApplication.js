import React, {useEffect, useState, Suspense} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import r from 'constants/routes'

import Loading from 'components/LoadingState'
import {RenderRoutes} from 'components/AppRouter'
import LoadingState from 'components/LoadingState'
import ApplicationCallout from './components/ApplicationCallout'
import ErrorLoading from 'components/ErrorLoading'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'

import {setSelectedApplication} from 'services/application/application.slice'
import '../../applications.css'

const routes = [r.APPLICATION_OVERVIEW]

const ViewApplication = ({match}) => {
  const [, setApplicationLive] = useState(false)
  const {isLoading: isLoadingApplication, isError, data} = useApplicationsQuery(
    match.params.id,
  )

  // Declare application mutation update and handle state changes
  const [, applicationUpdateState] = useUpdateApplicationMutation(
    match.params.id,
  )
  useMutationNotifications({
    ...applicationUpdateState,
    entity: 'application',
    actionType: 'update',
  })

  const [, setDashboardState] = useDashboard()

  useEffect(() => {
    setDashboardState({
      isUpdatingApplication: applicationUpdateState.isLoading,
    })
  }, [applicationUpdateState.isLoading, setDashboardState])

  useEffect(() => {
    setDashboardState({
      successFullyUpdatedApplication: applicationUpdateState.isSuccess,
    })
  }, [applicationUpdateState.isSuccess, setDashboardState])

  useEffect(() => {
    if (data) {
      setApplicationLive(data.payload.isLive)
    }
  }, [data])

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

  return (
    <>
      <section className="h-32">
        <ApplicationCallout application={data.payload} />
      </section>

      <Suspense fallback={<Loading />}>
        <>
          <RenderRoutes routes={routes} />
          <Redirect
            to={r.APPLICATION_OVERVIEW.path.replace(/:id/, match.params.id)}
          />
        </>
      </Suspense>
    </>
  )
}
const mapStateToProps = ({application: {selectedApplication}}) => ({
  selectedApplication,
})

const mapDispatchToProps = {setSelectedApplication}
export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(ViewApplication),
)
