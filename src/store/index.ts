import { configureStore } from "@reduxjs/toolkit"
import { placesReducer } from "./slices/places-slice"


const store = configureStore({
 reducer: {
  places: placesReducer
 }
})

export type RootState = ReturnType<typeof store.getState>

export default store;