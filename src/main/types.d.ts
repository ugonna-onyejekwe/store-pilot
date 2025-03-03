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

type Checkout__ProductList = {
  category: {
    id: string
    name: string
  }
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
  typeOfSale: 'sell part' | 'sell all' | 'sell leftOver'
  quantity: number
  leftOverId: string
}[]

declare interface CheckoutInfo {
  locationSold: string
  customerName: string
  customerPhoneNumber: string
  supplyStatus: 'supplied | not supplied'
  paymentStatus: 'full payment' | 'half payment' | 'credit'
  sellingPrice: number
  amountPaid: number
}

declare namespace Express {
  export interface Request {
    doc: {
      products: {
        category: {
          name: string
          id: string
        }
        subCategoryName: string
        lastPrice: number
        totalQuantity: number
        cartoonsPerProduct: number
        model: string
        sizes: { name: string; id: string; quantity: number }[]
        subProducts: {
          name: string
          id: string
          quantity: number
          available: boolean
          defaultQuantity: number
          left: number
        }[]
        colors: { name: string; id: string; quantity: number }[]
        designs: { name: string; id: string; quantity: number }[]
        productId: string
        leftOver?: {
          category: {
            name: string
            id: string
          }
          productId: string
          size: string
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
