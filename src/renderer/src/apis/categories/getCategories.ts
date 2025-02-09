import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

export type CategoryResponse = {
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
  return getRequest<CategoryResponse>({ url: ApiEndPoints.getCategory })
}

export const useReturnAllCategories = () => {
  return useMutation({
    mutationFn: getCategories,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}

export const useGetCategories = () => {
  const { mutateAsync, data, isPending } = useReturnAllCategories()
  useEffect(() => {
    mutateAsync()
  }, [])

  return { CategoriesData: data?.map((i) => ({ label: i.name, value: i.id })), isPending }
}

export const useReturnSingleCategory = (id: string) => {
  const { mutateAsync, data, isPending } = useReturnAllCategories()
  useEffect(() => {
    mutateAsync()
  }, [])

  return { category: data?.filter((i) => i.id === id), isPending }
}
