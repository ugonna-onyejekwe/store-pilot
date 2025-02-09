import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

type payload = {
  id: string
}

export type SingleCategoryResponse = {
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
}

const getCategory = (payload: payload) => {
  return getRequest<SingleCategoryResponse>({
    url: `${ApiEndPoints.getSingleCategory}/${payload.id}`
  })
}

export const useReturnCategory = () => {
  return useMutation({
    mutationFn: getCategory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}

export const useGetSingleCategory = (id: string) => {
  const { mutateAsync, data, isPending } = useReturnCategory()
  useEffect(() => {
    mutateAsync({
      id
    })
  }, [])

  return { data, isPending }
}
