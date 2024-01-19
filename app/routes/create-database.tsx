import { json, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { CreateDatabaseQueueSchemaType } from "schemas";
import { CreateDatabaseQueueSchema, createDatabaseFormSchema } from "schemas";
export async function action({ request, context }: ActionFunctionArgs) {
  // grab server side env variables from context
  const env = context.env as Env;
  const body = await request.formData();

  // parse the body
  const parseResponse = await createDatabaseFormSchema.safeParseAsync({
    name: body.get("name"),
  });

  if (!parseResponse.success) {
    return new Response(parseResponse.error.toString(), { status: 400 });
  }

  const { name } = parseResponse.data;

  const response = new Response();

  const supabase = createServerClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const KV_KEY = `${session.user.id}-database-${name}`;

  const progressData: progressData = {
    databaseCreated: false,
    workerCreated: false,
    routeCreated: false,
  };

  await env.KV.put(KV_KEY, JSON.stringify(progressData));
  let create_database_url = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_IDENTIFIER}/d1/database`;

  let create_database_option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.CF_API_KEY}`,
    },
    body: JSON.stringify({
      name,
    }),
  };

  const createDatabaseResponse = await fetch(
    create_database_url,
    create_database_option
  );
  const RESPONSE_JSON = (await createDatabaseResponse.json()) as any;
  progressData.databaseCreated = true;
  const D1_RESPONSE = await env.DB.prepare(
    `INSERT INTO databases (name, db_type, user_id) VALUES (?, ?, ?);`
  )
    .bind(name, "sqllite", session.user.id)
    .run();
  await env.KV.put(KV_KEY, JSON.stringify(progressData));
  const queueBody = await CreateDatabaseQueueSchema.safeParseAsync({
    user_id: session.user.id,
    database_uuid: RESPONSE_JSON.result.uuid,
    name,
    KV_KEY,
  } as CreateDatabaseQueueSchemaType);

  if (!queueBody.success) {
    return new Response(queueBody.error.toString(), { status: 400 });
  }

  await env.WORKER_QUEUE.send(JSON.stringify(queueBody));

  return json({
    D1_RESPONSE: D1_RESPONSE.results,
    RESPONSE_JSON,
    KV_KEY,
  });
}

type progressData = {
  databaseCreated: boolean;
  workerCreated: boolean;
  routeCreated: boolean;
  database_uuid?: string;
  database_name?: string;
};
