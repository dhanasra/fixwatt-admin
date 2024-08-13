// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  items: [],
  services: []
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    init(state, action){
      state.services = action.payload;
    },
    addItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      }
    },
    clearItems(state, action) {
      state.items = [];
    },
  }
});

export default cart.reducer;

export const { addItem, removeItem, clearItems, init } = cart.actions;
