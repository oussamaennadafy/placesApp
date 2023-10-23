import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Place from "../../types/Place";

interface StateType
{
 places: Place[],
}

const initialState: StateType = {
 places: [],
}

const slice = createSlice({
 name: "places",
 initialState,
 reducers: {
  addPlace: (state, action: PayloadAction<any>) =>
  {
   state.places.unshift(action.payload)
  },
 }
})

const { actions: placesAction, reducer: placesReducer } = slice;

export
{
 placesAction,
 placesReducer
}