/* eslint-disable @typescript-eslint/no-explicit-any */
import ImapForm from "@/components/providers/imap/ImapForm";
import GmailForm from "@/components/providers/gmail/GmailForm";
import OpenAiForm from "@/components/providers/openai/OpenAiForm";
import AnthropicForm from "@/components/providers/anthropic/AnthropicForm";

export interface Provider {
  name: string;
  type: string;
  description: string;
  icon: string;
  component: React.ComponentType<{
    register: any;
    onOAuthComplete: () => void;
  }>;
  transformData: (formData: any) => any;
}

export const providers: Provider[] = [
  {
    name: "IMAP",
    type: "imap",
    description: "Configure IMAP email credentials for any email provider",
    icon: "icons/imap.svg",
    component: ImapForm,
    transformData: (formData) => ({
      name: formData.name,
      type: "imap",
      data: {
        user: formData.user,
        password: formData.password,
        host: formData.host,
        port: parseInt(formData.port),
        secure: formData.secure,
        allowUnauthorizedCerts: formData.allowUnauthorizedCerts,
      },
    }),
  },
  {
    name: "Gmail OAuth2",
    type: "gmailOAuth2",
    description: "Set up Gmail authentication using OAuth2",
    icon: "icons/gmail.svg",
    component: GmailForm,
    transformData: (formData) => ({
      name: formData.name,
      type: "gmailOAuth2",
      data: {},
    }),
  },
  {
    name: "OpenAI",
    type: "openai",
    description: "Set up OpenAI authentication",
    icon: "icons/openai.svg",
    component: OpenAiForm,
    transformData: (formData) => ({
      name: formData.name,
      type: "openAiApi",
      data: {
        apiKey: formData.apiKey,
        organizationId: formData.organizationId,
      },
    }),
  },
  {
    name: "Anthropic",
    type: "anthropicApi",
    description: "Set up Anthropic authentication",
    icon: "icons/anthropic.svg",
    component: AnthropicForm,
    transformData: (formData) => ({
      name: formData.name,
      type: "anthropicApi",
      data: {
        apiKey: formData.apiKey,
      },
    }),
  },
];
