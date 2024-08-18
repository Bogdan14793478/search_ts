import { createSlice } from '@reduxjs/toolkit'

const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    allPets: [],
    filteredPets: [],
    lastCurrent: {},
    error: '',
    loading: true,
  },
  reducers: {
    setAllPets: (state, action) => {
      state.allPets = action.payload
    },
    startLoad: (state, action) => {
      state.loading = action.payload
    },
    finishLoad: (state, action) => {
      state.loading = action.payload
    },
    setLastCurrent: (state, action) => {
      state.lastCurrent = action.payload
    },
    setFilteredPets: (state, action) => {
      state.filteredPets = action.payload
    },
  },
})

export const actions = petsSlice.actions

export default petsSlice.reducer
