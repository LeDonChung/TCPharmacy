import { TagModel } from "./TagModel";

export class TagGroupModel {
    id: number;
    groupName: string;
    des: string;
    tags: TagModel[];
    constructor(id?: number, groupName?: string, des?: string, tags?: TagModel[]) {
        this.id = id || 0;
        this.groupName = groupName || "";
        this.des = des || ""; 
        this.tags = tags || [];
    }
}