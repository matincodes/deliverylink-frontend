import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Item {
  id: number;
  title: string;
  userId: number;
  isEditing?: boolean;
  editedTitle?: string;
}

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    editItem: (state, action: PayloadAction<{ id: number; editedTitle: string }>) => {
      const itemToEdit = state.items.find((item) => item.id === action.payload.id);
      if (itemToEdit) {
        itemToEdit.editedTitle = action.payload.editedTitle;
      }
    },
    startEditing: (state, action: PayloadAction<number>) => {
      const itemToEdit = state.items.find((item) => item.id === action.payload);
      if (itemToEdit) {
        itemToEdit.isEditing = true;
      }
    },
    cancelEditing: (state, action: PayloadAction<number>) => {
      const itemToEdit = state.items.find((item) => item.id === action.payload);
      if (itemToEdit) {
        itemToEdit.isEditing = false;
      }
    },
    saveEditing: (state, action: PayloadAction<{ id: number; editedTitle: string }>) => {
      const itemToEdit = state.items.find((item) => item.id === action.payload.id);
      if (itemToEdit) {
        itemToEdit.title = action.payload.editedTitle;
        itemToEdit.isEditing = false;
        itemToEdit.editedTitle = undefined;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setItems,
  addItem,
  editItem,
  startEditing,
  cancelEditing,
  saveEditing,
  deleteItem,
  setLoading,
  setError,
} = itemSlice.actions;

export default itemSlice.reducer;