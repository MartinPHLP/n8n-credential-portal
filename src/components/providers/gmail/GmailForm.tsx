// gmailForm.tsx
"use client";
import { useCallback } from "react";
import { UseFormRegister } from "react-hook-form";
import { GOOGLE_OAUTH_CONFIG } from "@/lib/google-auth";

interface GmailFormProps {
  register: UseFormRegister<any>;
  onOAuthComplete: (data: any) => void;
}

export default function GmailForm({
  register,
  onOAuthComplete,
}: GmailFormProps) {
  const handleGoogleLogin = useCallback(() => {
    // Store the form name in a cookie
    const formName =
      document.querySelector<HTMLInputElement>('input[name="name"]')?.value;
    if (formName) {
      document.cookie = `credentialName=${encodeURIComponent(
        formName
      )}; path=/`;
    }

    // Générer un état aléatoire pour la sécurité
    const state = Math.random().toString(36).substring(7);
    document.cookie = `oauthState=${state}; path=/`;

    // Construire l'URL d'autorisation
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", GOOGLE_OAUTH_CONFIG.clientId);
    authUrl.searchParams.append(
      "redirect_uri",
      GOOGLE_OAUTH_CONFIG.redirectUri
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", GOOGLE_OAUTH_CONFIG.scopes.join(" "));
    authUrl.searchParams.append("state", state);
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    // Rediriger vers Google
    window.location.href = authUrl.toString();
  }, []);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-tertiary mb-1">
          Credential Name
        </label>
        <input
          {...register("name")}
          placeholder="Enter a name for this credential"
          className="w-full p-3 rounded-lg border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          required
        />
      </div>

      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <img src="/icons/google.png" alt="Google" className="w-6 h-6 mr-3" />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        <p className="mt-4 text-sm text-tertiary/70 text-center max-w-sm">
          Click the button above to securely connect your Gmail account. You'll
          be redirected to Google's login page.
        </p>
      </div>
    </>
  );
}
