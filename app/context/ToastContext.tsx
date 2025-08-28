"use client";

import React, { createContext, useContext, ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast(message, {
          icon: "⚠️",
          style: {
            background: "#fef3c7",
            color: "#92400e",
          },
        });
        break;
      default:
        toast(message);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
