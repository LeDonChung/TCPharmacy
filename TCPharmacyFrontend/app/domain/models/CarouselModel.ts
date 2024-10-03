export class CarouselModel {
    id: number | any;
    image: string | any;
    title: string | any;
    description: string | any;
    constructor(id: string, title: string, description: string, image: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
    }
}