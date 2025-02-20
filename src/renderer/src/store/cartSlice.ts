import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface cartItem {
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
  typeOfSale: 'sell part' | 'sell all' | 'sell leftOver'
  quantity: number
  leftOverId: string
  cartoonQuantity?: number
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
