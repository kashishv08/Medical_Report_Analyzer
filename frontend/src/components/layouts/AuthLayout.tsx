// src/layouts/AuthLayout.tsx
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center mt-10 mb-10">
      {children}
    </div>
  );
}
