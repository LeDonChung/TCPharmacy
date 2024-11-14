export class OrderDetailModel {
    orderId: number;

    medicineId: number;

    quantity: number;

    price: number;

    discount: number;

    constructor(orderId?: number, medicineId?: number, quantity?: number, price?: number, discount?: number) {
        this.orderId = orderId || 0;
        this.medicineId = medicineId || 0;
        this.quantity = quantity || 0;
        this.price = price || 0;
        this.discount = discount || 0;
    }
} 