import { ImageSourcePropType } from "react-native";

export class ProductModel {
    id: number;
    images: ImageSourcePropType[];  // Array of image paths
    price: number;
    unit: string;
    specifications: string;
    category: string;
    desShort: string;
    name: string;
    brand: string;
    star: number;
    reviews: number;
    discount: number;
    des: string;

    constructor(id: number, images: ImageSourcePropType[], price: number, unit: string, specifications: string, category: string, desShort: string, name: string, brand: string, star: number, reviews: number, discount: number, des: string) {
        this.id = id;
        this.images = images;
        this.price = price;
        this.unit = unit;
        this.specifications = specifications;
        this.category = category;
        this.desShort = desShort;
        this.name = name;
        this.brand = brand;
        this.star = star;
        this.reviews = reviews;
        this.discount = discount;
        this.des = des;
    }
};