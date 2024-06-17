import { createSlice } from "@reduxjs/toolkit";


const favoriteProduct = createSlice({
    name: "favoriteproduct",
    initialState: {
        products: [],
        counter: 0,
    },
    reducers: {
        addToFav(state, action) {
            state.products.push(action.payload);
            state.counter += 1;
        },
        removeFromFav(state, action) {
            const idToRemove = action.payload
            if (state.counter > 0)
                state.counter -= 1
            state.products = state.products.filter((product) => product.id != idToRemove)
        },
    },
});

export default favoriteProduct.reducer;

export const { addToFav, removeFromFav } = favoriteProduct.actions;