import React, {Suspense} from 'react'
import {Switch} from 'react-router-dom'

import r from 'constants/routes'

import Loading from 'components/LoadingState'
import {RenderRoutes} from 'components/AppRouter'
import LoadingState from 'components/LoadingState'
import ErrorLoading from 'components/ErrorLoading'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'

import '../../applications.css'

const routes = [r.APPLICATION_OVERVIEW, r.APPLICATION_SETTINGS]

const ViewApplication = ({match}) => {
  const {id} = match.params
  const {isLoading: isLoadingApplication, isError} = useApplicationsQuery(id)

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
      <Suspense fallback={<Loading />}>
        <Switch>
          <RenderRoutes routes={routes} />
        </Switch>
      </Suspense>
    </>
  )
}

export default AuthenticatedHoc(ViewApplication)
