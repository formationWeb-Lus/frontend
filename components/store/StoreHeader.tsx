
"use client";

import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";

interface StoreHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  entrepreneurName?: string;
}

export default function StoreHeader({
  search,
  onSearchChange,
  entrepreneurName = "Ma boutique",
}: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-[#08192D] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-300">
            <Store size={14} />
            <span>Bienvenue sur {entrepreneurName}</span>
          </div>

          <span className="hidden sm:block text-slate-400">
            Paiement sécurisé avec ShopFlowPay
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/store"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#08192D] text-yellow-300 shadow-sm">
            <ShoppingBag size={21} />
          </div>

          <div className="hidden sm:block">
            <p className="text-lg font-black leading-none text-[#08192D]">
              ShopFlowPay
            </p>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Marketplace
            </p>
          </div>
        </Link>

        <div className="relative flex flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Rechercher un produit, une formation, un service..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#08192D] focus:bg-white focus:ring-4 focus:ring-[#08192D]/10"
          />
        </div>

        <button
          type="button"
          className="hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 md:flex"
          title="Mon espace"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
