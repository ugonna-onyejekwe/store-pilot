import Layout from '@renderer/components/layout'
import AdminLayout from '@renderer/components/layout/AdminLayout'
import AddProduct from '@renderer/pages/addProduct'
import Admin from '@renderer/pages/admin'
import AddCategory from '@renderer/pages/createCategory'
import Dashboard from '@renderer/pages/dashboard'
import History from '@renderer/pages/history'
import Products from '@renderer/pages/products'

import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/:productname/:subcatId',
        element: <Products />
      },

      {
        path: '/history',
        element: <History />
      }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/create-category/:actionType?/:id?',
        element: <AddCategory />
      },
      {
        path: '/add-product/:actionType?/:categoryId?/:productId?',
        element: <AddProduct />
      }
    ]
  }
])
