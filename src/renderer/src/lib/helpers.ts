import { api } from './http'

export const getRequest = async <Type>(params: { url: string }) => {
  // try {
  const { data } = await api.get<Type>(params.url)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return data
  // } catch (error) {
  //   console.log(error)
  // }
}

export const postRequest = async <T, P>(params: { url: string; payload: P }) => {
  // try {
  const { data } = await api.post<T>(params.url, params.payload)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return data
  // } catch (error) {
  //   console.log(error)
  // }
}

export const patchRequest = async <T, P>(params: { url: string; payload: P }) => {
  // try {
  const { data } = await api.patch<T>(params.url, params.payload)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return data
  // } catch (error) {
  //   console.log(error)
  // }
}

export const deleteRequest = async <T>(params: { url: string }) => {
  // try {
  const { data } = await api.delete<T>(params.url)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return data
  // } catch (error) {
  //   console.log(error)
  // }
}
