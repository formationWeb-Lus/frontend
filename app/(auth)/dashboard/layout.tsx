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

      {/* Contenu principal */}

      <div className="lg:ml-72">

        {/* Header */}

        <Header />

        {/* Contenu des pages */}

        <main className="p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}