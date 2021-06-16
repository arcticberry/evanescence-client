import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {StarHalf} from '@material-ui/icons'

import useApplications from 'hooks/queries/useApplicationsQuery'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import Button from 'components/Button'
import EmptyState from 'components/EmptyState'
import LoadingState from 'components/LoadingState'
import CalloutCard from 'components/Card/CalloutCard'
import {setSelectedApplication} from 'services/application/application.slice'

import {ReactComponent as CreateApplicationIllustration} from 'assets/create-application.svg'
import {ReactComponent as ErrorOccurredIllustration} from 'assets/error-occurred.svg'

import './applications.css'

const ErrorLoading = ({title = 'Something unexpected happened', message}) => {
  return (
    <EmptyState
      artwork={<ErrorOccurredIllustration />}
      title={title}
      message={message}
    >
      <Link
        to="/dashboard/applications"
        className="btn btn-primary btn-md font-weight-bold px-4"
      >
        Retry
        <i className="ml-1 mdi mdi-reload" />
      </Link>
    </EmptyState>
  )
}

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
  const {
    isLoading: loadingApplications,
    error,
    data: applications,
  } = useApplications()

  if (loadingApplications)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )

  if (error)
    return (
      <ErrorLoading
        title="Oops..."
        message="Something unexpected happened. Please retry."
      />
    )

  return applications.length ? (
    <>
      <CalloutCard variant="mu">
        <div className="px-8 md:px-24 pb-8 flex items-center justify-between text-gray-100">
          <span>{applications.length} applications</span>
          <Link to="/dashboard/applications/create">
            <Button>Create application</Button>
          </Link>
        </div>
      </CalloutCard>
      <div className="container mt-5">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {applications.map((application, idx) => {
            return (
              <section className="mb-8 shadow-xl h-3/4" key={idx}>
                <CalloutCard
                  variant="blanco"
                  icon={
                    <StarHalf size="md" fontSize="large" htmlColor="#496179" />
                  }
                  title={application.label}
                  renderBelow={() => (
                    <div className="w-full bg-white py-4 text-center">
                      <Link to={`/dashboard/applications/${application._id}`}>
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
