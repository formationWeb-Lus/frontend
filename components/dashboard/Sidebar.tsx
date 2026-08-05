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
  WalletCards,
} from "lucide-react";


const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Produits",
    href: "/dashboard/products",
    icon: ShoppingBag,
  },

  {
    name: "Pages de paiement",
    href: "/dashboard/payment-pages",
    icon: WalletCards,
  },

  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ReceiptText,
  },

  {
    name: "Clients",
    href: "/dashboard/customers",
    icon: Users,
  },

  {
    name: "Clés API",
    href: "/dashboard/api-keys",
    icon: KeyRound,
  },

  {
    name: "Abonnement",
    href: "/dashboard/subscriptions",
    icon: CreditCard,
  },

  {
    name: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
];



export default function Sidebar() {


  const pathname = usePathname();



  return (


    <aside
      className="
        fixed
        left-0
        top-0
        hidden
        h-screen
        w-72
        bg-[#08192D]
        px-6
        py-8
        lg:flex
        lg:flex-col
      "
    >




      {/* LOGO */}


      <Link
        href="/"
        className="
          mb-10
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







      {/* MENU */}


      <nav
        className="
          flex-1
          space-y-2
        "
      >


        {
          menuItems.map((item) => {


            const Icon = item.icon;


            const active =
              pathname === item.href;



            return (

              <Link

                key={item.href}

                href={item.href}


                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition

                  ${
                    active

                    ?

                    "bg-yellow-400 text-[#08192D]"

                    :

                    "text-slate-300 hover:bg-white/10 hover:text-white"

                  }

                `}

              >


                <Icon size={20}/>


                {item.name}



              </Link>


            );


          })
        }



      </nav>







      {/* PROFIL */}


      <div
        className="
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




        <button
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
          "
        >

          <LogOut size={18}/>

          Déconnexion


        </button>



      </div>




    </aside>


  );

}