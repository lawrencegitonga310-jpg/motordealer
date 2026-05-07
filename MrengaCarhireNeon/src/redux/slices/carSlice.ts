import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Car {
  id: number;
  product_name: string;
  product_description: string;
  product_cost: string;
  product_photo: string;
}

interface CarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    fetchCarsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCarsSuccess: (state, action: PayloadAction<Car[]>) => {
      state.loading = false;
      state.cars = action.payload;
    },
    fetchCarsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCars } = carSlice.actions;
export default carSlice.reducer;
