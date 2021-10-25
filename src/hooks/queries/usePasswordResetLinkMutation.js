import {useMutation} from 'react-query'
import api from 'services/api'
import e from 'constants/endpoints'

export default function usePasswordResetLink() {
  const resetPasswordLinkRequest = (payload) =>
    api.post(e.REQUEST_PASSWORD_RESET, payload)
  const {mutate, ...mutationState} = useMutation(resetPasswordLinkRequest)

  return [mutate, mutationState]
}
