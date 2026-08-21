"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Sparkles, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "./page"; // Ajustez l'import selon votre structure

const typeLabels: Record<string, string> = {
  PHYSICAL: "Produit physique",
  DIGITAL: "Produit numérique",
  COURSE: "Formation",
  SERVICE: "Service",
  SCHOOL: "École",
  SUBSCRIPTION: "Abonnement",
};

export default function ProductCard({ product }: { product: Product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const paymentSlug = product.paymentPageProducts?.[0]?.paymentPage?.slug;
  const href = paymentSlug ? `/pay/${paymentSlug}` : `#`;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div>
        {/* =========================================================
            1. IMAGE DU PRODUIT (Visuel 100% complet)
        ========================================================= */}
        <div className="relative h-80 w-full overflow-hidden bg-slate-900 p-2 flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-500">
              <Package size={48} />
            </div>
          )}

          {/* Badge Type */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
              <Sparkles size={12} className="text-amber-500" />
              {typeLabels[product.type] || product.type}
            </span>
          </div>

          {/* Badge Statut */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              <CheckCircle size={12} />
              Disponible
            </span>
          </div>
        </div>

        {/* =========================================================
            2. TEXTES (100% visibles sans truncation)
        ========================================================= */}
        <div className="p-5">
          {/* Titre sans coupure */}
          <h2 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors">
            {product.name}
          </h2>

          {/* Sous-titre sans coupure */}
          {product.subtitle && (
            <p className="mt-2 text-xs font-semibold text-slate-500 leading-normal">
              {product.subtitle}
            </p>
          )}

          {/* Description sans 'line-clamp' */}
          {product.description && (
            <div className="mt-3">
              <p
                className={`text-sm text-slate-600 leading-relaxed whitespace-pre-line ${
                  !isExpanded && product.description.length > 150
                    ? "line-clamp-3"
                    : ""
                }`}
              >
                {product.description}
              </p>

              {/* Bouton Voir Plus / Voir Moins si la description est très longue */}
              {product.description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Réduire <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Lire la suite complète <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          3. PRIX ET BOUTON D'ACHAT
      ========================================================= */}
      <div className="p-5 pt-0">
        <div className="my-4 border-t border-slate-100" />

        <div className="flex items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              PRIX
            </span>
            <p className="text-xl font-black text-slate-900">
              {Number(product.price).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
              })}{" "}
              <span className="text-sm font-bold text-blue-600">
                {product.currency}
              </span>
            </p>
          </div>

          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            Acheter
          </Link>
        </div>
      </div>
    </div>
  );
}