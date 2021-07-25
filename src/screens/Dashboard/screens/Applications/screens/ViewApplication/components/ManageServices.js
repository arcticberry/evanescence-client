import React from 'react'
import classNames from 'classnames'
import {useFormikContext} from 'formik'
import {Spinner} from '@zendeskgarden/react-loaders'
import {Accordion} from '@zendeskgarden/react-accordions'

import {useDashboard} from 'hooks/useDashboard'
import useServicesList from '../../../hooks/useServicesList'

import useShowToast from 'hooks/useShowToast'

import ServiceVendors from 'screens/Dashboard/screens/Applications/components/ServiceVendors'
import ServiceVendorRadio from 'screens/Dashboard/screens/Applications/components/ServiceVendorRadio'
import ServiceListing from '../../../components/ServiceListing'
import Button from 'components/Button'

const ManageServices = ({services, vendors}) => {
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
            Manage services
          </h1>
          <p className="text-sm text-gray-400">
            Switch service providers effortlessly
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
        <Accordion expandedSections={expandedServices} level={4} isExpandable>
          {servicesGroup.services.map((service) => {
            const onServiceChange = () => {
              const removeService = () =>
                Object.keys(values.services)
                  .filter((serviceKey) => serviceKey !== service._id)
                  .reduce(
                    (acc, cur) => ({
                      ...acc,
                      [cur]: values.services[cur],
                    }),
                    {},
                  )

              const addService = () => ({
                ...values.services,
                [service._id]: [service.vendors[0]],
              })

              const updatedServices = values.services.hasOwnProperty(
                service._id,
              )
                ? removeService()
                : addService()

              setFieldValue('services', updatedServices)
              setFieldValue('dirty', true)
            }

            return (
              <ServiceListing
                label={service.service.label}
                checked={service.checked}
                onChange={onServiceChange}
                key={service._id}
              >
                <ServiceVendors serviceId={service._id}>
                  {(arrayHelpers) =>
                    service.vendors.map((vendor) => {
                      const checked = values.services.hasOwnProperty(
                        service._id,
                      )
                        ? values.services[service._id].includes(vendor)
                        : false
                      const vendorProps = servicesGroup.getVendorProps(
                        vendor,
                        service._id,
                      )

                      const onVendorChange = () => {
                        // clear the selected vendors then add the newly selected
                        arrayHelpers.pop()
                        arrayHelpers.push(vendor)
                        setFieldValue('dirty', true)
                      }

                      return (
                        <div
                          key={vendor}
                          onClick={onVendorChange}
                          className={classNames(
                            [
                              'rounded-md p-3 border-2 hover:border-brand-primary cursor-pointer',
                            ],
                            {
                              'border-brand-primary': checked,
                            },
                          )}
                        >
                          <ServiceVendorRadio
                            onChange={onVendorChange}
                            {...vendorProps.vendor}
                            checked={checked}
                          />
                        </div>
                      )
                    })
                  }
                </ServiceVendors>
              </ServiceListing>
            )
          })}
        </Accordion>
      </div>
    </>
  )
}

export default ManageServices
