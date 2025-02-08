import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type Response = {
  formatedListOfColors: { name: string; id: string }[]
  formatedListOfDesigns: { name: string; id: string }[]
  formatedListOfSizes: { name: string; id: string }[]
  formatedListOfSubproducts: { name: string; id: string }[]
  formatedListOfVariation: { name: string; id: string }[]
  formatedListOfVariationSubProducts: { name: string; id: string }[]
  hasColor: boolean
  hasDesign: boolean
  hasSize: boolean
  hasSubProducts: boolean
  hasVariations: boolean
  name: string
  id: string
}[]

const getCategories = () => {
  return getRequest<Response>({ url: ApiEndPoints.getCategory })
}

export const useReturnAllCategories = () => {
  return useMutation({
    mutationFn: getCategories,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
