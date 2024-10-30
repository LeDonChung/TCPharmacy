export class CartDetailModel {
    quantity: number = 1;
    product: any;

    constructor(product: any, quantity: number) {
        this.quantity = quantity;
        this.product = product;
    }
}