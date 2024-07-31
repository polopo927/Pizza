import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {
      url,
      category,
      search,
      sortBy
    } = params
    const res = await axios.get(`${url}${category}${sortBy}${search}`)
    return res.data
  },
)

const initialState = {
  pizzas: [],
  status: 'loading'
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.pizzas = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success'
      state.pizzas = action.payload
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
      state.pizzas = []
    }
  }
})

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer