import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

const loginRequest = (payload) => api.post(e.LOGIN, payload)

export default function useLogin() {
  const {mutate, ...mutationState} = useMutation(loginRequest)

  return [mutate, mutationState]
}
