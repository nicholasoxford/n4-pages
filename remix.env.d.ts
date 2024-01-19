/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  NODE_ENV: string;
  R2_BUCKET: R2Bucket;
  DB: D1Database;
  R2_PUBLIC_URL: string;
  ACCOUNT_IDENTIFIER: string;
  CF_API_KEY: string;
  ZONE_ID: string;
  WORKER_QUEUE: Queue;
  KV: KVNamespace;
}
