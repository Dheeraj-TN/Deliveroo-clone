import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: "",
    image: "",
    title: "",
    rating: "",
    genre: "",
    addr: "",
    shortDesc: "",
    dishes: [],
    long: "",
    lat: "",
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;
//used to access the global basket items
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
