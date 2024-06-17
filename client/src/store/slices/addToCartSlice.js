import { createSlice } from "@reduxjs/toolkit";


const addToCartSlice = createSlice({
    name: "addtocart",
    initialState: {
        products: [],
        counter: 0,
        subTotal: 0,
    },
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
            state.counter += 1;
        },
        removeProduct(state, action) {
            const idToRemove = action.payload;
            state.counter -= 1;
            state.products = state.products.filter((product) => product.id != idToRemove)
        },
        incrementTotal(state, action) {
            const productId = action.payload;
            state.products = state.products.map((product) => {
                if (product.id == productId) {
                    state.subTotal += product.currentPrice
                    return { ...product, quantityCounter: product.quantityCounter + 1, cartTotal: product.cartTotal + product.currentPrice }
                } else {
                    return product
                }
            })
        },
        decrementTotal(state, action) {
            const productId = action.payload;
        
            state.products = state.products.map((product) => {
                if (product.id == productId) {
                    if (state.subTotal > product.currentPrice) {
                        state.subTotal -= product.currentPrice;
                    }
                    if (product.quantityCounter >= 2) {
                        return { ...product, quantityCounter: product.quantityCounter - 1, cartTotal: product.cartTotal - product.currentPrice };
                    } else {
                        return product;
                    }
                }
                return product; 
            });
        },        
        updateSubtotal(state, action) {
            state.subTotal += action.payload
        }
    },
});

export default addToCartSlice.reducer;

export const { addProduct, removeProduct, incrementTotal, decrementTotal, updateSubtotal } = addToCartSlice.actions;