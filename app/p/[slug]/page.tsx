
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  Loader2,
  PackageOpen,
  Store,
} from "lucide-react";

/* =====================================================
   API
===================================================== */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

/* =====================================================
   TYPES
===================================================== */

interface Product {
  id: number;

  name: string;

  subtitle?: string | null;

  description?: string | null;

  type: string;

  price: number;

  currency: string;

  imageUrl?: string | null;

  status: string;
}

interface Company {
  id: number;

  name: string;

  slug: string;
}

interface Entrepreneur {
  id: number;

  name?: string | null;
}

interface StoreResponse {
  success: boolean;

  message?: string;

  entrepreneur?: Entrepreneur;

  company?: Company | null;

  products?: Product[];
}

/* =====================================================
   PROPS
===================================================== */

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =====================================================
   PAGE
===================================================== */

export default function PublicStorePage({
  params,
}: PageProps) {
  const [slug, setSlug] =
    useState<string>("");

  const [products, setProducts] =
    useState<Product[]>([]);

  const [company, setCompany] =
    useState<Company | null>(null);

  const [entrepreneur, setEntrepreneur] =
    useState<Entrepreneur | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ===================================================
     GET SLUG
  =================================================== */

  useEffect(() => {
    async function getParams() {
      const resolvedParams =
        await params;

      setSlug(
        resolvedParams.slug
      );
    }

    getParams();
  }, [params]);

  /* ===================================================
     LOAD STORE
  =================================================== */

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function loadStore() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(
            `${API_URL}/public/store/${encodeURIComponent(
              slug
            )}`,
            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache: "no-store",
            }
          );

        let data:
          StoreResponse | null =
          null;

        try {
          data =
            (await response.json()) as StoreResponse;
        } catch {
          data = null;
        }

        console.log(
          "PUBLIC STORE RESPONSE:",
          {
            status:
              response.status,

            data,
          }
        );

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Impossible de charger cette boutique."
          );
        }

        if (!data?.success) {
          throw new Error(
            data?.message ||
              "Cette boutique n'est pas disponible."
          );
        }

        setProducts(
          data.products || []
        );

        setCompany(
          data.company || null
        );

        setEntrepreneur(
          data.entrepreneur || null
        );
      } catch (err) {
        console.error(
          "PUBLIC STORE ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [slug]);

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2
            size={26}
            className="animate-spin"
          />

          <span className="font-medium">
            Chargement de la boutique...
          </span>
        </div>
      </main>
    );
  }

  /* ===================================================
     ERROR
  =================================================== */

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <Store size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-red-900">
            Boutique introuvable
          </h1>

          <p className="mt-2 text-sm leading-6 text-red-700">
            {error}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
          >
            Retour à l'accueil
          </Link>

        </div>
      </main>
    );
  }

  /* ===================================================
     PAGE
  =================================================== */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* BRAND */}

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#08192D] text-white">
                <Store size={27} />
              </div>

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Boutique
                </p>

                <h1 className="text-2xl font-bold text-[#08192D]">
                  {company?.name ||
                    entrepreneur?.name ||
                    "Boutique"}
                </h1>

              </div>

            </div>

            {/* ENTREPRENEUR */}

            {entrepreneur?.name && (
              <div className="text-sm text-slate-500">

                <span>
                  Propulsé par
                </span>

                <span className="ml-1 font-semibold text-[#08192D]">
                  {entrepreneur.name}
                </span>

              </div>
            )}

          </div>

        </div>

      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Découvrez notre catalogue
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#08192D] sm:text-5xl">
              Nos produits et services
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-500">
              Découvrez les produits et services proposés par{" "}
              <span className="font-semibold text-[#08192D]">
                {company?.name ||
                  entrepreneur?.name ||
                  "cet entrepreneur"}
              </span>
              .
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">

        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <PackageOpen size={32} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#08192D]">
              Aucun produit disponible
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Cet entrepreneur n'a pas encore publié de produit ou service.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {products.map(
              (product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                    {product.imageUrl ? (
                      <img
                        src={
                          product.imageUrl
                        }
                        alt={
                          product.name
                        }
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <PackageOpen
                          size={50}
                        />
                      </div>
                    )}

                    {/* TYPE */}

                    <div className="absolute left-4 top-4">

                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#08192D] shadow-sm">
                        {product.type}
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <h3 className="text-xl font-bold text-[#08192D]">
                      {product.name}
                    </h3>

                    {product.subtitle && (
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {product.subtitle}
                      </p>
                    )}

                    {product.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>
                    )}

                    {/* PRICE */}

                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Prix
                        </p>

                        <p className="mt-1 text-xl font-bold text-[#08192D]">
                          {product.price.toLocaleString(
                            "fr-FR"
                          )}{" "}
                          {product.currency}
                        </p>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <Link
  href={`/p/${slug}/product/${product.id}`}
  className="inline-flex items-center justify-center rounded-xl bg-[#08192D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102c4e]"
>
  Savoir plus
</Link>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 text-center sm:px-8">

          <p className="text-sm text-slate-400">
            Boutique en ligne propulsée par{" "}
            <span className="font-semibold text-slate-600">
              ShopFlowPay
            </span>
          </p>

        </div>

      </footer>

    </main>
  );
}
