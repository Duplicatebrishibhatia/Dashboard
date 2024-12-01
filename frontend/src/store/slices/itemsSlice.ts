import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Item {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  total: number;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  total: 0,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ page, search }: { page: number; search?: string }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
      params: { page, search },
    });
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
    return id;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default itemsSlice.reducer; 