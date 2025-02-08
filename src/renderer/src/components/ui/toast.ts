import toast from 'react-hot-toast'

export const toastUI = {
  success: (msg: string) => toast.success(msg, { duration: 3000 }),
  error: (msg: string) => toast.error(msg, { duration: 3000 })
}
