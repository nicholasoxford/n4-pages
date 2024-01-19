import { redirect, type TypedResponse } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { ActionFunctionArgs } from "react-router-dom";
import { json } from "react-router-dom";

export async function action({ request, context }: ActionFunctionArgs): Promise<
  | TypedResponse<{
      error: string;
      success: boolean;
    }>
  | TypedResponse<{
      error: null;
      success: boolean;
    }>
> {
  const response = new Response();
  let env = context.env as Env;
  const supabase = createServerClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email.includes("@")) {
    return json({
      error: "invalid email address",
      success: false,
    });
  }

  if (password.length < 8) {
    return json({
      error: "Password should be at least 8 characters",
      success: false,
    });
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return json(
      {
        error: error.message,
        success: false,
      },
      {
        headers: response.headers,
      }
    );
  }
  // Redirect to /index if validation is successful

  return redirect("/", {
    headers: response.headers,
  });
}
