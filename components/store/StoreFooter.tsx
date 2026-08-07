
"use client";

import Link from "next/link";

import {
  ShieldCheck,
  ShoppingBag,
  Headphones,
} from "lucide-react";

interface StoreFooterProps {
  entrepreneurName?: string;
}

export default function StoreFooter({
  entrepreneurName = "Ma boutique",
}: StoreFooterProps) {
  const year =
    new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#08192D] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/store"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-300 text-[#08192D]">
                <ShoppingBag size={21} />
              </div>

              <div>
                <p className="font-black">
                  ShopFlowPay
                </p>

                <p className="text-xs text-slate-400">
                  Marketplace
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              {entrepreneurName} vous propose ses
              produits et services directement en
              ligne grâce à ShopFlowPay.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={19}
                className="text-green-400"
              />

              <h3 className="font-bold">
                Paiement sécurisé
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Payez simplement et en toute sécurité
              depuis votre téléphone.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Headphones
                size={19}
                className="text-yellow-300"
              />

              <h3 className="font-bold">
                Besoin d'aide ?
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Une question concernant un produit ou
              votre paiement ? Contactez le vendeur.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} ShopFlowPay. Tous droits
            réservés.
          </p>

          <p>
            Boutique : {entrepreneurName}
          </p>
        </div>
      </div>
    </footer>
  );
}
