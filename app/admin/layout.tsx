"use client";
import { ReactNode, useState } from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
