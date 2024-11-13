export class TagModel {
    id: number;
    title: string;
    des: string;
    constructor(id: number, title: string, des: string) {
        this.id = id;
        this.title = title;
        this.des = des;
    }
}