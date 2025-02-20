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
