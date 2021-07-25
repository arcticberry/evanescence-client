import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Formik} from 'formik'

import Button from 'components/Button'
import CalloutCard from 'components/Card/CalloutCard'
import ManageCredentials from './components/ManageCredentials/ManageCredentials'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import {useDashboard} from 'hooks/useDashboard'
import useUpdateApplicationCredentialsMutation from 'hooks/queries/useUpdateApplicationCredentialsMutation'

import '../../applications.css'

const initialCredentialsForm = {
  dirty: false,
}

const ViewApplication = ({match}) => {
  const [
    doUpdateApplicationCredentials,
    applicationCredentialsUpdateState,
  ] = useUpdateApplicationCredentialsMutation(match.params.id)

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
      <section className="h-32">
        <CalloutCard variant="mu">
          <div className="px-4 md:px-16 lg:px-24 pb-8 flex flex-col md:flex-row items-center justify-between text-gray-100">
            <span className="mb-2">
              You can switch between your apps easily
            </span>
            <Link to="/dashboard/applications">
              <Button>Switch application</Button>
            </Link>
          </div>
        </CalloutCard>
      </section>

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
  connect(mapStateToProps, mapDispatchToProps)(ViewApplication),
)
