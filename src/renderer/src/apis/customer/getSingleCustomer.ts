import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  customerId?: string
}

type ResponseType = {
  name: string
  id: string
  debt: number
  lastPaymentDate: string
  paymentHistory: {
    date: string
    amountPaid: number
  }[]
}

const getCustomers = (payload: payload) => {
  return getRequest<payload, ResponseType>({
    url: `${ApiEndPoints.getCustomers}`,
    payload
  })
}

export const useGetSingleCustomers = () => {
  return useMutation({
    mutationFn: getCustomers,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
