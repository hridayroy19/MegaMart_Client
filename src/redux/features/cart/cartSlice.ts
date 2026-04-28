import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseApi } from '@/config/axios'

type CartItem = { product: string | any; quantity: number; priceAt?: number }

type CartState = { items: CartItem[]; syncing: boolean }

const initialState: CartState = { items: [], syncing: false }

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await baseApi.get('/cart')
  return res.data.data
})

export const syncCartToServer = createAsyncThunk(
  'cart/sync',
  async (_: void, { getState }) => {
    const state: any = getState()
    const items = state.cart.items.map((it: any) => ({ product: typeof it.product === 'string' ? it.product : it.product._id, quantity: it.quantity }))
    const res = await baseApi.post('/cart', { items })
    return res.data.data
  },
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: string | any; quantity?: number }>) => {
      const prodId = typeof action.payload.product === 'string' ? action.payload.product : action.payload.product._id
      const existing = state.items.find((i) => (typeof i.product === 'string' ? i.product : i.product._id) === prodId)
      if (existing) existing.quantity += action.payload.quantity || 1
      else state.items.push({ product: action.payload.product, quantity: action.payload.quantity || 1 })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => (typeof i.product === 'string' ? i.product : i.product._id) !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const it = state.items.find((i) => (typeof i.product === 'string' ? i.product : i.product._id) === action.payload.productId)
      if (it) it.quantity = action.payload.quantity
    },
    clearCart: (state) => {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartToServer.pending, (state) => {
        state.syncing = true
      })
      .addCase(syncCartToServer.fulfilled, (state, action) => {
        state.syncing = false
        // server returns cart - set items
        state.items = action.payload?.items || []
      })
      .addCase(syncCartToServer.rejected, (state) => {
        state.syncing = false
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || []
      })
  },
})

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
