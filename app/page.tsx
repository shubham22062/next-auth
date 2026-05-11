import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div>
      {session?.user ? (
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}