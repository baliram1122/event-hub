import { createSlice } from "@reduxjs/toolkit";

const changemodeSlice = createSlice({
    name: 'changemodeslice',
    initialState: {
        darkMode: false,
    },
    reducers: {
        changeMode: (state, action) => {
            state.darkMode = !state.darkMode
        }
    }
})



export default changemodeSlice.reducer;

export const { changeMode } = changemodeSlice.actions;