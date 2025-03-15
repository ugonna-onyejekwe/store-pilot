// the type of body a request will have while creating category
type CreateCategoryRequestBody = {
  name: string
  hasModel: boolean
  hasColor: boolean
  hasSubProducts: boolean
  subProducts: {
    subCategoryName?: string
    subCategoryId?: string
    name?: string
    defaultQuantity?: number
    id?: string
    subProducts?: {
      name: string
      defaultQuantity: number
      id: string
    }[]
  }[]
  subcategories: string
  hasSubcategories: boolean
  designs: string
  colors: string
}

type returnProductRequestBody = {
  categoryId: string
  productId: string
  subcategory: string
  design: string
  color: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    inputedQuantity: number
  }[]
  returnDisposition: 'restock' | 'discard'
}

type Checkout__ProductList = {
  categoryId: string
  subcategory: string
  model: string
  productId: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    sellQuantity: number
    left: number
  }[]
  color: string
  design: string
  quantity: number
  hasSubCategory: boolean
  hasModel: boolean
  hasColor: boolean
  hasSubProducts: boolean
  cartoonQuantity: number
  sellType: 'part' | 'all' | 'leftOver'
  leftOverId: string
}[]

declare interface CheckoutInfo {
  paymentType: 'full' | 'half' | 'credit'
  amountPaid: string
  amountToPay: string
  customerName: string
  customerId: string
  locationSold: string
  isNewCustomer: boolean
}

type CreateProductRequestBody = {
  categoryName: string
  categoryId: string
  subCategory: string
  model: string
  actionType: string
  hasModel: boolean
  hasSubProducts: boolean
  hasSubCategory: boolean
  hasColors: boolean
  totalQuantity: number
  cartoonsPerSet: number
  subProducts: {
    defaultQuantity: number
    id: string
    name: string
    available: boolean
  }[]
  colors: {
    name: string
    availableQuantity: number
  }[]
  designs: {
    colorName: string
    designs: {
      name: string
      availableQuantity: number
    }[]
  }[]
  productId?: string
}

type createNewCustomerBody = {
  customerName: string
  amountToPay: number
  amountPaid: number
  typeOfPayment: 'half' | 'full' | 'credit'
}

declare namespace Express {
  export interface Request {
    doc: {
      products: {
        categoryName: string
        categoryId: string
        subCategory: string
        model: string
        hasModel: boolean
        hasSubProducts: boolean
        hasSubCategory: boolean
        hasColors: boolean
        totalQuantity: number
        cartoonsPerSet: number
        isParentProduct: boolean
        subProducts: {
          defaultQuantity: number
          id: string
          name: string
          available: boolean
        }[]
        colors: {
          name: string
          availableQuantity: number
        }[]
        designs: {
          colorName: string
          designs: {
            name: string
            availableQuantity: number
          }[]
        }[]
        productId: string
        leftOver?: {
          productId: string
          color: string
          design: string
          leftOverId: string
          model: string
          subproducts: {
            name: string
            id: string
            left: number
            defaultQuantity: number
          }[]
        }[]
      }[]

      histories: {
        listOfProducts: {
          category: {
            id: string
            name: string
          }
          model: string
          productId: string
          color: string
          size: string
          design: string
          subproducts: {
            name: string
            id: string
            defaultQuantity: number
            left: number
            sellQuantity: number
          }[]
          typeOfSale: string
          quantity: number
          leftOverId: string
        }[]
        checkoutInfo: {
          locationSold: string
          customerName: string
          customerPhoneNumber: string
          supplyStatus: string
          paymentStatus: string
          sellingPrice: number
          amountPaid: number
          createdAt: number
          modified: boolean
          modeifedAt: number
          supplyLocation: string
          checkoutId: string
        }
      }[]

      returnedGoods: []

      categories: {
        name: string
        hasModel: boolean
        hasColor: boolean
        hasSubProducts: boolean
        subProducts: {
          subCategoryName?: string
          subCategoryId?: string
          name?: string
          defaultQuantity?: number
          id?: string
          subProducts?: {
            name: string
            defaultQuantity: number
            id: string
          }[]
        }[]
        subcategories: { name: string; id: string }[]
        hasSubcategories: boolean
        id: string
      }[]

      stores: {
        name: string
        id: string
      }[]

      customers: {
        name: string
        id: string
        debt: number
      }[]

      authCredentials: {
        developerName: string
        developerPhoneNumber: string
        password: string
      }
    }

    // this formatedData is attach to the request header after category data have been formated
    formatedData: {
      name: string
      hasModel: boolean
      hasColor: boolean
      hasSubProducts: boolean
      colors: string[]
      designs: string[]
      subProducts: {
        subCategoryName?: string
        subCategoryId?: string
        name?: string
        defaultQuantity?: number
        id?: string
        subProducts?: {
          name: string
          defaultQuantity: number
          id: string
        }[]
      }[]
      subcategories: { name: string; id: string }[]
      hasSubcategories: boolean
    }

    productInfo: {
      totalQuantity: number
      cartoonsPerProduct: number
      model: string
      lastPrice: number
      sizes: { name: string; quantity: number; id: string }[]
      subProducts: { name: string; available: boolean; defaultQuantity: number; id: string }[]
      colors: { name: string; quantity: number; id: string }[]
      designs: { name: string; quantity: number; id: string }[]
    }
  }
}
