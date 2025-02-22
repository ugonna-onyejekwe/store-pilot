import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  developerPhoneNumber: string
  developerName: string
}

const validateDev = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.validateDev}`,
    payload: payload
  })
}

export const usevalidateDev = () => {
  return useMutation({
    mutationFn: validateDev,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
