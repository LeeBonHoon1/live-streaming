import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: Number(session.id),
      },
    });
    if (user) {
      return user;
    }
  }

  return notFound();
};

const ProfilePage = async () => {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();

    redirect("/");
  };

  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
};

export default ProfilePage;
