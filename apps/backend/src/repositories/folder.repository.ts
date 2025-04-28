import { eq, isNull, sql } from "drizzle-orm";
import { db } from "../configs/db";
import { folders } from "../configs/db/schema";

export class FolderRepository {
    static async getAllParentFolders() {
        return await db.select({
            id: folders.id,
            name: folders.name,
            parentId: folders.parentId,
            updatedAt: folders.updatedAt,
            hasChild: sql.raw(`
                EXISTS (
                    SELECT 1
                    FROM folders AS child
                    WHERE child.parent_id = folders.id
                )
            `).as('hasChild')
        })
            .from(folders)
            .where(isNull(folders.parentId))
            .orderBy(folders.name);
    }

    static async getSubFolders(parentId: number) {
        return await db.select({
            id: folders.id,
            name: folders.name,
            parentId: folders.parentId,
            updatedAt: folders.updatedAt,
            hasChild: sql.raw(`
                EXISTS (
                    SELECT 1
                    FROM folders AS child
                    WHERE child.parent_id = folders.id
                )
            `).as('hasChild')
        })
            .from(folders)
            .where(eq(folders.parentId, parentId))
            .orderBy(folders.name);
    }

    static async createFolder(name: string, parentId: number | null) {
        return await db.insert(folders)
            .values({ name, parentId })
            .returning({
                id: folders.id,
                name: folders.name,
                parentId: folders.parentId,
                updatedAt: folders.updatedAt,
            });
    }

    static async updateFolderName(name: string, id: number) {
        return await db.update(folders)
            .set({ name, updatedAt: sql`NOW()` })
            .where(eq(folders.id, id))
            .returning();
    }

    static async deleteFolder(id: number) {
        return await db.delete(folders).where(eq(folders.id, id)).returning({ id: folders.id });
    }
}