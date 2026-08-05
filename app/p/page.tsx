
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Package,
  ArrowRight,
  AlertCircle,
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
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function PublicProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* =====================================================
     CHARGER LES PRODUITS PUBLICS
  ===================================================== */

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(
            `${API_URL}/public/products`,
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
              },

              cache: "no-store",
            }
          );

        let data: any = null;

        try {
          data =
            await response.json();
        } catch {
          data = null;
        }

        console.log(
          "PUBLIC PRODUCTS RESPONSE:",
          {
            status:
              response.status,
            data,
          }
        );

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Impossible de charger les produits."
          );
        }

        if (!data?.success) {
          throw new Error(
            data?.message ||
              "Impossible de charger les produits."
          );
        }

        setProducts(
          Array.isArray(
            data.products
          )
            ? data.products
            : []
        );
      } catch (error) {
        console.error(
          "LOAD PUBLIC PRODUCTS ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2
              size={25}
              className="animate-spin"
            />

            <span>
              Chargement des produits...
            </span>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-start gap-4">
              <AlertCircle
                size={26}
                className="shrink-0 text-red-600"
              />

              <div>
                <h1 className="text-xl font-bold text-red-900">
                  Impossible de charger les produits
                </h1>

                <p className="mt-2 text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <section className="bg-[#08192D] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-semibold uppercase tracking-widest text-slate-300">
            ShopFlowPay
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Découvrez nos produits et services
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Découvrez les produits et services
            proposés par les entrepreneurs
            présents sur notre plateforme.
          </p>

        </div>
      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <Package
              size={50}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-2xl font-bold text-[#08192D]">
              Aucun produit disponible
            </h2>

            <p className="mt-2 text-slate-500">
              Aucun produit ou service public
              n'est actuellement disponible.
            </p>

          </div>
        ) : (

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map(
              (product) => (

                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="relative h-56 overflow-hidden bg-slate-100">

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
                      <div className="flex h-full items-center justify-center">
                        <Package
                          size={55}
                          className="text-slate-300"
                        />
                      </div>
                    )}

                    {/* TYPE */}

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase text-[#08192D] shadow-sm">
                      {product.type}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <h2 className="line-clamp-1 text-xl font-bold text-[#08192D]">
                      {product.name}
                    </h2>

                    {product.subtitle && (
                      <p className="mt-2 line-clamp-1 text-sm font-medium text-slate-500">
                        {product.subtitle}
                      </p>
                    )}

                    {product.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>
                    )}

                    {/* PRICE */}

                    <div className="mt-5">
                      <span className="text-xl font-bold text-[#08192D]">
                        {product.price.toLocaleString(
                          "fr-FR"
                        )}{" "}
                        {product.currency}
                      </span>
                    </div>

                    {/* BUTTON */}

                    <Link
                      href={`/p/${product.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#102c4e]"
                    >
                      Savoir plus

                      <ArrowRight
                        size={18}
                      />
                    </Link>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </section>

    </main>
  );
}