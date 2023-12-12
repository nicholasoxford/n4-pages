/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  NODE_ENV: string;
  BUCKET_NAME_REPLACE: R2Bucket;
  DB: D1Database;
  R2_PUBLIC_URL: string;
}
