"use client";

import {
ReactNode,
useState,
} from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface Props {
children: ReactNode;
}

export default function DashboardLayout({
children,
}: Props) {
// =====================================================
// ÉTAT DU MENU MOBILE
// =====================================================

const [sidebarOpen, setSidebarOpen] =
useState(false);

// =====================================================
// OUVRIR LE MENU
// =====================================================

function openSidebar() {
setSidebarOpen(true);
}

// =====================================================
// FERMER LE MENU
// =====================================================

function closeSidebar() {
setSidebarOpen(false);
}

return ( <div className="min-h-screen bg-slate-50">


  {/* =================================================
      SIDEBAR
  ================================================= */}

  <Sidebar
    open={sidebarOpen}
    onClose={closeSidebar}
  />

  {/* =================================================
      ZONE PRINCIPALE
  ================================================= */}

  <div className="flex min-h-screen flex-col lg:ml-72">

    {/* =================================================
        HEADER
    ================================================= */}

    <Header
      onMenuClick={openSidebar}
    />

    {/* =================================================
        CONTENU
    ================================================= */}

    <main className="flex-1 w-full px-4 py-6 lg:px-6 xl:px-8">
      {children}
    </main>

  </div>

</div>

);
}