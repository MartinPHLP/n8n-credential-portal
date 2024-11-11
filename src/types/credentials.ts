type CredentialData =
  | {
      user: string;
      password: string;
      host: string;
      port: number;
      secure: boolean;
      allowUnauthorizedCerts: boolean;
    }
  | {
      clientId: string;
      clientSecret: string;
      oauthTokenData: {
        access_token: string;
        refresh_token: string;
        scope: string;
        token_type: string;
        expiry_date: number;
      };
    }
  | {
      apiKey: string;
      organizationId: string;
    }
  | {
      apiKey: string;
    };

export interface BaseCredential {
  name: string;
  type: string;
  data: CredentialData;
}

export interface ImapCredential extends BaseCredential {
  type: "imap";
  data: {
    user: string;
    password: string;
    host: string;
    port: number;
    secure: boolean;
    allowUnauthorizedCerts: boolean;
  };
}

export interface GmailCredential extends BaseCredential {
  type: "gmailOAuth2";
  data: {
    clientId: string;
    clientSecret: string;
    oauthTokenData: {
      access_token: string;
      refresh_token: string;
      scope: string;
      token_type: string;
      expiry_date: number;
    };
  };
}

export interface OpenAiCredential extends BaseCredential {
  type: "openAiApi";
  data: {
    apiKey: string;
    organizationId: string;
  };
}

export interface AnthropicCredential extends BaseCredential {
  type: "anthropicApi";
  data: {
    apiKey: string;
  };
}
