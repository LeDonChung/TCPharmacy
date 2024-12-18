import { createSlice } from '@reduxjs/toolkit'
import { CartModel } from '../../../domain/models/CartModel';
import { CartDetailModel } from '../../../domain/models/CartDetailModel';
const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: new CartModel(),
    },
    reducers: {
        addProductToCart: (state, action) => { 
            const detail = action.payload.cartDetail;


            const cart = state.value;

            const index = cart.cartItems.findIndex((value) => value.medicine.id === detail.medicine.id);


            if (index !== -1) {
                cart.cartItems[index].quantity += detail.quantity;
            } else {
                cart.cartItems.push(detail);
            } 

            state.value = { ...cart, totalPrices: cart.totalPrices };

        },
        removeCartDetailFromCart: (state, action) => {
            const detail = action.payload.cartDetail;

            const cart = state.value;
            const index = cart.cartItems.findIndex((value) => value.medicine.id === detail.medicine.id);
            if (index !== -1) {
                cart.cartItems.splice(index, 1);
            }

            state.value = { ...cart };

        },
        updateCartDetail: (state, action) => {
            const detail = action.payload.cartDetail;

            const cart = state.value;
            const index = cart.cartItems.findIndex((value) => value.medicine.id === detail.medicine.id);
            if (index !== -1) {
                cart.cartItems[index] = detail;
            }

            console.log("Cart Updated"+ cart);

            state.value = { ...cart, totalPrices: cart.totalPrices };

        },
        setCart(state, action) {
            state.value = action.payload;
            console.log(state.value)
        }
    },

})

export const { addProductToCart, removeCartDetailFromCart ,updateCartDetail, setCart } = CartSlice.actions

export default CartSlice.reducer