import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

// const persistedReducer = persistReducer(persistConfig, cartReducer)

// export const store = configureStore({
//   reducer: { cart: persistedReducer }
// })

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
