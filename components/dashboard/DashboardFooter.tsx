"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer
      className="
        mt-12
        w-full
        overflow-hidden
        rounded-3xl
        bg-[#08192D]
        text-white
        shadow-2xl
      "
    >

      {/* CONTENU PRINCIPAL */}
      <div
        className="
          grid
          gap-10
          px-8
          py-12
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* ENTREPRISE */}
        <div>

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-yellow-400
            "
          >
            PayLink
          </h2>


          <p
            className="
              mt-5
              max-w-sm
              text-sm
              leading-7
              text-slate-300
            "
          >
            La plateforme moderne de gestion des paiements
            permettant aux entrepreneurs et entreprises de
            vendre leurs produits facilement.
          </p>


          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              text-sm
              text-slate-400
            "
          >

            <MapPin size={17}/>

            République Démocratique du Congo

          </div>

        </div>



        {/* NAVIGATION */}
        <div>

          <h3
            className="
              mb-5
              text-lg
              font-bold
            "
          >
            Navigation
          </h3>


          <ul className="space-y-4">

            {[
              {
                label: "Tableau de bord",
                href: "/dashboard",
              },
              {
                label: "Produits",
                href: "/dashboard/products",
              },
              {
                label: "Paiements",
                href: "/dashboard/payment",
              },
              {
                label: "Clients",
                href: "/dashboard/customers",
              },
              {
                label: "Abonnement",
                href: "/dashboard/subscriptions",
              },
            ].map((item) => (

              <li key={item.href}>

                <Link
                  href={item.href}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-300
                    transition
                    hover:text-yellow-400
                  "
                >

                  {item.label}


                  <ArrowUpRight
                    size={14}
                    className="
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  />

                </Link>

              </li>

            ))}

          </ul>

        </div>




        {/* CONTACT */}
        <div>

          <h3
            className="
              mb-5
              text-lg
              font-bold
            "
          >
            Contact
          </h3>


          <div className="space-y-5">


            <a
              href="mailto:africoms879@gmail.com"
              className="
                flex
                items-center
                gap-3
                text-sm
                text-slate-300
                transition
                hover:text-yellow-400
              "
            >

              <Mail size={18}/>

              africoms879@gmail.com

            </a>



            <a
              href="tel:+243899864081"
              className="
                flex
                items-center
                gap-3
                text-sm
                text-slate-300
                transition
                hover:text-yellow-400
              "
            >

              <Phone size={18}/>

              +243 89864081

            </a>



            <a
              href="https://wa.me/243995271831"
              target="_blank"
              className="
                flex
                items-center
                gap-3
                text-sm
                font-medium
                text-green-400
                transition
                hover:text-green-300
              "
            >

              <MessageCircle size={20}/>

              WhatsApp

            </a>


          </div>


        </div>




        {/* SUPPORT */}
        <div>

          <h3
            className="
              mb-5
              text-lg
              font-bold
            "
          >
            Assistance
          </h3>


          <p
            className="
              text-sm
              leading-7
              text-slate-300
            "
          >
            Besoin d'aide pour configurer vos paiements
            ou votre boutique ?
          </p>


          <button
            className="
              mt-6
              rounded-xl
              bg-yellow-400
              px-5
              py-3
              text-sm
              font-bold
              text-[#08192D]
              transition
              hover:bg-yellow-300
            "
          >
            Contacter le support
          </button>


        </div>


      </div>



      {/* BAS FOOTER */}

      <div
        className="
          border-t
          border-white/10
          px-8
          py-5
          text-center
          text-sm
          text-slate-400
        "
      >

        © {new Date().getFullYear()} PayLink.
        Tous droits réservés.

      </div>


    </footer>
  );
}