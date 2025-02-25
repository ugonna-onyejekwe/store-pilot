import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from './components/splashScreen'
import { router } from './routes/routes'
import { persistor, store } from './store'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  })

  const [closeSplashScreen, setCloseSplashScreen] = useState(false)

  useEffect(() => {
    setTimeout(() => setCloseSplashScreen(true), 3000)
  }, [])

  return (
    <>
      {!closeSplashScreen && <SplashScreen />}

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
