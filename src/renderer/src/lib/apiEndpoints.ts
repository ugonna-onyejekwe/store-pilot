export const ApiEndPoints = {
  createCategory: '/category/create',
  getCategory: '/category',
  getSingleCategory: '/category/single',
  editCategory: '/category/edit',
  deleteCategory: '/category/delete',
  verifyCategoryName: '/category/verifiy-name',

  // products
  verifyModelName: '/products/verify-model-name',
  createProduct: '/products/create',
  getProducts: '/products',
  editProduct: '/products/edit',
  deleteProduct: '/products/delete',
  checkout: '/products/checkout',

  // history
  getAllHistory: '/history',
  editSupplyStatus: '/history/edit-supply-status',
  editPayment: '/history/edit-payment',

  // auth
  login: '/auth/login',
  validateDev: '/auth/validateDev',
  resetPassword: '/auth/reset-password',
  adminResetPassword: '/auth/admin-reset-password',

  // warehouse
  getAllWarehouse: '/warehouses',
  addWarehouse: '/warehouses/add',
  deleteWarehouse: '/warehouses'
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
