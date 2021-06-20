import React from 'react'
import {useQuery} from 'react-query'
import {normalize} from 'normalizr'
import {vendorSchema} from 'schema/vendors.schema'

import api from 'services/api'

const transformVendors = ({data}) => normalize(data, [vendorSchema])

const fetchVendorsRequest = async (queryParams) => {
  const data = await api.getAll(`/settings/vendors/${queryParams}`)

  return data
}

export default function useVendors(queryParams = '') {
  const fetchVendors = () => fetchVendorsRequest(queryParams)

  return useQuery(['vendors', queryParams], fetchVendors, {
    select: React.useCallback(transformVendors),
  })
}
