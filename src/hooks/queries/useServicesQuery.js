import React from 'react'
import {useQuery} from 'react-query'
import {normalize} from 'normalizr'
import serviceSchema from 'services/application/services'

import api from 'services/api'

const transformServices = ({data}) => {
  const services = normalize(data, serviceSchema)

  return services
}

const fetchServicesRequest = async (queryParams) => {
  const data = await api.getAll(`/settings/services/${queryParams}`)
  return data
}

export default function useServices(queryParams = '') {
  const fetchServices = () => fetchServicesRequest(queryParams)

  return useQuery(['services', queryParams], fetchServices, {
    select: React.useCallback(transformServices),
  })
}
