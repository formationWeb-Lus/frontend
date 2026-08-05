"use client";

import {
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  subtitle: string | null;
  description: string | null;
  type: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  status: string;
  createdAt: string;
  paymentPage?: {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    active: boolean;
    createdAt: string;
  } | null;
  paymentUrl?: string | null;
}

interface MarketingProductCardProps {
  product: Product;
  selected: boolean;
  onSelect: (id: number) => void;
}

export default function MarketingProductCard({
  product,
  selected,
  onSelect,
}: MarketingProductCardProps) {
  function formatPrice() {
    return `${Number(product.price).toLocaleString(
      "fr-FR"
    )} ${product.currency}`;
  }

  return (
    <article
      onClick={() => onSelect(product.id)}
      className={`group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        selected
          ? "ring-2 ring-[#08192D]"
          : "ring-1 ring-slate-100"
      }`}
    >
      {/* IMAGE */}

      <div className="relative h-56 overflow-hidden bg-slate-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag
              size={60}
              className="text-slate-300"
            />
          </div>
        )}

        {/* PRIX */}

        <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#08192D] shadow-md">
          {formatPrice()}
        </div>

        {/* SELECTION */}

        {selected && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#08192D] px-3 py-2 text-xs font-bold text-white">
            <CheckCircle2 size={15} />
            Sélectionné
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {product.type}
        </span>

        <h3 className="mt-4 text-xl font-bold text-[#08192D]">
          {product.name}
        </h3>

        {product.subtitle && (
          <p className="mt-2 text-sm font-medium text-slate-600">
            {product.subtitle}
          </p>
        )}

        {product.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs text-slate-400">
              Statut
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              Publié
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Page de paiement
            </p>

            <p className="mt-1 text-sm font-semibold text-[#08192D]">
              {product.paymentPage?.active
                ? "Active"
                : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}