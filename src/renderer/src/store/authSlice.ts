import { createSlice } from '@reduxjs/toolkit'
import { getCookies } from '@renderer/lib/utils'

export interface authType {
  cookie: string
}

const initialState: authType = {
  cookie: ''
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initCookie: (state) => {
      state.cookie = getCookies('auth')
    },
    removeCookie: (state) => {
      state.cookie = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { initCookie, removeCookie } = auth.actions

export default auth.reducer
