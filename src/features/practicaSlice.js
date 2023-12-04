import { createSlice } from "@reduxjs/toolkit";

export const practicaSlice = createSlice({
  name: "practicas",
  initialState: [],
  reducers: {
    addPracticas: (state, action) => {
      return action.payload;
    },
    addPractica: (state, action) => {
      state.push(action.payload);
    },
    // editPractica: (state, action) => {
    //   const index = state.findIndex(
    //     (practica) => practica.idpractica === action.payload.idpractica
    //   );
    //   state[index] = action.payload;
    // },
    // deletePractica: (state, action) => {
    //   const index = state.findIndex((practica) => practica.idpractica === action.payload);
    //   state.splice(index, 1);
    // },
  },
});

export const { addPracticas, addPractica } = practicaSlice.actions;

export default practicaSlice.reducer;
