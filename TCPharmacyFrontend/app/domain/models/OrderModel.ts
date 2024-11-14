import { AddressModel } from "./AddressModel";
import { OrderDetailModel } from "./OrderDetailModel";

export class OrderModel {
    point: number;

    usePoint: boolean;

    feeShip: number;

    exportInvoice: boolean;

    user: number;

    note: string;


    orderDetails: OrderDetailModel[];

    address: AddressModel;

    constructor(point?: number, usePoint?: boolean, feeShip?: number, exportInvoice?: boolean, user?: number, note?: string, orderDetails?: OrderDetailModel[], address?: AddressModel) {
        this.point = point || 0;
        this.usePoint = usePoint || false;
        this.feeShip = feeShip || 0;
        this.exportInvoice = exportInvoice || false;
        this.user = user || 0;
        this.note = note || "";
        this.orderDetails = orderDetails || [];
        this.address = address || new AddressModel();
    }

}