import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Formik} from 'formik'

import {ReactComponent as ErrorOccurredIllustration} from 'assets/error-occurred.svg'

import Button from 'components/Button'
import EmptyState from 'components/EmptyState'
import LoadingState from 'components/LoadingState'
import CalloutCard from 'components/Card/CalloutCard'
import ManageServices from './components/ManageServices'

import AuthenticatedHoc from 'HOC/WithAuthenticated'
import useParamSearch from 'hooks/useParamSearch'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'

import RecentTransactions from './components/RecentTransactions'
import makeData from 'utils/makeData'
import tableSchema from './tableSchema'
import {setSelectedApplication} from 'services/application/application.slice'
import '../../applications.css'

export const ErrorLoading = ({
  title = 'Something unexpected happened',
  message,
}) => {
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

const initialFormState = {
  services: {},
}

const ViewApplication = ({match}) => {
  const {
    isLoading: isLoadingApplication,
    isError,
    data: applicationData,
  } = useApplicationsQuery(match.params.id)

  console.log({applicationData, isLoadingApplication})
  const [getPageParamValue, setPageParamValue] = useParamSearch('page')
  const [getPageSizeParamValue, setPageSizeParamValue] = useParamSearch(
    'pageSize',
  )

  const data = React.useMemo(() => makeData(100), [])

  if (isLoadingApplication)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingState />
      </div>
    )

  const {services, vendors} = applicationData.entities

  if (isError)
    return (
      <ErrorLoading
        title="Oops..."
        message="Something unexpected happened. Please retry."
      />
    )
  const pageParamValue = getPageParamValue()
  const pageSizeParamValue = getPageSizeParamValue()

  const defaultTableOptions = {
    ...(pageParamValue && {defaultPageIndex: Number(pageParamValue - 1)}),
    ...(pageSizeParamValue && {defaultPageSize: Number(pageSizeParamValue)}),
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
      <Formik initialValues={initialFormState}>
        {({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <ManageServices services={services || {}} vendors={vendors || {}} />
          </form>
        )}
      </Formik>

      <RecentTransactions
        data={data}
        schema={tableSchema()}
        onPageNavigation={setPageParamValue}
        onPageSizeUpdate={setPageSizeParamValue}
        {...defaultTableOptions}
      />
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
