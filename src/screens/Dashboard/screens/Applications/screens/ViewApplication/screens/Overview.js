import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {GraphicEq as GoLive} from '@material-ui/icons'
import {Field, Label, Toggle} from '@zendeskgarden/react-forms'

import LoadingState from 'components/LoadingState'
import ErrorLoading from 'components/ErrorLoading'
import RecentTransactions from '../components/RecentTransactions'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useMutationNotifications from 'hooks/useMutationNotifications'
import useParamSearch from 'hooks/useParamSearch'
import useApplicationsQuery from 'hooks/queries/useApplicationsQuery'
import useUpdateApplicationMutation from 'hooks/queries/useUpdateApplicationMutation'

import makeData from 'utils/makeData'
import tableSchema from '../tableSchema'
import {setSelectedApplication} from 'services/application/application.slice'
import '../../../applications.css'
import {brand} from 'config/palette'

const Overview = ({match}) => {
  const [applicationLive, setApplicationLive] = useState(false)
  const {isLoading: isLoadingApplication, isError, data} = useApplicationsQuery(
    match.params.id,
  )

  // Declare application mutation update and handle state changes
  const [
    doUpdateApplication,
    applicationUpdateState,
  ] = useUpdateApplicationMutation(match.params.id)
  useMutationNotifications({
    ...applicationUpdateState,
    entity: 'application',
    actionType: 'update',
  })

  const [, setDashboardState] = useDashboard()
  const [getPageParamValue, setPageParamValue] = useParamSearch('page')
  const [getPageSizeParamValue, setPageSizeParamValue] = useParamSearch(
    'pageSize',
  )

  const memoizedTableData = React.useMemo(() => makeData(100), [])

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

  const pageParamValue = getPageParamValue()
  const pageSizeParamValue = getPageSizeParamValue()

  const defaultTableOptions = {
    ...(pageParamValue && {defaultPageIndex: Number(pageParamValue - 1)}),
    ...(pageSizeParamValue && {defaultPageSize: Number(pageSizeParamValue)}),
  }

  const toggleApplicationLive = () => {
    setApplicationLive(!applicationLive)
    doUpdateApplication({
      isLive: !applicationLive,
    })
  }

  return (
    <>
      <section className="py-12 px-4 lg:px-24">
        <section className="mb-6 flex justify-between">
          <div>
            <GoLive htmlColor={brand['brand-primary']} />
            <span className="ml-3">
              {applicationLive ? 'Live mode' : 'Test mode'}
            </span>
          </div>

          <div>
            <Field>
              <Toggle
                onChange={toggleApplicationLive}
                checked={applicationLive}
              >
                <Label>{applicationLive ? 'Switch to test' : 'Go live'}</Label>
              </Toggle>
            </Field>
          </div>
        </section>

        <RecentTransactions
          data={memoizedTableData}
          schema={tableSchema()}
          onPageNavigation={setPageParamValue}
          onPageSizeUpdate={setPageSizeParamValue}
          {...defaultTableOptions}
        />
      </section>
    </>
  )
}
const mapStateToProps = ({application: {selectedApplication}}) => ({
  selectedApplication,
})

const mapDispatchToProps = {setSelectedApplication}
export default AuthenticatedHoc(
  connect(mapStateToProps, mapDispatchToProps)(Overview),
)
