export class MenuModal {
    id: string;
    name: string;
    menuItem: MenuModal[];
    onPress: () => void;
    constructor(id: string, name: string, menuItem: MenuModal[], onPress: () => void) {
        this.id = id;
        this.name = name;
        this.menuItem = menuItem;
        this.onPress = onPress;
    }
}