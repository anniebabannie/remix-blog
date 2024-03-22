import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { Form, json, useLoaderData } from "@remix-run/react"
import prisma from "prisma/client"

export async function action({
  request,
}: ActionFunctionArgs) {
  const user = await prisma.user.create({
    data: {
      name: 'Annie',
      email: 'anniesexton@prisma.io',
    },
  })
  return json({ user })
}
export async function loader({
  request,
}: LoaderFunctionArgs) {
  // get all users from prisma
  const users = await prisma.user.findMany()
  console.log(users)

  return json({ users })
}
export default function Index() {
  const { users } = useLoaderData<typeof loader>()
  return (
    <div className="">
      <h1>Items</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Form method="POST">
        <input type="submit" value="Submit" />
      </Form>
    </div>
  )
}