import { api } from './http'

export const getRequest = async <Type>(params: { url: string }) => {
  const { data } = await api.get<Type>(params.url)

  return data
}

export const postRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await api.post<T>(params.url, params.payload)

  return data
}

export const patchRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await api.patch<T>(params.url, params.payload)

  return data
}

export const deleteRequest = async <T>(params: { url: string }) => {
  const { data } = await api.delete<T>(params.url)

  return data
}
