import React from 'react'

const useServicesList = ({services = {}, selectedServices, vendors}) => {
  const [expandedServices, setExpandedServices] = React.useState([])

  React.useEffect(() => {
    const expandedServices = Array.from({
      length: Object.keys(services).length,
    }).map((_, idx) => idx)
    setExpandedServices(expandedServices)
  }, [setExpandedServices, services])

  const getVendorProps = React.useCallback(
    (vendor, serviceId) => {
      const selectedVendors = selectedServices.hasOwnProperty(serviceId)
        ? selectedServices[serviceId]
        : []

      const checked = selectedVendors.includes(vendor.vendorId)

      return {
        ...vendors[vendor],
        checked,
      }
    },
    [selectedServices, vendors],
  )

  const transformServices = React.useCallback(
    (services) => {
      return Object.keys(services).map((serviceId) => {
        return {
          ...services[serviceId],
          checked:
            selectedServices.hasOwnProperty(serviceId) &&
            selectedServices[serviceId].length,
        }
      })
    },
    [selectedServices],
  )

  return {
    expandedServices,
    servicesGroup: {
      services: transformServices(services),
      getVendorProps,
    },
  }
}

export default useServicesList
