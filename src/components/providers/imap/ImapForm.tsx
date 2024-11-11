"use client";

import { UseFormRegister } from "react-hook-form";

interface ImapFormProps {
  register: UseFormRegister<any>;
}

export default function ImapForm({ register }: ImapFormProps) {
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
          Email Address
        </label>
        <input
          {...register("user")}
          type="email"
          placeholder="your.email@example.com"
          className="w-full p-3 rounded-lg border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-tertiary mb-1">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full p-3 rounded-lg border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-tertiary mb-1">
          Host
        </label>
        <input
          {...register("host")}
          placeholder="imap.example.com"
          className="w-full p-3 rounded-lg border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-tertiary mb-1">
          Port
        </label>
        <input
          {...register("port")}
          type="number"
          placeholder="993"
          defaultValue={993}
          className="w-full p-3 rounded-lg border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3 text-tertiary">
          <input
            {...register("secure")}
            type="checkbox"
            defaultChecked={true}
            className="w-5 h-5 rounded border-border/20 text-primary focus:ring-primary"
          />
          <span className="text-sm">Use secure connection (SSL/TLS)</span>
        </label>

        <label className="flex items-center space-x-3 text-tertiary">
          <input
            {...register("allowUnauthorizedCerts")}
            type="checkbox"
            className="w-5 h-5 rounded border-border/20 text-primary focus:ring-primary"
          />
          <span className="text-sm">Allow unauthorized certificates</span>
        </label>
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
