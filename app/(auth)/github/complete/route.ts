import db from "@/lib/db";
import { getSession, sessionLogin } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avatar_url, login } = await userProfileResponse.json();

  const existingUser = await db.user.findUnique({
    where: {
      username: login,
    },
  });

  const user = await db.user.findUnique({
    where: {
      github_id: id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    const newUser = await db.user.create({
      data: {
        username: existingUser ? `${login}-gh` : login,
        github_id: id.toString(),
        avatar: avatar_url,
      },
    });

    await sessionLogin(newUser.id);
  }

  await sessionLogin(user!.id);
}
