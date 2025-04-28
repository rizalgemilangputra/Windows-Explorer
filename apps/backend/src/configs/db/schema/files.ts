import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { folders } from './folders';

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  folderId: integer('folder_id')
    .references(() => folders.id, { onDelete: 'cascade' })
    .notNull(),
  size: integer('size').notNull(),
  mimeType: text('mime_type').notNull(),
  storagePath: text('storage_path').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});