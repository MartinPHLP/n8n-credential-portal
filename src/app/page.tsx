"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { providers, Provider } from "@/lib/providers";
import Image from "next/image";
import { Toast } from "@/components/ui/Toast";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      setToast({
        message: "Credential created successfully!",
        type: "success",
      });
    } else if (success === "false") {
      setToast({
        message: "Failed to create credential",
        type: "error",
      });
    }
  }, [searchParams]);

  const onSubmit = async (formData: any) => {
    try {
      if (!selectedProvider) return;

      const payload = selectedProvider.transformData(formData);

      const response = await fetch("/api/create-credential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create credential");

      setToast({
        message: "Credential created successfully!",
        type: "success",
      });
      reset();
      setSelectedProvider(null);
    } catch (err) {
      setToast({ message: "Failed to create credential", type: "error" });
    }
  };

  if (!selectedProvider) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
        <main className="max-w-5xl mx-auto pt-16 px-4 pb-20">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary">
            Credential Manager
          </h1>
          <p className="text-center text-tertiary/80 mb-12 max-w-2xl mx-auto">
            Select a credential type below to get started. Each option provides
            a secure way to configure and store your authentication details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {providers.map((provider) => (
              <div
                key={provider.type}
                onClick={() => setSelectedProvider(provider)}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/10 hover:border-primary/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={provider.icon}
                      alt={provider.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-primary">
                    {provider.name}
                  </h3>
                </div>
                <p className="text-tertiary/70">{provider.description}</p>
              </div>
            ))}
          </div>
        </main>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <main className="max-w-lg mx-auto pt-16 px-4 pb-20">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-border/10 animate-fade-in">
          <div className="flex items-center mb-8">
            <button
              onClick={() => {
                setSelectedProvider(null);
                reset();
              }}
              className="text-primary hover:text-secondary transition-colors p-2 -ml-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold ml-2 text-primary">
              {selectedProvider.name} Credential
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <selectedProvider.component
              register={register}
              onOAuthComplete={() => handleSubmit(onSubmit)()}
            />
          </form>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
