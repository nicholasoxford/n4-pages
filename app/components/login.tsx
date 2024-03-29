import { Form, useActionData } from "@remix-run/react";
import {} from "react-router";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { SetURLSearchParams } from "react-router-dom";
import type { action } from "~/routes/sign-in";

export default function Login({
  isSignUp,
  setSearchParams,
}: {
  isSignUp?: boolean;
  setSearchParams?: SetURLSearchParams;
}) {
  const data = useActionData<typeof action>();
  return (
    <>
      <Card className="border-2 border-dashed w-80 h-96 border-gray-500 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 max-w-lg mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Sign Up" : "Login "}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-left">
          <Form method="post" action={isSignUp ? "/sign-up" : "/sign-in"}>
            <div className="space-y-2">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="test@example.com"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" required type="password" />
            </div>
            <Button
              className="w-full bg-green-500 text-white py-2 rounded-lg mt-4"
              variant="default"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            {data?.error && (
              <div className="text-red-500 text-sm text-center">
                {data.error}
              </div>
            )}
          </Form>
        </CardContent>
        {!isSignUp && (
          <CardFooter className="mt-2 text-center text-sm">
            Don't have an account?
            <Button
              className="underline ml-1 text-green-500"
              onClick={() => setSearchParams?.({ isSignUp: "true" })}
            >
              Sign up
            </Button>
          </CardFooter>
        )}
        {isSignUp && (
          <CardFooter className="mt-2 text-center text-sm ml-1">
            Already have an account?{" "}
            <Button
              className="underline text-green-500"
              onClick={() => setSearchParams?.({ isSignUp: "false" })}
            >
              Log in
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
