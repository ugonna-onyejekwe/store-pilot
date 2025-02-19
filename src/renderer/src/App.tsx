import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { store } from './store'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" />
          </Provider>
        </AnimatePresence>
      </QueryClientProvider>
    </>
  )
}

export default App
