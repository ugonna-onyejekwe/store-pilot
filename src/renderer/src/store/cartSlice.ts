import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface cartItem {
  categoryId: string
  subcategory: string
  model: string
  productId: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    sellQuantity: number
    left?: number
  }[]
  color: string
  design: string
  quantity: number
  cartoonQuantity: number
  sellType: string
  leftOverId?: string
}

export interface cartSlice {
  cartItems: cartItem[]
}

const initialState: cartSlice = {
  cartItems: []
}

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<cartItem>) => {
      state.cartItems.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const newList = state.cartItems.filter((_, key) => key !== action.payload)

      state.cartItems = newList
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addTocart, removeFromCart, clearCart } = cart.actions

export default cart.reducer
