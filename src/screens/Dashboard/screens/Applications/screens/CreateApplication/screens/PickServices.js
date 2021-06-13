import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useFormikContext} from 'formik'
import {ChevronRight, ChevronLeft} from '@material-ui/icons'
import {Spinner} from '@zendeskgarden/react-loaders'

import Button from 'components/Button'
import Steps from 'components/Steps'
import SectionTitle from 'components/SectionTitle'
import LoadingState from 'components/LoadingState'

import AuthenticatedHoc from 'HOC/WithAuthenticated'

import {useDashboard} from 'hooks/useDashboard'
import useServicesQuery from 'hooks/queries/useServicesQuery'
import useVendorsQuery from 'hooks/queries/useVendorsQuery'

import 'screens/Dashboard/screens/Applications/applications.css'

import ServicesList from './components/ServicesList'

const PickServices = ({history, crumbs}) => {
  const {values, setFieldValue} = useFormikContext()
  const {isLoading: isLoadingVendors, data: vendorData} = useVendorsQuery()
  const {
    isLoading: isLoadingServices,
    isSuccess: servicesLoaded,
    data,
  } = useServicesQuery()
  const [dashboardState] = useDashboard()

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

  if (isLoadingServices || isLoadingVendors)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingState />
      </div>
    )

  const {services} = data.entities
  const {vendors} = vendorData.entities

  const onToggleService = (id) => {
    const updatedVendors = values.services[id].length
      ? []
      : services[id].vendors

    const updatedServices = {
      ...values.services,
      [id]: updatedVendors,
    }

    setFieldValue('services', updatedServices)
  }

  return (
    <div className="container py-16 md:py-16">
      <section className="mb-12">
        <SectionTitle
          title="Access the wealth of services."
          message="Pick as many services as you wish."
        />
      </section>

      <div className="flex w-full justify-around mb-16">
        <div className="mx-auto w-full md:w-9/12 lg:w-1/2">
          <Steps steps={crumbs} />
        </div>
      </div>

      <div className="flex w-full justify-around mb-16">
        <section>
          <ServicesList
            selectedServices={values.services}
            onToggleService={onToggleService}
            services={services}
            vendors={vendors}
          />

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
