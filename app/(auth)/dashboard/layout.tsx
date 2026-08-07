import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Zone principale */}
      <div className="flex min-h-screen flex-col lg:ml-72">
        {/* Header */}
        <Header />

        {/* Contenu */}
        <main className="flex-1 w-full px-4 py-6 lg:px-6 xl:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}