import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { value: 0,
    loading: false,
    listData: [],
    ListDataById:[] 
};

export const getUser = createAsyncThunk("listing", async () => {
  try {
    const response = await axios.get("http://localhost:3000/employees");
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteData = createAsyncThunk("deleteData", async (id) => {
  try {
    axios.delete(`http://localhost:3000/employees/${id}`);
  } catch (error) {
    console.error(error);
  }
});

export const postUser = createAsyncThunk("AddData", async (data) => {
  try {
    axios.post("http://localhost:3000/employees", data);
  } catch (error) {
    console.error(error);
  }
});

export const getUserById = createAsyncThunk("getById", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const updateUserById = createAsyncThunk("updateDataById", async (data) => {
  try {
    await axios.put(`http://localhost:3000/employees/${data.id}`, data);
  } catch (error) {
    console.error(error);
  }
});

const listingapi = createSlice({
  name: "listdata",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.listData = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [getUserById.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.loading = false;
      state.ListDataById = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default listingapi.reducer;
