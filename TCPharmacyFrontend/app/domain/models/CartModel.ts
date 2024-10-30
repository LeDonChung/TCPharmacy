import { CartDetailModel } from "./CartDetailModel";

export class CartModel {
    
    cartItems: CartDetailModel[] = [];

    constructor(cartItems: CartDetailModel[]) {
        this.cartItems = cartItems;
    }


    public totalPrices(): number {
        return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    public addProductToCart(cartDetail: CartDetailModel): void {
        if(this.cartItems.some((item) => item.product.id === cartDetail.product.id)) {
            this.updateProductQuantity(cartDetail.product, cartDetail.quantity);
        } else {
            this.cartItems.push(cartDetail);
        }
    }

    public removeProductFromCart(product: any): void {
        this.cartItems = this.cartItems.filter((item) => item.product.id !== product.id);
    }

    public updateProductQuantity(product: any, quantity: number): void {
        this.cartItems = this.cartItems.map((item) => {
            if (item.product.id === product.id) {
                item.quantity = quantity;
            }
            return item;
        });
    }


}