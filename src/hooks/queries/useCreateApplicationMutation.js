import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

export default function useCreateApplicationMutation() {
  const request = (payload) => api.post(e.CREATE_APPLICATION, payload)
  const {mutate, ...mutationState} = useMutation(request)

  return [mutate, mutationState]
}
