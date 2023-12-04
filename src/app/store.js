import { configureStore } from "@reduxjs/toolkit";

// Acciones
import practicasReducer from "../features/practicaSlice";

export const store = configureStore({
  reducer: {
    practicas: practicasReducer,
  },
});
