import React from 'react'
import classNames from 'classnames'
import {useFormikContext} from 'formik'
import {Spinner} from '@zendeskgarden/react-loaders'

import {useDashboard} from 'hooks/useDashboard'
import useServicesList from '../../../hooks/useServicesList'

import useShowToast from 'hooks/useShowToast'

import ServicesList from 'screens/Dashboard/screens/Applications/components/ServicesList'
import ServiceVendors from 'screens/Dashboard/screens/Applications/components/ServiceVendors'
import ServiceVendorRadio from 'screens/Dashboard/screens/Applications/components/ServiceVendorRadio'
import ServiceListing from '../../../components/ServiceListing'
import Button from 'components/Button'

const ManageCredentials = ({services, vendors}) => {
  const {values, setFieldValue} = useFormikContext()
  const [dashboardState] = useDashboard()
  const showToast = useShowToast()

  React.useEffect(() => {
    // Preselect all vendors by reducing the services list
    let updatedServices = Object.keys(services).reduce(
      (acc, id) => ({
        ...acc,
        [id]: services[id].vendors.filter((vendor) => vendors[vendor].isActive),
      }),
      {},
    )

    setFieldValue('services', updatedServices)
  }, [services, vendors, setFieldValue])

  React.useEffect(() => {
    if (dashboardState.successFullyUpdatedApplication) {
      showToast({
        type: 'success',
        title: 'Successfully updated services',
        message: 'Your service updates have been saved',
      })
      setTimeout(() => setFieldValue('dirty', false), 1000)
    }
  }, [showToast, setFieldValue, dashboardState.successFullyUpdatedApplication])

  const {expandedServices, servicesGroup} = useServicesList({
    services,
    selectedServices: values.services,
    vendors,
  })

  return (
    <>
      <div className="py-12 px-4 lg:px-24 flex justify-between">
        <section className="">
          <h1 className="text-xl font-bold text-brand-tertiary mb-1">
            Manage vendor credentials
          </h1>
          <p className="text-sm text-gray-400">
            Gain better control over your integrations
          </p>
        </section>
        <Button
          variant="primary"
          type="submit"
          disabled={!values.dirty || dashboardState.isUpdatingApplication}
        >
          {dashboardState.isUpdatingApplication ? (
            <>
              <Spinner delayMS={0} size={16} />
              <span className="font-bold ml-1">Saving...</span>
            </>
          ) : (
            <b>Save changes</b>
          )}
        </Button>
      </div>
      <div className="mx-auto lg:px-24 overflow-auto">
        <ServicesList expandedServices={expandedServices}></ServicesList>
      </div>
    </>
  )
}

export default ManageCredentials
