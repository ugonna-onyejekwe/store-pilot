import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { patchRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  id: string
  name: string
  hasSize: boolean
  hasColor: boolean
  hasDesign: boolean
  hasSubProducts: boolean
  hasVariations: boolean
  sizes: string
  subProducts: string
  variations: string
  variablesSubproducts: string
  colors: string
  designs: string
}

const editCategory = (payload: payload) => {
  return patchRequest<null, payload>({
    url: `${ApiEndPoints.editCategory}/${payload.id}`,
    payload: payload
  })
}

export const useEditCategory = () => {
  return useMutation({
    mutationFn: editCategory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
