import { z } from "zod";

export const createDatabaseFormSchema = z.object({
  name: z.string(),
});

export type CreateDatabaseFormSchema = z.infer<typeof createDatabaseFormSchema>;

export const createDatabaseFormSchemaResponse = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const DatabaseSchema = z.object({
  id: z.number(), // INTEGER PRIMARY KEY AUTOINCREMENT
  name: z.string(), // TEXT NOT NULL
  description: z.string().nullable(), // TEXT, can be NULL
  user_id: z.number(), // INTEGER NOT NULL
  size: z.number().nullable(), // INTEGER, can be NULL
  created_at: z.date().or(z.string()), // DATETIME NOT NULL
  updated_at: z.date().or(z.string()), // DATETIME NOT NULL
  uuid: z.string().nullable(), // TEXT, can be NULL
  worker_url: z.string().nullable(), // TEXT, can be NULL
  host: z.string().nullable(), // TEXT, can be NULL
  port: z.number().nullable(), // INTEGER, can be NULL
  db_type: z.string(), // TEXT NOT NULL
});

export type Database = z.infer<typeof DatabaseSchema>;

export const CreateDBWorkerSchema = z.object({
  user_id: z.number(),
  database_id: z.number(),
  name: z.string(),
});

export const querySchema = z.object({
  query: z.string(),
  database_name: z.string().optional(),
});

export const CreateDatabaseQueueSchema = z.object({
  user_id: z.string(),
  database_uuid: z.string(),
  name: z.string(),
  KV_KEY: z.string(),
});

export type CreateDatabaseQueueSchemaType = z.infer<
  typeof CreateDatabaseQueueSchema
>;
