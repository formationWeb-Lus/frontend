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
X,
} from "lucide-react";

// =====================================================
// MENU
// =====================================================

const menuItems = [

// ===================================================
// DASHBOARD
// ===================================================

{
name: "Dashboard",
href: "/dashboard",
icon: LayoutDashboard,
},

// ===================================================
// PRODUITS
// ===================================================

{
name: "Produits",
href: "/dashboard/products",
icon: ShoppingBag,
},

// ===================================================
// PAIEMENTS
// ===================================================

{
name: "Page de paiement",
href: "/dashboard/payment-config",
icon: CreditCard,
},

// ===================================================
// PROMOTION
// ===================================================

{
name: "Promouvoir mes produits",
href: "/marketing/products",
icon: Megaphone,
},

// ===================================================
// TRANSACTIONS
// ===================================================

{
name: "Transactions",
href: "/dashboard/transactions",
icon: ReceiptText,
},

// ===================================================
// CLIENTS
// ===================================================

{
name: "Clients",
href: "/dashboard/customers",
icon: Users,
},

// ===================================================
// ENTREPRISE
// ===================================================

{
name: "Mon entreprise",
href: "/store",
icon: Building2,
},

// ===================================================
// API
// ===================================================

{
name: "Clés API",
href: "/dashboard/api-keys",
icon: KeyRound,
},



// ===================================================
// CONTSCTS
// ===================================================

{
name: "Contactez nous",
href: "/dashboard/contacts",
icon: CreditCard,
},

// ===================================================
// PARAMÈTRES
// ===================================================

{
name: "Paramètres",
href: "/dashboard/settings",
icon: Settings,
},

];

// =====================================================
// PROPS
// =====================================================

interface SidebarProps {
open: boolean;
onClose: () => void;
}

// =====================================================
// SIDEBAR
// =====================================================

export default function Sidebar({
open,
onClose,
}: SidebarProps) {

const pathname = usePathname();

return (
<>
{/* =================================================
OVERLAY MOBILE
================================================= */}


  {open && (
    <button
      type="button"
      aria-label="Fermer le menu"
      onClick={onClose}
      className="
        fixed
        inset-0
        z-40
        bg-black/50
        backdrop-blur-[1px]
        lg:hidden
      "
    />
  )}

  {/* =================================================
      SIDEBAR
  ================================================= */}

  <aside
    className={`
      fixed
      left-0
      top-0
      z-50
      flex
      h-screen
      w-72
      flex-col
      bg-[#08192D]
      px-6
      py-8
      shadow-2xl
      transition-transform
      duration-300
      ease-in-out

      lg:z-30
      lg:translate-x-0
      lg:shadow-none

      ${
        open
          ? "translate-x-0"
          : "-translate-x-full"
      }
    `}
  >

    {/* =================================================
        HEADER SIDEBAR
    ================================================= */}

    <div className="mb-10 flex items-center justify-between">

      {/* =================================================
          LOGO
      ================================================= */}

      <Link
        href="/"
        onClick={onClose}
        className="
          flex
          items-center
          gap-3
        "
      >

        <Image
          src="/images/logo.png"
          alt="PayLink"
          width={45}
          height={45}
          priority
        />

        <span
          className="
            text-2xl
            font-extrabold
            text-white
          "
        >
          PayLink
        </span>

      </Link>

      {/* =================================================
          BOUTON FERMER MOBILE
      ================================================= */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer le menu"
        className="
          rounded-xl
          p-2
          text-slate-300
          transition
          hover:bg-white/10
          hover:text-white
          lg:hidden
        "
      >

        <X size={24} />

      </button>

    </div>

    {/* =================================================
        MENU
    ================================================= */}

    <nav
      className="
        flex-1
        space-y-2
        overflow-y-auto
        pr-1
      "
    >

      {menuItems.map((item) => {

        const Icon = item.icon;

        // =================================================
        // PAGE ACTIVE
        // =================================================

        const active =
          pathname === item.href ||
          pathname.startsWith(
            item.href + "/"
          );

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`
              flex
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-200

              ${
                active
                  ? "bg-yellow-400 text-[#08192D] shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <Icon
              size={20}
              strokeWidth={2}
            />

            <span>
              {item.name}
            </span>

          </Link>
        );

      })}

    </nav>

    {/* =================================================
        PROFIL
    ================================================= */}

    <div
      className="
        mt-6
        rounded-2xl
        bg-white/10
        p-4
      "
    >

      <p
        className="
          text-sm
          font-semibold
          text-white
        "
      >
        Mon compte
      </p>

      <p
        className="
          mt-1
          text-xs
          text-slate-400
        "
      >
        Entreprise PayLink
      </p>

      {/* =================================================
          DECONNEXION
      ================================================= */}

      <button
        type="button"
        className="
          mt-4
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          text-sm
          text-red-400
          transition
          hover:bg-white/10
          hover:text-red-300
        "
      >

        <LogOut
          size={18}
        />

        Déconnexion

      </button>

    </div>

  </aside>
</>


);
}
