import React from 'react'
import classNames from 'classnames'
import {useFormikContext} from 'formik'

import useServicesList from '../../../hooks/useServicesList'

import ServicesList from 'screens/Dashboard/screens/Applications/components/ServicesList'
import ServiceVendors from 'screens/Dashboard/screens/Applications/components/ServiceVendors'
import ServiceVendorRadio from 'screens/Dashboard/screens/Applications/components/ServiceVendorRadio'
import ServiceListing from '../../../components/ServiceListing'

const ManageServices = ({services, vendors, onToggleService}) => {
  const {values, setFieldValue} = useFormikContext()

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

  const {expandedServices, servicesGroup} = useServicesList({
    services,
    selectedServices: values.services,
    vendors,
  })

  return (
    <>
      <div className="py-12 px-4 lg:px-16">
        <section className="">
          <h1 className="text-xl font-bold text-brand-tertiary mb-1">
            Manage services
          </h1>
          <p className="text-sm text-gray-400">
            Switch service providers effortlessly
          </p>
        </section>
      </div>
      <div className="mx-auto lg:px-16 overflow-auto">
        <ServicesList expandedServices={expandedServices}>
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
                [service._id]: [],
              })

              const updatedServices = values.services.hasOwnProperty(
                service._id,
              )
                ? removeService()
                : addService()

              setFieldValue('services', updatedServices)
            }

            return (
              <ServiceListing
                label={service.service.label}
                checked={service.checked}
                onChange={onServiceChange}
                key={service._id}
              >
                <ServiceVendors service={service}>
                  {(arrayHelpers) =>
                    service.vendors.map((vendor) => {
                      const checked = values.services.hasOwnProperty(
                        service._id,
                      )
                        ? values.services[service._id].includes(vendor)
                        : false
                      const vendorProps = servicesGroup.getVendorProps(
                        vendor,
                        service.id,
                      )

                      console.log({service})

                      const onVendorChange = () => {
                        arrayHelpers.pop()
                        arrayHelpers.push(vendor)
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
        </ServicesList>
      </div>
    </>
  )
}

export default ManageServices
