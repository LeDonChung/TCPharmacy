import { PriceUtils } from "../utils/PriceUtils";
import { AddressModel } from "./AddressModel";
import { AddressType } from "./AddressType";
import { CartDetailModel } from "./CartDetailModel";

export class CartModel {
    point: number;

    usePoint: boolean;

    feeShip: number;

    exportInvoice: boolean;

    user: number;

    address: AddressModel;

    note: string;
    
    cartItems: CartDetailModel[] = [];

    
    constructor(point?: number, usePoint?: boolean, feeShip?: number, exportInvoice?: boolean, user?: number, address?: AddressModel, cartItems?: CartDetailModel[], customer?: string, note?: string) {
        this.point = point || 0;
        this.usePoint = usePoint || false;
        this.feeShip = feeShip || 0;
        this.exportInvoice = exportInvoice || false;
        this.user = user || 0;
        this.address = address || new AddressModel();
        this.cartItems = cartItems || [];
        this.customer = customer || "";
        this.note = note || "";
    }

    public totalPrices(): number {
        return this.cartItems.filter((value) => value.isChoose).reduce((total, item) => total + PriceUtils.calculateSalePrice(item.price, item.discount) * item.quantity, 0);
    }

}