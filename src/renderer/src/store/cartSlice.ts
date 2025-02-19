import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface cartItem {
  category: {
    name: string
    id: string
  }
  productId: string
  model: string
  color: string
  size: string
  design: string
  quantity: number
  typeOfSale: string
  subproduct: {
    name: string
    id: string
    available: boolean
    defaultQuantity: number
    left: number
    sellQuantity: number
  }[]
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
    addTocart: (state, action: PayloadAction<item>) => {
      state.cartItems.push(action.payload)
    },
    romoveFromCart: (state, action: PayloadAction<number>) => {
      const newList = state.cartItems.filter((_, key) => key !== action.payload)

      state.cartItems = newList
    }
  }
})

// Action creators are generated for each case reducer function
export const { addTocart, romoveFromCart } = cart.actions

export default cart.reducer
