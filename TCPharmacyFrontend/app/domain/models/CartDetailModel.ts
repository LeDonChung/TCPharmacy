import { MedicineModel } from "./MedicineModel";

export class CartDetailModel {
    quantity: number = 1;
    medicine: MedicineModel;
    isChoose: boolean = true;
    price: number;
    discount: number;

    constructor(quantity?: number, medicine?: MedicineModel, isChoose?: boolean, price?: number, discount?: number) {
        this.quantity = quantity || 1;
        this.medicine = medicine || new MedicineModel();
        this.isChoose = isChoose || true;
        this.price = price || 0;
        this.discount = discount || 0;
    }

    
}