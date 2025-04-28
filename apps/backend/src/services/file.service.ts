import { FileRepository } from "../repositories/file.repository"

export class FileService {
    static async getFilesByFolderId(folderId: number) {
        const file = await FileRepository.getFilesByFolderId(folderId);
        const data = file.map(folder => {
            const date = folder.updatedAt ? new Date(folder.updatedAt) : null;
            const formattedDate = `${date?.getDate().toString().padStart(2, '0')}-${(date ? date.getMonth() + 1 : 1).toString().padStart(2, '0')}-${date?.getFullYear()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
            return {
                ...folder,
                updatedAt: formattedDate,
            };
        });

        return {
            data
        }
    }

    static async storeFile(folderId: number, file: File) {

        const extension = file.name.split('.').pop();
        const name = file.name;
        const baseDir = "files/";
        const path = `${baseDir}${name}`;

        // store file
        const bytes = await Bun.write(path, file);

        const payload = {
            name: name,
            folderId: folderId,
            size: Math.ceil(bytes / 1024),
            mimeType: extension,
            storagePath: path
        };

        const result = await FileRepository.store(payload);

        const data = result.map(file => {
            const date = file.updatedAt ? new Date(file.updatedAt) : null;
            const formattedDate = `${date?.getDate().toString().padStart(2, '0')}-${(date ? date.getMonth() + 1 : 1).toString().padStart(2, '0')}-${date?.getFullYear()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
            return {
                ...file,
                updatedAt: formattedDate,
            };
        });

        return {
            data: data
        }
    }
}