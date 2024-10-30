import { createSlice } from '@reduxjs/toolkit'
import { CartModel } from '../../../domain/models/CartModel';
const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: new CartModel([]),
    },
    reducers: {
        addProductToCart: (state, action) => {
            console.log(action.payload.cartDetail)
            state.value.addProductToCart(action.payload.cartDetail);
            console.log(state.value);
        },
        removeProductFromCart: (state, action) => {
            state.value.removeProductFromCart(action.payload.cartDetail);
            console.log(state.value);
        },
        updateProductQuantity: (state, action) => {
            state.value.updateProductQuantity(action.payload.cartDetail, action.payload.quantity);
            console.log(state.value);
        },
    },

})

export const { addProductToCart, removeProductFromCart, updateProductQuantity } = CartSlice.actions

export default CartSlice.reducer