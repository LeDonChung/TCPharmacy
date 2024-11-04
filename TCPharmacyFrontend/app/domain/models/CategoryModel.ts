import { ImageSourcePropType } from "react-native";

export class CategoryModel {
    id: string;
    title: string;
    icon: ImageSourcePropType;
    category: CategoryModel[] = [];
    parentCategory: CategoryModel;

    constructor(id: string, title: string, icon: ImageSourcePropType, category: CategoryModel[], parentCategory: CategoryModel) {
        this.id = id;
        this.title = title;
        this.icon = icon;
        this.category = category;
        this.parentCategory = parentCategory;
    }
}