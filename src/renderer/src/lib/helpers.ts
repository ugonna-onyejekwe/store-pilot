import { api } from './http'

export const getRequest = async <payload, Type>(params: { url: string; payload?: payload }) => {
  const { data } = await api.get<Type>(params.url, { params: params.payload })

  await new Promise((resolve) => setTimeout(resolve, 500))

  return data
}

export const postRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await api.post<T>(params.url, params.payload)

  await new Promise((resolve) => setTimeout(resolve, 500))

  return data
}

export const patchRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await api.patch<T>(params.url, params.payload)

  await new Promise((resolve) => setTimeout(resolve, 500))

  return data
}

export const deleteRequest = async <T, P>(params: { url: string; payload?: P }) => {
  const { data } = await api.delete<T>(params.url, { params: params.payload })

  await new Promise((resolve) => setTimeout(resolve, 500))

  return data
}
