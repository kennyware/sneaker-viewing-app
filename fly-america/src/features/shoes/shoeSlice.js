import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getBrands, getSneakerById, getSneakers } from "./ShoeService";

const initialState = {
  shoes: [],
  brands: [],
  shoe: {},
  searched: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getShoes = createAsyncThunk(
  "shoes/getAll",
  async (gender, thunkAPI) => {
    try {
      return await getSneakers(gender);
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

export const getShoeBrands = createAsyncThunk(
  "shoes/getBrands",
  async (_, thunkAPI) => {
    try {
      return await getBrands();
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

export const getSingleShoe = createAsyncThunk(
  "shoes/getSingleShoe",
  async (id, thunkAPI) => {
    try {
      return await getSneakerById(id);
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

export const sortByPiceLowToHigh = createAction("shoes/sortByPriceLowToHigh");
export const sortByPiceHighToLow = createAction("shoes/sortByPriceHighToLow");
export const sortByNewest = createAction("shoes/sortByNewest");

export const searchShoes = createAction("shoes/search");

export const shoeSlice = createSlice({
  name: "shoe",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShoes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShoes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shoes = action.payload;
        const brands = [];
        state.shoes.forEach((shoe) => {
          if (!brands.includes(shoe.brand)) {
            brands.push(shoe.brand);
          }
        });
        state.brands = brands;
      })
      .addCase(getShoes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleShoe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleShoe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shoe = action.payload;
      })
      .addCase(getSingleShoe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sortByPiceLowToHigh, (state) => {
        state.shoes = state.shoes.sort((a, b) => a.retailPrice - b.retailPrice);
      })
      .addCase(sortByPiceHighToLow, (state) => {
        state.shoes = state.shoes.sort((a, b) => b.retailPrice - a.retailPrice);
      })
      .addCase(sortByNewest, (state) => {
        state.shoes = state.shoes.sort(
          (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
        );
      })
      .addCase(searchShoes, (state, action) => {
        const searchFilter = new RegExp(action.payload, "i");
        state.searched = state.shoes.filter(
          (shoe) => shoe.title.search(searchFilter) !== -1
        );
      });
  },
});

export const { reset } = shoeSlice.actions;
export default shoeSlice.reducer;
