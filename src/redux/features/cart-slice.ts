import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { setLogin } from './auth-slice';
import { useApi } from '@/services/apiServices';
import { User } from '@/types/common';

export type CartItem = {
  id: number | string;
  title?: string;
  price?: number;
  discountedPrice: number;
  quantity?: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

type InitialState = {
  items: CartItem[];
};

const initialState: InitialState = {
  items: [],
};

interface RemoveItemPayload {
  id: string;
}

const { getLoggedUser } = useApi();

// current logged user

export const fetchLoggedUserThunk = createAsyncThunk(
  'auth/fetchLoggedUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const res = (await getLoggedUser()) as { data: { user: User } };
      const { data } = res;
      const { user } = data;
      const token = localStorage.getItem('authToken');
      if (user && token) {
        dispatch(setLogin({ token, user }));
      }
      return user;
    } catch (error) {
      console.error('Failed to fetch logged user', error);
      return rejectWithValue(error);
    }
  }
);

// current logged user

// 🔁 Async thunk to sync backend cart update
export const addToCartThunk = createAsyncThunk(
  'cart/addToCartThunk',
  async (item: CartItem, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as RootState;

    const user =
      typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authUser') || 'null') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (!user || !token) return;

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/users/cart/add`,
        {
          productId: item.id,
          quantity: 1,
          discountedPrice: item.discountedPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await dispatch(fetchLoggedUserThunk());
    } catch (error) {
      console.error('Failed to sync cart with server', error);
      return rejectWithValue(error);
    }
  }
);

// remove item from cart
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCartThunk',
  async (item: RemoveItemPayload, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as RootState;
    const user =
      typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authUser') || 'null') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (!user || !token) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/users/cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId: item.id,
        },
      });
      await dispatch(fetchLoggedUserThunk());
    } catch (error) {
      console.error('Failed to remove item from cart', error);
      return rejectWithValue(error);
    }
  }
);
// remove item from cart

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number | string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeAllItemsFromCart: state => {
      state.items = [];
    },

    // 🆕 Initialize cart from localStorage user
    initializeCartFromUserData: state => {
      if (typeof window === 'undefined') return;

      const storedUser = localStorage.getItem('authUser');
      if (!storedUser) return;

      try {
        const user = JSON.parse(storedUser);
        const backendCart = user?.cart || [];

        const parsedCart: CartItem[] = backendCart.map((item: any) => ({
          id: item.product,
          discountedPrice: item.discountedPrice,
          quantity: item.quantity,
        }));

        state.items = parsedCart;
      } catch (err) {
        console.error('Failed to initialize cart from user data', err);
      }
    },
  },
});

export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], items => {
  return items.reduce((total, item) => {
    const price = Number(item.discountedPrice) || 0;
    const qty = Number(item.quantity) || 0;
    return total + price * qty;
  }, 0);
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  initializeCartFromUserData,
} = cart.actions;

export default cart.reducer;
