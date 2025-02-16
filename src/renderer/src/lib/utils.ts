import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
