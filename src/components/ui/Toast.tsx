"use client";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 animate-fade-in">
      <div
        className={`
        px-6 py-4 rounded-lg shadow-lg
        ${
          type === "success" ? "bg-primary text-white" : "bg-red-500 text-white"
        }
        flex items-center
      `}
      >
        <span>{message}</span>
      </div>
    </div>
  );
}
