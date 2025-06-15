import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number;
}

export const getSession = async () => {
  const cookieStore = await cookies();
  const cookie = await getIronSession<SessionContent>(cookieStore, {
    cookieName: "token",
    password: process.env.COOKIE_PASSWORD!,
  });
  return cookie;
};

export const sessionLogin = async (id: string | number) => {
  const session = await getSession();
  session.id = Number(id);
  await session.save();
  redirect("/profile");
};
