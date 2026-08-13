"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Tarifs", href: "#pricing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061221]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo & Branding */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-300 p-0.5">
            <div className="rounded-[10px] bg-[#061221] p-1.5 transition group-hover:bg-transparent">
              <Image
                src="/logo.png"
                alt="PayLink Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                priority
              />
            </div>
          </div>

          <div>
            <span className="text-xl font-black tracking-tight text-white transition group-hover:text-yellow-400">
              Pay<span className="text-yellow-400">Link</span>
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Vente • Paiement • Marketing
            </p>
          </div>
        </Link>

        {/* Navigation Desktop */}
        {navItems.length > 0 && (
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition hover:text-yellow-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Boutons d'action Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Connexion
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2.5 text-sm font-bold text-[#061221] shadow-lg shadow-yellow-500/10 transition hover:scale-[1.02] hover:shadow-yellow-500/20"
          >
            <Sparkles size={16} />
            Créer un compte
          </Link>
        </div>

        {/* Bouton Menu Mobile */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      {open && (
        <div className="border-b border-white/10 bg-[#061221]/95 px-6 py-6 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-yellow-400"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-white/10">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-700 bg-slate-900/50 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Connexion
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-3 text-center text-sm font-bold text-[#061221] shadow-lg shadow-yellow-500/10"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}