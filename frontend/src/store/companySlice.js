import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

/* ============================================
   CREATE COMPANY PROFILE
============================================ */
export const createCompany = createAsyncThunk(
  "company/create",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/company/register", formData);
      return res.data.data; // returns the created company object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to create company profile"
      );
    }
  }
);

/* ============================================
   GET COMPANY PROFILE
============================================ */
export const getCompany = createAsyncThunk(
  "company/get",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/company/profile");
      return res.data.data; // returns company object
    } catch (err) {
      return thunkAPI.rejectWithValue("No company profile found");
    }
  }
);

/* ============================================
   UPDATE COMPANY PROFILE
============================================ */
export const updateCompany = createAsyncThunk(
  "company/update",
  async (formData, thunkAPI) => {
    try {
      const res = await API.put("/company/update", formData);
      return res.data.data; // updated company
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to update company profile"
      );
    }
  }
);

/* ============================================
   SLICE
============================================ */
const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ----- CREATE COMPANY ----- */
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ----- GET COMPANY ----- */
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ----- UPDATE COMPANY ----- */
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
