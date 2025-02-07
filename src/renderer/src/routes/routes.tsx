import Layout from '@renderer/components/layout'
import AdminLayout from '@renderer/components/layout/AdminLayout'
import AddCategory from '@renderer/pages/addCategory'
import AddProduct from '@renderer/pages/addProduct'
import Admin from '@renderer/pages/admin'
import Dashboard from '@renderer/pages/dashboard'
import History from '@renderer/pages/history'
import Products from '@renderer/pages/products'
import SubProducts from '@renderer/pages/products/subproducts'
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
        path: '/products/:subcatId',
        element: <Products />
      },
      {
        path: '/products/:subcatId/:id',
        element: <SubProducts />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/add-category',
        element: <AddCategory />
      },
      {
        path: '/add-product',
        element: <AddProduct />
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
        path: '/add-category',
        element: <AddCategory />
      },
      {
        path: '/add-product',
        element: <AddProduct />
      }
    ]
  }
])
