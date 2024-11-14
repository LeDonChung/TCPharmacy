import { ImageSourcePropType } from "react-native";

export class CategoryModel {
    id: number;

    fullPathSlug: string;

    title: string;

    level: number;

    icon: string;

    parent: number;

    children: CategoryModel[];

    constructor(id?: number, fullPathSlug?: string, title?: string, level?: number, icon?: string, parent?: number, children?: CategoryModel[]) {
        this.id = id || 0;
        this.fullPathSlug = fullPathSlug || '';
        this.title = title || '';
        this.level = level || 0;
        this.icon = icon || '';
        this.parent = parent || 0;
        this.children = children || [];
    }
}