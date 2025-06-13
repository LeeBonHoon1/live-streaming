import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

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
