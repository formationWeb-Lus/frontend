"use client";

import {
  ShoppingBag,
  ArrowRight,
  Loader2,
  AlertCircle,
  PackageOpen,
  Megaphone,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

// =====================================================
// TYPES
// =====================================================

interface PaymentPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  active: boolean;
  createdAt?: string;
}

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
  createdAt?: string;
  paymentPage?: PaymentPage | null;
  paymentUrl?: string | null;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  products?: Product[];
  total?: number;
}

// =====================================================
// API CONFIG & HELPER
// =====================================================

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://paylink.coderise-solution.com/api";

function getProductsUrl(): string {
  const base = API_BASE.replace(/\/+$/, "");
  if (base.endsWith("/api")) {
    return `${base}/product`;
  }
  return `${base}/api/product`;
}

export default function MarketingProductsPage() {
  // ===================================================
  // STATE
  // ===================================================

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // TOKEN
  // ===================================================

  const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || localStorage.getItem("accessToken");
  };

  // ===================================================
  // CHARGER LES PRODUITS
  // ===================================================

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Votre session a expiré. Veuillez vous reconnecter.");
      }

      const productsUrl = getProductsUrl();

      const response = await fetch(productsUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      let data: ApiResponse;

      try {
        data = await response.json();
      } catch {
        throw new Error("Le serveur a retourné une réponse invalide.");
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        throw new Error(
          "Votre session n'est plus valide. Veuillez vous reconnecter."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Impossible de récupérer les produits. Code HTTP : ${response.status}`
        );
      }

      if (data.success === false) {
        throw new Error(
          data.message || "Impossible de récupérer les produits."
        );
      }

      const receivedProducts = Array.isArray(data.products) ? data.products : [];

      const publishedProducts = receivedProducts.filter((product) => {
        if (!product) return false;
        return String(product.status).toUpperCase() === "PUBLISHED";
      });

      setProducts(publishedProducts);

      // RESTAURER LA SÉLECTION
      try {
        const stored = sessionStorage.getItem("marketing_selected_products");
        if (stored) {
          const storedIds = JSON.parse(stored);
          if (Array.isArray(storedIds)) {
            const validIds = storedIds
              .map(Number)
              .filter((id) =>
                publishedProducts.some((product) => product.id === id)
              );
            setSelectedProductIds(validIds);
          }
        }
      } catch (storageError) {
        console.warn("Impossible de restaurer la sélection :", storageError);
      }
    } catch (err) {
      console.error("GET PRODUCTS ERROR:", err);
      setProducts([]);
      setSelectedProductIds([]);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la récupération des produits."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ===================================================
  // HELPERS & HANDLERS
  // ===================================================

  const formatPrice = (price: number, currency: string) => {
    return `${Number(price || 0).toLocaleString("fr-FR")} ${currency}`;
  };

  const toggleProduct = (productId: number) => {
    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const selectAllProducts = () => {
    setSelectedProductIds(products.map((product) => product.id));
  };

  const clearSelection = () => {
    setSelectedProductIds([]);
  };

  const selectedProducts = useMemo(
    () => products.filter((product) => selectedProductIds.includes(product.id)),
    [products, selectedProductIds]
  );

  const continueToChannels = () => {
    setError("");

    if (selectedProductIds.length === 0) {
      setError("Veuillez sélectionner au moins un produit.");
      return;
    }

    const validIds = selectedProductIds.filter((id) =>
      products.some((product) => product.id === id)
    );

    if (validIds.length === 0) {
      setError("La sélection des produits est invalide.");
      return;
    }

    sessionStorage.setItem(
      "marketing_selected_products",
      JSON.stringify(validIds)
    );

    const productsParam = validIds.join(",");
    window.location.href = `/marketing/channels?products=${encodeURIComponent(
      productsParam
    )}`;
  };

  // ===================================================
  // LOADING STATE
  // ===================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
            <Loader2 size={36} className="animate-spin text-[#08192D]" />
          </div>
          <div>
            <p className="text-base font-bold text-[#08192D]">
              Chargement de vos produits...
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Veuillez patienter quelques instants.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ===================================================
  // ERROR STATE
  // ===================================================

  if (error && products.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50/50">
        <section className="border-b border-slate-200/60 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#08192D]"
            >
              <Megaphone size={16} />
              Marketing
            </Link>
          </div>
        </section>

        <section className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <AlertCircle size={32} />
            </div>
            <h1 className="mt-5 text-xl font-bold text-[#08192D]">
              Impossible de charger vos produits
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {error}
            </p>
            <button
              type="button"
              onClick={loadProducts}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#08192D] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#102c4e] active:scale-[0.98]"
            >
              <Loader2 size={16} />
              Réessayer
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ===================================================
  // MAIN VIEW
  // ===================================================

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      {/* HEADER */}
      <section className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-[#08192D]">
              <Sparkles size={14} className="text-amber-500" />
              <span>Campagne Marketing</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#08192D] sm:text-4xl">
                Promouvoir mes produits
              </h1>
              <p className="mt-2 text-base leading-relaxed text-slate-500">
                Sélectionnez les produits et services que vous souhaitez mettre
                en avant dans votre prochaine campagne publicitaire.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#08192D] text-white">
                <ShoppingBag size={22} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Sélectionnés
                </p>
                <p className="text-2xl font-black text-[#08192D]">
                  {selectedProductIds.length}
                </p>
              </div>
            </div>
          </div>

          {/* BARRE DE PROGRESSION (STEPS) */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between max-w-2xl">
              <Step number="1" title="Produits" active />
              <div className="h-0.5 flex-1 bg-slate-200 mx-4 rounded-full" />
              <Step number="2" title="Canaux" />
              <div className="h-0.5 flex-1 bg-slate-200 mx-4 rounded-full" />
              <Step number="3" title="Publication" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* MESSAGE D'ERREUR FLOTTANT */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-rose-700 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError("")}
              className="text-rose-500 hover:text-rose-700"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* SI AUCUN PRODUIT PUBLIÉ */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/60 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
              <PackageOpen size={40} />
            </div>
            <h2 className="mt-5 text-xl font-bold text-[#08192D]">
              Aucun produit disponible
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Vous n'avez aucun produit publié pour le moment. Vous devez
              publier au moins un produit avant de pouvoir créer une campagne.
            </p>
            <Link
              href="/dashboard/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#102c4e] active:scale-[0.98]"
            >
              Gérer mes produits
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* GRILLE PRODUITS */}
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#08192D]">
                    Catalogue disponible
                  </h2>
                  <p className="text-xs text-slate-500">
                    Cliquez sur une carte pour ajouter le produit à votre
                    sélection.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllProducts}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#08192D] shadow-xs transition-all hover:bg-slate-50 active:scale-95"
                  >
                    Tout sélectionner
                  </button>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-500 shadow-xs transition-all hover:bg-slate-50 active:scale-95"
                  >
                    Effacer
                  </button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {products.map((product) => {
                  const selected = selectedProductIds.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white transition-all duration-200 cursor-pointer border ${
                        selected
                          ? "border-[#08192D] ring-2 ring-[#08192D]/10 shadow-lg"
                          : "border-slate-200/80 hover:border-slate-300 hover:shadow-md"
                      }`}
                    >
                      {/* BADGE SÉLECTIONNÉ */}
                      {selected && (
                        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-[#08192D] px-3 py-1 text-xs font-semibold text-white shadow-md">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>Sélectionné</span>
                        </div>
                      )}

                      {/* CONTENEUR IMAGE */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <ShoppingBag size={48} />
                          </div>
                        )}

                        {/* PRIX */}
                        <div className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#08192D] shadow-sm">
                          {formatPrice(product.price, product.currency)}
                        </div>
                      </div>

                      {/* CORPS DE LA CARTE */}
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            {product.type || "Produit"}
                          </span>

                          <h3 className="mt-2 text-base font-bold text-[#08192D] line-clamp-1">
                            {product.name}
                          </h3>

                          {product.subtitle && (
                            <p className="mt-0.5 text-xs font-medium text-slate-500 line-clamp-1">
                              {product.subtitle}
                            </p>
                          )}

                          {product.description && (
                            <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </div>

                        {/* PIED DE CARTE */}
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Publié
                          </span>

                          {product.paymentUrl && (
                            <Link
                              href={product.paymentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#08192D] hover:underline"
                            >
                              Voir
                              <ExternalLink size={12} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIDEBAR RÉSUMÉ */}
            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#08192D]">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#08192D]">
                      Récapitulatif
                    </h3>
                    <p className="text-xs text-slate-400">
                      Vos produits à promouvoir
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Articles ajoutés</span>
                    <span className="font-bold text-[#08192D]">
                      {selectedProductIds.length}
                    </span>
                  </div>
                </div>

                {/* LISTE RÉSUMÉE */}
                {selectedProducts.length > 0 && (
                  <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5"
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <ShoppingBag size={16} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-[#08192D]">
                            {product.name}
                          </p>
                          <p className="text-[11px] font-medium text-slate-400">
                            {formatPrice(product.price, product.currency)}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleProduct(product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA BUTTON */}
                <button
                  type="button"
                  onClick={continueToChannels}
                  disabled={selectedProductIds.length === 0}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#08192D] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#102c4e] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Choisir les canaux
                  <ArrowRight size={16} />
                </button>

                {selectedProductIds.length === 0 && (
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    Sélectionnez au moins un produit pour activer l'étape suivante.
                  </p>
                )}
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

// =====================================================
// COMPOSANT STEP (BARRE DE PROGRESSION)
// =====================================================

interface StepProps {
  number: string;
  title: string;
  active?: boolean;
  completed?: boolean;
}

function Step({ number, title, active = false, completed = false }: StepProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
          active || completed
            ? "bg-[#08192D] text-white ring-4 ring-[#08192D]/10"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? <CheckCircle2 size={15} /> : number}
      </div>
      <span
        className={`text-xs font-bold ${
          active || completed ? "text-[#08192D]" : "text-slate-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}