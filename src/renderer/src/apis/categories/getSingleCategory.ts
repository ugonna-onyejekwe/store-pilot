import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  id: string
}

export type SingleCategoryResponse = {
  formatedListOfColors: string
  formatedListOfDesigns: string
  formatedListOfSizes: string
  formatedListOfSubproducts: { name: string; defaultQuantity: number; id: string }[]
  hasColor: boolean
  hasDesign: boolean
  hasSize: boolean
  hasSubProducts: boolean
  name: string
  hasModel: boolean
  id: string
}

const getCategory = (payload: payload) => {
  return getRequest<SingleCategoryResponse>({
    url: `${ApiEndPoints.getSingleCategory}/${payload.id}`
  })
}

export const useReturnSingleCategory = () => {
  return useMutation({
    mutationFn: getCategory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
