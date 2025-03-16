import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type ResponseType = {
  name: string
  id: string
  debt: number
  lastPaymentDate: string
  paymentHistory: {
    date: string
    amountPaid: string
  }[]
}[]

const getCustomers = () => {
  return getRequest<null, ResponseType>({
    url: `${ApiEndPoints.getCustomers}`
  })
}

export const useGetCustomers = () => {
  return useMutation({
    mutationFn: getCustomers,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
