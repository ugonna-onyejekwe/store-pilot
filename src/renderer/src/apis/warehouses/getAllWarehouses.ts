import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type WarehouseResponse = {
  name: string
  id: string
}[]

const getAllWarehouses = () => {
  return getRequest<null, WarehouseResponse>({
    url: ApiEndPoints.getAllWarehouse
  })
}

export const useReturnAllWarehouses = () => {
  return useMutation({
    mutationFn: getAllWarehouses,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
