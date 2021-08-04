import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {StarHalf} from '@material-ui/icons'

import useApplications from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'
import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import Button from 'components/Button'
import EmptyState from 'components/EmptyState'
import ErrorLoading from 'components/ErrorLoading'
import CalloutCard from 'components/Card/CalloutCard'
import ApplicationsLoader from './components/ApplicationsLoader'
import {setSelectedApplication} from 'services/application/application.slice'

import {ReactComponent as CreateApplicationIllustration} from 'assets/create-application.svg'

import './applications.css'
import Badge from 'components/Badge'

const NoApplicationsFound = () => (
  <section className="w-full h-full">
    <EmptyState
      artwork={<CreateApplicationIllustration />}
      title="Start with your first app."
      message="Apps allow you to gain total control of your integrations"
    >
      <Link to="/dashboard/applications/create">
        <Button variant="primary">
          <span className="font-semibold">
            Create first application
            <i className="mdi mdi-chevron-right" />
          </span>
        </Button>
      </Link>
    </EmptyState>
  </section>
)

const Applications = () => {
  const [appId, setAppId] = useState(null)
  const {
    isLoading: loadingApplications,
    error,
    data: applications,
  } = useApplications()
  const [dashboard, setDashboardState] = useDashboard()
  const [
    doUpdateApplication,
    applicationUpdateState,
  ] = useUpdateApplicationMutation('default')
  useMutationNotifications({
    ...applicationUpdateState,
    entity: 'application',
    actionType: 'update',
  })

  useEffect(() => {
    if (appId && applicationUpdateState.isSuccess) {
      setDashboardState({defaultApp: appId})
    }
  }, [appId, applicationUpdateState.isSuccess, setDashboardState])

  if (loadingApplications) return <ApplicationsLoader />

  if (error)
    return (
      <ErrorLoading
        title="Oops..."
        message="Something unexpected happened. Please retry."
      />
    )

  return applications.length ? (
    <>
      <CalloutCard variant="phi">
        <div className="px-8 md:px-24 pb-8 flex items-center justify-between text-gray-100">
          <span>
            {applications.length}{' '}
            {applications.length > 1 ? 'applications' : 'application'}
          </span>
          <Link to="/dashboard/applications/create">
            <Button>Create application</Button>
          </Link>
        </div>
      </CalloutCard>
      <div className="container mt-5">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {applications.map((application, idx) => {
            const isDefaultApp = dashboard.defaultApp === application.id
            const onMakeDefaultApp = () => {
              setAppId(application.id)
              doUpdateApplication({
                appId: application.id,
              })
            }

            return (
              <section className="mb-8 shadow-xl h-3/4" key={idx}>
                <CalloutCard
                  variant="blanco"
                  icon={
                    <StarHalf size="md" fontSize="large" htmlColor="#496179" />
                  }
                  title={application.label}
                  renderCenter={() => (
                    <div className="absolute top-4 right-6">
                      {isDefaultApp ? (
                        <Badge variant="success">Default</Badge>
                      ) : (
                        <Button size="x-small" onClick={onMakeDefaultApp}>
                          Make default
                        </Button>
                      )}
                    </div>
                  )}
                  renderBelow={() => (
                    <div className="w-full bg-white py-4 text-center">
                      <Link to={`/dashboard/applications/${application.id}`}>
                        <Button>
                          <b>Manage application</b>
                        </Button>
                      </Link>
                    </div>
                  )}
                />
              </section>
            )
          })}
        </section>
      </div>
    </>
  ) : (
    <NoApplicationsFound />
  )
}
const mapStateToProps = ({application: {selectedApplication}}) => ({
  selectedApplication,
})

const mapDispatchToProps = {setSelectedApplication}
export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(Applications),
)
