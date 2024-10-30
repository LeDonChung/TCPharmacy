export class CartDetailModel {
    quantity: number = 1;
    product: any;
    isChoose: boolean = true;
    constructor(product: any, quantity: number, isChoose: boolean) {
        this.quantity = quantity;
        this.product = product;
        this.isChoose = isChoose;
    }
}