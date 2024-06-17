import { configureStore } from "@reduxjs/toolkit";
// import addToCartSlice  from "./slices/addToCartSlice";
// import favoriteSlice from "./slices/favoriteSlice";
// import productDataSlice from "./slices/productDataSlice";
import changemodeslice from "./slices/changemodeslice";
// import reviewSlice from "./slices/reviewSlice";

const store = configureStore({
    reducer: {
        // addtocart: addToCartSlice,
        // favoriteproduct: favoriteSlice,
        // productData: productDataSlice,
        mode: changemodeslice,
        // reviewData: reviewSlice,
    },
})



 
export default store;