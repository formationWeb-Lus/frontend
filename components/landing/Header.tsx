"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Fonctionnalités",
    href: "#features",
  },
  {
    label: "Documentation",
    href: "#documentation",
  },
  {
    label: "Tarifs",
    href: "/pricing",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08192D]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PayLink"
            width={48}
            height={48}
            priority
          />

          <div>
            <h1 className="text-2xl font-bold text-yellow-400">
              PayLink
            </h1>

            <p className="text-xs text-gray-400">
              Payment Platform
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="font-medium text-white transition hover:text-yellow-400"
          >
            Connexion
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-[#08192D] transition hover:bg-yellow-300"
          >
            Créer un compte
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white lg:hidden"
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#08192D] lg:hidden">
          <div className="flex flex-col px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 text-gray-300 transition hover:text-yellow-400"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/login"
                className="rounded-xl border border-yellow-400 py-3 text-center font-semibold text-yellow-400"
              >
                Connexion
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-yellow-400 py-3 text-center font-semibold text-[#08192D]"
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