import { CartDetailModel } from "./CartDetailModel";

export class CartModel {
    
    cartItems: CartDetailModel[] = [];

    constructor(cartItems: CartDetailModel[]) {
        this.cartItems = cartItems;
    }
    public totalPrices(): number {
        return this.cartItems.filter((value) => value.isChoose).reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

}