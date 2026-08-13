"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Users,
  ReceiptText,
  KeyRound,
  Settings,
  LogOut,
  Megaphone,
  Building2,
  Mail,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Produits", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Page de paiement", href: "/dashboard/payment-config", icon: CreditCard },
  { name: "Promouvoir mes produits", href: "/marketing/products", icon: Megaphone },
  { name: "Transactions", href: "/dashboard/transactions", icon: ReceiptText },
  { name: "Clients", href: "/dashboard/customers", icon: Users },
  { name: "Mon entreprise", href: "/store", icon: Building2 },
  { name: "Clés API", href: "/dashboard/api-keys", icon: KeyRound },
  { name: "Contactez-nous", href: "/dashboard/contacts", icon: Mail },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY MOBILE */}
      {open && (
        <button
          type="button"
          aria-label="Fermer le menu de navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden cursor-default border-none"
        />
      )}

      {/* SIDEBAR */}
      <aside
        aria-label="Navigation principale"
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#08192D] px-6 py-8 shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:z-30 lg:translate-x-0 lg:shadow-none
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER SIDEBAR */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <Image
              src="/logo.png"
              alt="Logo PayLink"
              width={45}
              height={45}
              priority
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-2xl font-extrabold text-white">
              PayLink
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu mobile"
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-yellow-400 text-[#08192D] font-semibold shadow-sm"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon size={20} strokeWidth={2} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* PROFIL */}
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-semibold text-white">Mon compte</p>
          <p className="mt-0.5 text-xs text-slate-300">Entreprise PayLink</p>

          <button
            type="button"
            className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-white/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}