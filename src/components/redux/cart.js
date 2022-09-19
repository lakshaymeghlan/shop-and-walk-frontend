import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cart = createSlice({
  name: "cart reducer",
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(action);

      let product = state.find((product) => {
        return product.id == action.payload.id;
      });
      console.log(product);
      if (product) {
        return state
      }else{
        return [...state, action.payload];
      }
      
    },

    inc: (state, action) => {
      const newState = state.map((e) => {
        if (e.id === action.payload) {
          e.amount++;
        }
        return e;
      });
      state = newState;
    },

    dec: (state, action) => {
      const newState = state.map((e) => {
        if (e.id === action.payload) {
          if (e.amount > 1) {
            e.amount--;
          }
        }
        return e;
      });
      state = newState;
    },

    remove: (state, action) => {
      const newState = state.filter((e) => {
        return e.id !== action.payload;
      });
      return newState;
    },

    reset: () => {
      return [];
    },
  },
});

export const cartAction = cart.actions;
export default cart.reducer;
