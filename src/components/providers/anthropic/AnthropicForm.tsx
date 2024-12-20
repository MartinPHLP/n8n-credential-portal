"use client";

import { UseFormRegister } from "react-hook-form";

interface AnthropicFormData {
  name: string;
  apiKey: string;
}

interface AnthropicFormProps {
  register: UseFormRegister<AnthropicFormData>;
}

export default function AnthropicForm({ register }: AnthropicFormProps) {
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

      <div>
        <label className="block text-sm font-medium text-tertiary mb-1">
          API Key
        </label>
        <input
          {...register("apiKey")}
          type="password"
          placeholder="sk-..."
          className="w-full p-3 rounded-lg border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
          required
        />
        <p className="mt-1 text-xs text-tertiary/70">
          You can find your API key in your{" "}
          <a
            href="https://console.anthropic.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary underline"
          >
            Anthropic dashboard
          </a>
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
      >
        Create Credential
      </button>
    </>
  );
}
