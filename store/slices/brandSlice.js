import {createSlice} from '@reduxjs/toolkit';

const brandFlyersSlice = createSlice({
  name: 'brandFlyers',
  initialState: [],
  reducers: {
    toggleBrandFlyer: (state, action) => {
      const flyer = action.payload;
      const index = state.findIndex(item => item.id === flyer.id);

      if (index !== -1) {
        // Remove the flyer if it exists
        state.splice(index, 1);
      } else {
        // Add the flyer if it doesn't exist
        state.push(flyer);
      }
    },
  },
});

export const {toggleBrandFlyer} = brandFlyersSlice.actions;
export default brandFlyersSlice.reducer;
