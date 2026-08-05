"use client";

import {
  ShoppingBag,
  ArrowRight,
  Loader2,
  AlertCircle,
  PackageOpen,
  Megaphone,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/* =====================================================
   TYPES
===================================================== */

interface PaymentPageInfo {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  active: boolean;
  createdAt: string;
}

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

  paymentPage: PaymentPageInfo | null;
  paymentUrl: string | null;
}

/* =====================================================
   API RESPONSE
===================================================== */

interface ApiResponse {
  success: boolean;
  message?: string;
  products?: Product[];
  total?: number;
}

/* =====================================================
   PAGE
===================================================== */

export default function MarketingProductsPage() {
  /* ===================================================
     STATE
  =================================================== */

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedProductId, setSelectedProductId] =
    useState<number | null>(null);

  /* ===================================================
     API URL
  =================================================== */

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  /* ===================================================
     TOKEN
  =================================================== */

  function getToken(): string | null {
    if (
      typeof window ===
      "undefined"
    ) {
      return null;
    }

    return localStorage.getItem(
      "token"
    );
  }

  /* ===================================================
     CHARGER UNIQUEMENT MES PRODUITS
  =================================================== */

  const loadProducts =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          getToken();

        /* =============================================
           AUTHENTIFICATION
        ============================================= */

        if (!token) {
          throw new Error(
            "Votre session a expiré. Veuillez vous reconnecter."
          );
        }

        console.log(
          "======================================"
        );

        console.log(
          "MARKETING : chargement de mes produits"
        );

        console.log(
          "======================================"
        );

        /* =============================================
           API MARKETING PRIVÉE
        ============================================= */

        const response =
          await fetch(
            `${apiUrl}/api/marketing/products`,
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },

              cache:
                "no-store",
            }
          );

        /* =============================================
           RÉPONSE
        ============================================= */

        const data: ApiResponse =
          await response.json();

        console.log(
          "MARKETING PRODUCTS RESPONSE:",
          data
        );

        /* =============================================
           SESSION INVALIDE
        ============================================= */

        if (
          response.status ===
          401
        ) {
          localStorage.removeItem(
            "token"
          );

          throw new Error(
            "Votre session n'est plus valide. Veuillez vous reconnecter."
          );
        }

        /* =============================================
           ERREUR API
        ============================================= */

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Impossible de récupérer vos produits."
          );
        }

        if (!data?.success) {
          throw new Error(
            data?.message ||
              "Impossible de récupérer vos produits."
          );
        }

        /* =============================================
           PRODUITS
        ============================================= */

        const myProducts =
          Array.isArray(
            data.products
          )
            ? data.products
            : [];

        /*
         * Le backend a déjà filtré :
         *
         * userId = utilisateur connecté
         * status = PUBLISHED
         * paymentPage = active
         *
         * On garde néanmoins une petite sécurité
         * côté frontend.
         */

        const validProducts =
          myProducts.filter(
            (product) =>
              product &&
              product.status ===
                "PUBLISHED" &&
              product.paymentPage
                ?.active
          );

        setProducts(
          validProducts
        );

      } catch (error) {
        console.error(
          "GET MARKETING PRODUCTS ERROR:",
          error
        );

        setProducts([]);

        setError(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    }, [apiUrl]);

  /* ===================================================
     LOAD
  =================================================== */

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ===================================================
     FORMAT PRICE
  =================================================== */

  function formatPrice(
    price: number,
    currency: string
  ) {
    return `${Number(
      price
    ).toLocaleString(
      "fr-FR"
    )} ${currency}`;
  }

  /* ===================================================
     SÉLECTION
  =================================================== */

  function selectProduct(
    productId: number
  ) {
    setSelectedProductId(
      productId
    );
  }

  /* ===================================================
     PRODUIT SÉLECTIONNÉ
  =================================================== */

  const selectedProduct =
    products.find(
      (product) =>
        product.id ===
        selectedProductId
    ) || null;

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              size={42}
              className="animate-spin text-[#08192D]"
            />

            <p className="text-slate-500">
              Chargement de vos produits...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ===================================================
     ERROR
  =================================================== */

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
          <div className="w-full rounded-3xl bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertCircle
                size={32}
                className="text-red-500"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#08192D]">
              Impossible de charger vos produits
            </h1>

            <p className="mt-3 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-6 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
            >
              Réessayer
            </button>

          </div>
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

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-[#08192D]">
                <Megaphone size={17} />

                Marketing
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#08192D]">
                Promouvoir mes produits
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
                Sélectionnez uniquement vos produits
                publiés afin de les promouvoir sur vos
                différents canaux de communication.
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 px-5 py-4">
              <p className="text-sm text-slate-500">
                Produits disponibles
              </p>

              <p className="mt-1 text-3xl font-bold text-[#08192D]">
                {products.length}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {products.length === 0 ? (

          /* =============================================
             EMPTY
          ============================================= */

          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <PackageOpen
                size={40}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#08192D]">
              Aucun produit à promouvoir
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              Vous devez avoir au moins un produit
              publié avec une page de paiement active
              pour pouvoir faire du marketing.
            </p>

            <Link
              href="/dashboard/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
            >
              Gérer mes produits

              <ArrowRight size={18} />
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* =========================================
                PRODUCTS
            ========================================= */}

            <div>

              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#08192D]">
                  Mes produits publiés
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Seuls vos propres produits sont
                  affichés ici.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">

                {products.map(
                  (product) => {

                    const selected =
                      selectedProductId ===
                      product.id;

                    return (
                      <article
                        key={
                          product.id
                        }
                        onClick={() =>
                          selectProduct(
                            product.id
                          )
                        }
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
                              src={
                                product.imageUrl
                              }
                              alt={
                                product.name
                              }
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

                          {/* PRICE */}

                          <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#08192D] shadow-md">
                            {formatPrice(
                              product.price,
                              product.currency
                            )}
                          </div>

                          {/* SELECTED */}

                          {selected && (
                            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#08192D] px-3 py-2 text-xs font-bold text-white">
                              <CheckCircle2
                                size={15}
                              />

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
                              {
                                product.description
                              }
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
                                Page
                              </p>

                              <p className="mt-1 text-sm font-semibold text-[#08192D]">
                                Active
                              </p>
                            </div>

                          </div>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            </div>

            {/* =========================================
                MARKETING PANEL
            ========================================= */}

            <aside className="lg:sticky lg:top-6 lg:h-fit">

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#08192D] text-white">
                  <Megaphone size={23} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#08192D]">
                  Produit sélectionné
                </h2>

                {!selectedProduct ? (

                  <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center">

                    <ShoppingBag
                      size={30}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Sélectionnez un produit pour
                      commencer votre campagne Marketing.
                    </p>

                  </div>

                ) : (

                  <div className="mt-5">

                    {/* SELECTED PRODUCT */}

                    <div className="overflow-hidden rounded-2xl border border-slate-200">

                      {selectedProduct.imageUrl ? (
                        <img
                          src={
                            selectedProduct.imageUrl
                          }
                          alt={
                            selectedProduct.name
                          }
                          className="h-40 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center bg-slate-100">
                          <ShoppingBag
                            size={45}
                            className="text-slate-300"
                          />
                        </div>
                      )}

                      <div className="p-4">

                        <h3 className="font-bold text-[#08192D]">
                          {
                            selectedProduct.name
                          }
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatPrice(
                            selectedProduct.price,
                            selectedProduct.currency
                          )}
                        </p>

                      </div>

                    </div>

                    {/* PAYMENT LINK */}

                    {selectedProduct.paymentUrl && (
                      <div className="mt-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Lien de paiement
                        </p>

                        <div className="rounded-xl bg-slate-50 p-3">

                          <p className="break-all text-sm font-medium text-[#08192D]">
                            {typeof window !==
                            "undefined"
                              ? `${window.location.origin}${selectedProduct.paymentUrl}`
                              : selectedProduct.paymentUrl}
                          </p>

                        </div>

                        <Link
                          href={
                            selectedProduct.paymentUrl
                          }
                          target="_blank"
                          className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#08192D] transition hover:bg-slate-50"
                        >
                          Voir la page de paiement

                          <ExternalLink
                            size={16}
                          />
                        </Link>

                      </div>
                    )}

                    {/* MARKETING BUTTON */}

                    <button
                      type="button"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#08192D] px-5 py-4 font-semibold text-white transition hover:bg-[#102c4e]"
                    >
                      <Megaphone
                        size={19}
                      />

                      Créer une campagne

                      <ArrowRight
                        size={18}
                      />
                    </button>

                  </div>
                )}

              </div>

            </aside>

          </div>
        )}

      </section>

    </main>
  );
}