import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";
import type { Database } from "schemas";
import CreateDatabase from "~/components/create-database";
import { columns } from "~/components/database-table/columns";
import { DatabaseTable } from "~/components/database-table/database-table";
import Login from "~/components/login";

export const meta: MetaFunction = () => {
  return [
    { title: "A Lot Of Databases" },
    {
      name: "description",
      content: "The easiest way to create a lot of databases",
    },
  ];
};

export default function Index() {
  const { session, assets } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log({
    session,
    assets,
  });
  // parse string to boolean
  const isSignUpParse = searchParams.get("isSignUp") === "true";
  const [isSignUp, setSignUp] = useState(true);

  useEffect(() => {
    if (!searchParams.get("isSignUp")) return;

    setSignUp(isSignUpParse);
  }, [isSignUpParse, searchParams]);

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="flex text-center justify-center flex-col  min-h-screen w-full "
    >
      <div>
        <h1 className="mb-2">Welcome to A Lot Of Databases</h1>
      </div>

      {session ? (
        <div>
          <div className="w-full flex justify-center align-middle items-center">
            <CreateDatabase />
          </div>

          {!!assets && (
            <div className="container mx-auto py-10">
              <DatabaseTable
                columns={columns}
                data={assets.map((asset) => ({
                  ...asset,
                  created_at:
                    new Date(asset.created_at + "Z").toLocaleTimeString() +
                    " " +
                    new Date(asset.created_at).toLocaleDateString(),
                  updated_at: new Date(asset.updated_at).toLocaleDateString(),
                }))}
              />
            </div>
          )}
        </div>
      ) : (
        <Login isSignUp={isSignUp} setSearchParams={setSearchParams} />
      )}
      <h1 className="mt-2">
        {" "}
        Create more databases than days in an year, or centuries!
      </h1>
    </div>
  );
}
export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  let env = context.env as Env;
  const db = env.DB;
  const response = new Response();
  const supabase = createServerClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return json(
      {
        session,
        assets: null,
      },
      {
        headers: response.headers,
      }
    );
  }

  const { results } = await db
    .prepare(
      "SELECT * FROM databases WHERE user_id = ? ORDER BY created_at DESC"
    )
    .bind(session.user.id)
    .all<Database>();
  return json(
    {
      session,
      assets: results,
    },
    {
      headers: response.headers,
    }
  );
};
