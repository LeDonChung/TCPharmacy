import { ImageSourcePropType } from "react-native";

export class CategoryModel {
    id: number;

    fullPathSlug: string;

    title: string;

    level: number;

    icon: string;

    parent: number;

    children: CategoryModel[];

    constructor(id: number, fullPathSlug: string, title: string, level: number, icon: string, parent: number, children: CategoryModel[]) {
        this.id = id;
        this.fullPathSlug = fullPathSlug;
        this.title = title;
        this.level = level;
        this.icon = icon;
        this.parent = parent;
        this.children = children;
    }
}