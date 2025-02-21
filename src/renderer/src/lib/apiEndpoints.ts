export const ApiEndPoints = {
  createCategory: '/category/create',
  getCategory: '/category',
  getSingleCategory: '/category/single',
  editCategory: '/category/edit',
  deleteCategory: '/category/delete',
  verifyCategoryName: '/category/verifiy-name',
  verifyModelName: '/products/verify-model-name',
  createProduct: '/products/create',
  getProducts: '/products',
  editProduct: '/products/edit',
  deleteProduct: '/products/delete',
  checkout: '/products/checkout',
  getAllHistory: '/history'
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
