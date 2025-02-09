import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" />
        </AnimatePresence>
      </QueryClientProvider>
    </>
  )
}

export default App
