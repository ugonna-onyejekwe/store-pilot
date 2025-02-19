import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { router } from './routes/routes'
import { persistor, store } from './store'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
              <Toaster position="bottom-right" />
            </PersistGate>
          </Provider>
        </AnimatePresence>
      </QueryClientProvider>
    </>
  )
}

export default App
