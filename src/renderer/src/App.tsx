import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Layout from './components/layout'
import AdminLayout from './components/layout/AdminLayout'
import SplashScreen from './components/splashScreen'
import AddProduct from './pages/addProduct'
import Admin from './pages/admin'
import Cart from './pages/cart'
import AddCategory from './pages/createCategory'
import Dashboard from './pages/dashboard'
import { DeleteCategory } from './pages/deleteCategory'
import DeleteProduct from './pages/deleteProduct'
import History from './pages/history'
import Products from './pages/products'
import { ReturnedGoodsHistory } from './pages/returnedGoodsHistory'
import ReturnProduct from './pages/returnProduct'
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
              <Router>
                {' '}
                {/* Wrap with HashRouter */}
                <Routes>
                  {' '}
                  {/* Use Routes instead of Switch */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/:productname/:subcatId" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/returned-goods-history" element={<ReturnedGoodsHistory />} />
                  </Route>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/create-category/:actionType?/:id?" element={<AddCategory />} />
                    <Route
                      path="/add-product/:actionType?/:categoryId?/:productId?"
                      element={<AddProduct />}
                    />
                    <Route path="/delete-category/:categoryId" element={<DeleteCategory />} />
                    <Route
                      path="/delete-product/:categoryId?/:productId?"
                      element={<DeleteProduct />}
                    />
                    <Route path="/returned-goods" element={<ReturnProduct />} />
                  </Route>
                </Routes>
              </Router>

              {/* <RouterProvider router={router} /> */}
              <Toaster position="bottom-right" />
            </PersistGate>
          </Provider>
        </AnimatePresence>
      </QueryClientProvider>
    </>
  )
}

export default App
