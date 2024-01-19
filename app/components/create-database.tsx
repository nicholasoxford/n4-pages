import { useFetcher } from "@remix-run/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
export default function CreateDatabase() {
  const fetcher = useFetcher();

  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create a Database</CardTitle>
        <CardDescription>
          Please fill out the information below to create a new database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <fetcher.Form
          action="/create-database"
          method="post"
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Database Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="my-favorite-cars"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <CardFooter>
            <Button className="w-full">Create</Button>
          </CardFooter>
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}
