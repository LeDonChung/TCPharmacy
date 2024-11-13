import { MedicineModel } from "./MedicineModel";

export class TagModel {
    id: number;
    title: string;
    des: string;
    medicines: MedicineModel[] ;

    constructor(id?: number, title?: string, des?: string, medicines?: MedicineModel[]) {
        this.id = id || 0;
        this.title = title || "";
        this.des = des || "";
        this.medicines = medicines || [];
    }
}