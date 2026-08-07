
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Check,
  Copy,
  Package,
  Share2,
  Sparkles,
} from "lucide-react";

export interface ProductCardProduct {
  id: number;

  name: string;

  subtitle?: string | null;

  description?: string | null;

  type: string;

  price: number;

  currency: string;

  imageUrl?: string | null;

  createdAt: string;

  paymentPageProducts?: {
    paymentPage: {
      slug: string;
    };
  }[];
}

interface ProductCardProps {
  product: ProductCardProduct;

  onCopy?: (
    productId: number,
    url: string
  ) => void;

  copied?: boolean;
}

function formatPrice(
  price: number,
  currency: string
) {
  return (
    price.toLocaleString("fr-FR", {
      maximumFractionDigits: 2,
    }) +
    " " +
    currency
  );
}

function getProductType(type: string) {
  const types: Record<string, string> = {
    COURSE: "Formation",
    SERVICE: "Service",
    PHYSICAL: "Produit",
    DIGITAL: "Produit numérique",
    SCHOOL: "École",
    SUBSCRIPTION: "Abonnement",
  };

  return types[type] || "Produit";
}

export default function ProductCard({
  product,
  onCopy,
  copied = false,
}: ProductCardProps) {
  const slug =
    product.paymentPageProducts?.[0]
      ?.paymentPage.slug;

  const paymentUrl = slug
    ? `/pay/${slug}`
    : null;

  async function handleShare() {
    if (!paymentUrl) return;

    const fullUrl =
      `${window.location.origin}${paymentUrl}`;

    try {
      if (
        navigator.share
      ) {
        await navigator.share({
          title: product.name,
          text: `Découvrez ${product.name}`,
          url: fullUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(
        fullUrl
      );

      onCopy?.(
        product.id,
        fullUrl
      );
    } catch {
      // L'utilisateur peut simplement fermer
      // la fenêtre de partage.
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm">
              <Package
                size={38}
                className="text-slate-300"
              />
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#08192D] shadow-sm backdrop-blur">
            <Sparkles size={13} />
            {getProductType(product.type)}
          </span>
        </div>

        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
            <Check size={13} />
            Disponible
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          <h2 className="line-clamp-2 text-xl font-black leading-tight text-[#08192D]">
            {product.name}
          </h2>

          {product.subtitle && (
            <p className="mt-2 line-clamp-1 text-sm font-medium text-slate-500">
              {product.subtitle}
            </p>
          )}

          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
            {product.description ||
              "Découvrez ce produit disponible sur ShopFlowPay."}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Prix
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="text-2xl font-black text-[#08192D]">
              {formatPrice(
                product.price,
                product.currency
              )}
            </p>

            {paymentUrl && (
              <button
                type="button"
                onClick={handleShare}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-[#08192D] hover:bg-slate-50 hover:text-[#08192D]"
                title="Partager"
              >
                {copied ? (
                  <Check size={18} />
                ) : (
                  <Share2 size={18} />
                )}
              </button>
            )}
          </div>

          {paymentUrl ? (
            <Link
              href={paymentUrl}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#102c4e] hover:shadow-lg"
            >
              Voir le produit

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="mt-5 flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-5 py-3.5 text-sm font-bold text-slate-400"
            >
              Paiement indisponible
            </button>
          )}

          {paymentUrl && (
            <button
              type="button"
              onClick={() => {
                const fullUrl =
                  `${window.location.origin}${paymentUrl}`;

                navigator.clipboard
                  .writeText(fullUrl)
                  .then(() => {
                    onCopy?.(
                      product.id,
                      fullUrl
                    );
                  })
                  .catch(() => {});
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-50 hover:text-[#08192D]"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Lien copié
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copier le lien de paiement
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
