import Cookies from 'js-cookie'

export const getError = (error) => error.response.data.message

// framerMotion
export const animateY = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
}

export function formatNumber(input: number) {
  // 1. Convert to String (if it's not already)
  const numStr = String(input)

  // 2. Remove Leading Zeros (using regex)
  const cleanedStr = numStr.replace(/^0+/, '') || '0' // Handles all-zeros case

  // 3. Convert back to Number
  const result = Number(cleanedStr)

  return result
}

// Formate numbers to have commas
export const formateAmount = (amount: number) => {
  const formatterNG = new Intl.NumberFormat('en-NG')

  const formattedNumberNG = formatterNG.format(Number(amount))

  return formattedNumberNG
}

// Formate numbers to have currency sign
export const convertAmount = (amount: number) => {
  const formattedPriceNG = Number(amount).toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN'
  })

  return formattedPriceNG
}

// formate date
export function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  const month = date.toLocaleString('default', { month: 'short' }) // Get short month name
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month}, ${day}, ${year}`
}

// display date
export function formatDateFromTimestamp(timestamp) {
  const date = new Date(timestamp) // Create a Date object from the timestamp

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  // @ts-expect-error: Overload
  return date.toLocaleDateString(undefined, options)
}

// set cookies
export const setCookies = (name: string, value: string) => {
  Cookies.set(name, value, { expires: 1 })
}

// get cookies
export const getCookies = (name: string) => {
  return Cookies.get(name)
}

// delete cookies
export const deleteCookies = (name: string) => {
  Cookies.remove(name)
}
