import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  savedItems: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const getSavedItems = createAsyncThunk(
  "auth/getSavedItems",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await authService.getSavedItems(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveItem = createAsyncThunk(
  "auth/saveItems",
  async (itemId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await authService.saveItem(itemId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unsaveItem = createAsyncThunk(
  "auth/unsaveItem",
  async (itemId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await authService.unsaveItem(itemId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.savedItems = [];
      })
      .addCase(getSavedItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedItems = action.payload;
      })
      .addCase(getSavedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(saveItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedItems = action.payload;
      })
      .addCase(saveItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unsaveItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsaveItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedItems = action.payload;
      })
      .addCase(unsaveItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
