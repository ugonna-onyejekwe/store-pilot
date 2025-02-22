import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  password: string
}

const login = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.login}`,
    payload: payload
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
