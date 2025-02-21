import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId?: string
  productId: string
}

export type ProductResponse = {
  category: {
    name: string
    id: string
  }
  totalQuantity: number
  cartoonsPerProduct: number
  model: string
  sizes: { name: string; id: string; quantity: number }[]
  subProducts: {
    name: string
    id: string
    quantity: number
    available: boolean
    defaultQuantity: number
    left: number
  }[]
  colors: { name: string; id: string; quantity: number }[]
  designs: { name: string; id: string; quantity: number }[]
  productId: string
  leftOver?: {
    category: {
      name: string
      id: string
    }
    productId: string
    size: string
    color: string
    design: string
    leftOverId: string
    model: string
    subproducts: {
      name: string
      id: string
      left: number
      defaultQuantity: number
    }[]
  }[]
}

const getSingleProducts = (payload: payload) => {
  return getRequest<null, ProductResponse>({
    url: `${ApiEndPoints.getProducts}/${payload.productId}/${payload.categoryId}`
  })
}

export const useReturnSingleProduct = () => {
  return useMutation({
    mutationFn: getSingleProducts,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
