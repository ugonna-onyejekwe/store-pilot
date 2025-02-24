import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { patchRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  newPassword: string
  oldPassword: string
}

const resetPassword = (payload: payload) => {
  return patchRequest<null, payload>({
    url: `${ApiEndPoints.adminResetPassword}`,
    payload: payload
  })
}

export const useAdminResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
