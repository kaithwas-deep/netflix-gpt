import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        gptSearchView: false
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.gptSearchView = !state.gptSearchView;
        }
    }
})

export const { toggleGptSearchView } = gptSlice.actions;

export default gptSlice.reducer;