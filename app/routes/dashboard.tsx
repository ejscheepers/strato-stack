import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { todo } from "@/models/schema";
import { db } from "@/utils/db.server";
import { eq, ne } from "drizzle-orm";
import { useRef } from "react";
import { Form, redirect, useLoaderData, useSubmit } from "react-router";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  let session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw redirect("/login");
  }

  const todoData = await db
    .select()
    .from(todo)
    .where(ne(todo.completed, "true"));

  return { todoData };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const action = String(formData.get("_action") || "");

  if (action === "completion") {
    const todoId = String(formData.get("todoId") || "");
    await db.update(todo).set({ completed: "true" }).where(eq(todo.id, todoId));
    return redirect(`/dashboard`);
  } else if (action === "addTodo") {
    const todoData = String(formData.get("todo") || "");
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      throw redirect("/login");
    }

    await db.insert(todo).values({ text: todoData, userId: session.user.id });

    return redirect(`/dashboard`);
  } else if (action === "delete") {
    const todoId = String(formData.get("todoId") || "");
    await db.delete(todo).where(eq(todo.id, todoId));
    return redirect(`/dashboard`);
  }
}

export default function Dashboard() {
  const { todoData } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex min-h-full flex-1 flex-col sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full">
        <h2
          id="dashboard-header"
          className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Dashboard
        </h2>
      </div>
      <Form
        ref={formRef}
        className="mt-6 sm:mx-auto sm:w-full"
        method="post"
        onSubmit={(event) => {
          submit(event.currentTarget);
          event.currentTarget.reset();
          event.preventDefault();
        }}
      >
        <div className="flex items-center gap-3">
          <Input type="text" name="todo" id="todo" placeholder="Add a todo" />
          <input type="hidden" name="_action" value="addTodo" />
          <Button type="submit">Add Todo</Button>
        </div>
      </Form>
      <div className="mt-6 sm:mx-auto sm:w-full">
        <div className="flex flex-col gap-1">
          {todoData.map((todo: any) => (
            <div key={todo.id} className="flex items-center justify-between">
              <div className="text-lg">{todo.text}</div>
              <div className="flex flex-row gap-1">
                <Form method="post">
                  <input type="hidden" name="todoId" value={todo.id} />
                  <input type="hidden" name="_action" value="completion" />
                  <Button variant="outline" type="submit">
                    Complete
                  </Button>
                </Form>
                <Form method="post">
                  <input type="hidden" name="todoId" value={todo.id} />
                  <input type="hidden" name="_action" value="delete" />
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </Form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
