import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  header: '',
}

const MainViewSlice = createSlice({
  name: 'MainView',
  initialState,
  reducers: {
    setId: (state, action) => {
      const newId = action.payload.id
      state.id = newId;
    },
    setHeader: (state, action) => {
      const newHeader = action.payload.header
      state.header = newHeader;
    }
  }
})
export const { setId, setHeader } = MainViewSlice.actions;
export default MainViewSlice.reducer;