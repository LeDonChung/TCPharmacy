export class BrandModel {
    id: number;

    title: string;

    image: string;

    imageProduct: string;

    constructor(id?: number, title?: string, image?: string, imageProduct?: string) {
        this.id = id || 0;
        this.title = title || '';
        this.image = image || '';
        this.imageProduct = imageProduct || '';
    }
}