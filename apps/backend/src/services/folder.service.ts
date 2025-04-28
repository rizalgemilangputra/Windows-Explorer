import { FolderRepository } from "../repositories/folder.repository";

export class FolderService {
    static async getAllParentFolders() {
        const folders = await FolderRepository.getAllParentFolders();
        const data = folders.map(folder => {
            const date = folder.updatedAt ? new Date(folder.updatedAt) : null;
            const formattedDate = `${date?.getDate().toString().padStart(2, '0')}-${(date ? date.getMonth() + 1 : 1).toString().padStart(2, '0')}-${date?.getFullYear()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
            return {
                ...folder,
                updatedAt: formattedDate,
            };
        });

        return {
            data: data
        }
    }

    static async getSubFolders(parentId: number) {
        const folders = await FolderRepository.getSubFolders(parentId);
        const data = folders.map(folder => {
            const date = folder.updatedAt ? new Date(folder.updatedAt) : null;
            const formattedDate = `${date?.getDate().toString().padStart(2, '0')}-${(date ? date.getMonth() + 1 : 1).toString().padStart(2, '0')}-${date?.getFullYear()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
            return {
                ...folder,
                updatedAt: formattedDate,
            };
        });

        return {
            data: data
        }
    }

    static async createFolder(name: string, parentId: number | null) {
        const folders = await FolderRepository.createFolder(name, parentId);
        const data = folders.map(folder => {
            const date = folder.updatedAt ? new Date(folder.updatedAt) : null;
            const formattedDate = `${date?.getDate().toString().padStart(2, '0')}-${(date ? date.getMonth() + 1 : 1).toString().padStart(2, '0')}-${date?.getFullYear()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
            return {
                ...folder,
                updatedAt: formattedDate,
            };
        });

        return {
            data: data
        }
    }

    static async updateFolderName(name: string, id: number) {
        const folders = await FolderRepository.updateFolderName(name, id);
        const data = folders.map(folder => {
            const date = folder.updatedAt ? new Date(folder.updatedAt) : null;
            const formattedDate = `${date?.getDate().toString().padStart(2, '0')}-${(date ? date.getMonth() + 1 : 1).toString().padStart(2, '0')}-${date?.getFullYear()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
            return {
                ...folder,
                updatedAt: formattedDate,
            };
        });

        return {
            data: data
        }
    }

    static async deleteFolder(id: number) {
        const folder = await FolderRepository.deleteFolder(id);

        return {
            data: folder
        }
    }
}