import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    cart: {}
 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = cartSlice.actions
export default cartSlice.reducer