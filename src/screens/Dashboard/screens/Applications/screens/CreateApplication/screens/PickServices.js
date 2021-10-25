import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

import classNames from 'classnames'
import {useFormikContext} from 'formik'
import {ChevronRight, ChevronLeft} from '@material-ui/icons'
import {Spinner} from '@zendeskgarden/react-loaders'
import {Accordion} from '@zendeskgarden/react-accordions'

import Button from 'components/Button'
import Steps from 'components/Steps'
import SectionTitle from 'components/SectionTitle'
import LoadingState from 'components/LoadingState'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useServicesQuery from 'hooks/queries/useServicesQuery'
import useVendorsQuery from 'hooks/queries/useVendorsQuery'
import useServicesList from '../../../hooks/useServicesList'

import 'screens/Dashboard/screens/Applications/applications.css'

import ServiceVendors from 'screens/Dashboard/screens/Applications/components/ServiceVendors'
import ServiceVendorCheckbox from 'screens/Dashboard/screens/Applications/components/ServiceVendorCheckbox'
import ServiceListing from '../../../components/ServiceListing'

const PickServices = ({history, crumbs}) => {
  const {values, setFieldValue} = useFormikContext()
  const {isLoading: isLoadingVendors, data: vendorData} = useVendorsQuery()
  const {
    isLoading: isLoadingServices,
    isSuccess: servicesLoaded,
    data,
  } = useServicesQuery()
  const [dashboardState] = useDashboard()
  const dataLoading = isLoadingServices || isLoadingVendors

  useEffect(() => {
    if (!values.name.length) {
      history.push('/dashboard/applications/create')
      toast.info('Please add a name')
    }
  }, [values.name, history])

  useEffect(() => {
    if (servicesLoaded) {
      const {services} = data.entities

      // Preselect all vendors by reducing the services list
      let updatedServices = Object.keys(services).reduce(
        (acc, id) => ({
          ...acc,
          [id]: services[id].vendors,
        }),
        {},
      )

      setFieldValue('services', updatedServices)
    }
  }, [data, servicesLoaded, isLoadingVendors, setFieldValue])

  const {expandedServices, servicesGroup} = useServicesList({
    services: data?.entities?.services,
    selectedServices: values.services,
    vendors: vendorData?.entities?.vendors,
  })

  if (dataLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    )

  const {services} = data.entities

  return (
    <div className="px-8 py-10 md:py-10">
      <section className="mb-12">
        <SectionTitle
          title="Access the wealth of services."
          message="Pick as many services as you wish."
        />
      </section>

      <div className="flex w-full justify-around mb-16">
        <div className="mx-auto w-11/12 md:w-9/12 lg:w-1/2">
          <Steps steps={crumbs} />
        </div>
      </div>

      <div className="flex w-full justify-around mb-16">
        <section>
          <Accordion expandedSections={expandedServices} level={4} isExpandable>
            {servicesGroup.services.map((service) => {
              const onServiceChange = () => {
                const removeService = () =>
                  Object.keys(values.services)
                    .filter((serviceKey) => serviceKey !== service.id)
                    .reduce(
                      (acc, cur) => ({
                        ...acc,
                        [cur]: values.services[cur],
                      }),
                      {},
                    )

                const addService = () => ({
                  ...values.services,
                  [service.id]: services[service.id].vendors,
                })

                const updatedServices = values.services.hasOwnProperty(
                  service.id,
                )
                  ? removeService()
                  : addService()

                setFieldValue('services', updatedServices)
                setFieldValue('dirty', true)
              }

              return (
                <ServiceListing
                  label={service.label}
                  checked={service.checked}
                  onChange={onServiceChange}
                  key={service.id}
                >
                  <ServiceVendors serviceId={service.id}>
                    {(arrayHelpers) =>
                      service.vendors.map((vendor) => {
                        const checked = values.services.hasOwnProperty(
                          service.id,
                        )
                          ? values.services[service.id].includes(vendor)
                          : false
                        const vendorProps = servicesGroup.getVendorProps(
                          vendor,
                          service.id,
                        )

                        const onVendorChange = () => {
                          const selectedVendors =
                            values.services[service.id] || []
                          const vendorSelected = selectedVendors.includes(
                            vendor,
                          )

                          if (vendorSelected) {
                            arrayHelpers.remove(selectedVendors.indexOf(vendor))
                          } else {
                            arrayHelpers.push(vendor)
                          }
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
                            <ServiceVendorCheckbox
                              onChange={onVendorChange}
                              {...vendorProps}
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

          <div className="py-6 flex justify-between">
            <Link to="/dashboard/applications/create">
              <Button size="small">
                <ChevronLeft />
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              variant={'primary'}
              disabled={dashboardState.isCreatingApplication}
            >
              {dashboardState.isCreatingApplication ? (
                <>
                  <span className="font-bold">Creating application</span>
                  <Spinner delayMS={0} size={24} />
                </>
              ) : (
                <>
                  <span className="font-bold">Create application</span>
                  <ChevronRight />
                </>
              )}
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthenticatedHoc(PickServices)
