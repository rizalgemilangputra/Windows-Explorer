export default interface IFolder {
    id: number;
    name: string;
    parentId?: number | null;
    isOpen: boolean;
    isActive: boolean;
    hasChild: boolean;
    updatedAt: string;
    childs: IFolder[];
}