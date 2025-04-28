import { eq } from "drizzle-orm";
import { files } from "../configs/db/schema";
import { db } from "../configs/db";

export class FileRepository {
    static async getFilesByFolderId(folderId: number) {
        return await db.select({ id: files.id, folderId: files.folderId, name: files.name, size: files.size, mimeType: files.mimeType, updatedAt: files.updatedAt })
            .from(files)
            .where(eq(files.folderId, folderId))
            .orderBy(files.name);
    }

    static async store(payload: any) {
        return await db.insert(files)
            .values(payload)
            .returning({ id: files.id, folderId: files.folderId, name: files.name, size: files.size, mimeType: files.mimeType, updatedAt: files.updatedAt });
    }
}