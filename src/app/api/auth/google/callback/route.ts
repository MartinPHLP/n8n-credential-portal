// route.ts
import { NextResponse } from "next/server";
import { GOOGLE_OAUTH_CONFIG } from "@/lib/google-auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/error?message=Invalid OAuth response`
    );
  }

  try {
    // Échanger le code contre les tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_OAUTH_CONFIG.clientId,
        client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
        redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    // Get the credential name from cookies
    const cookieStore = await cookies();
    const credentialName =
      cookieStore.get("credentialName")?.value || "Gmail OAuth2 Credentials";

    // Créer les credentials avec les tokens reçus
    const credentialPayload = {
      name: decodeURIComponent(credentialName),
      type: "gmailOAuth2",
      data: {
        clientId: GOOGLE_OAUTH_CONFIG.clientId,
        clientSecret: GOOGLE_OAUTH_CONFIG.clientSecret,
        oauthTokenData: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          scope: tokens.scope,
          token_type: tokens.token_type,
          expiry_date: Date.now() + tokens.expires_in * 1000,
        },
      },
    };

    // Créer les credentials dans votre API
    const credentialResponse = await fetch(
      "https://vps-99122bfa.vps.ovh.net/api/v1/credentials",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "X-N8N-API-KEY": process.env.N8N_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialPayload),
      }
    );

    if (!credentialResponse.ok) {
      throw new Error("Failed to create credential");
    }

    // Créer la réponse avec redirection
    const response = NextResponse.redirect(`${baseUrl}/?success=true`);

    // Clear the credential name cookie
    response.cookies.set("credentialName", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(
      `${baseUrl}/error?message=Failed to exchange OAuth tokens`
    );
  }
}
