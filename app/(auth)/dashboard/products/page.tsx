"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Package,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Loader2,
  CheckCircle,
  Clock,
  Ban,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

/* =========================================================
   API URL
========================================================= */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://paylink.coderise-solution.com/api";

function getProductsUrl(): string {
  const base = API_BASE.replace(/\/+$/, "");
  if (base.endsWith("/api")) {
    return `${base}/product`;
  }
  return `${base}/api/product`;
}

/* =========================================================
   TYPES
========================================================= */

type ProductStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "DISABLED";

type ProductType =
  | "PHYSICAL"
  | "DIGITAL"
  | "COURSE"
  | "SERVICE"
  | "SCHOOL"
  | "SUBSCRIPTION";

type Currency = "USD" | "CDF";

interface PaymentPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  active: boolean;
  createdAt: string;
}

interface PaymentPageProduct {
  id: number;
  paymentPageId: number;
  productId: number;
  paymentPage?: PaymentPage | null;
  createdAt: string;
}

interface Product {
  id: number;
  userId: number;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  type: ProductType;
  price: number;
  currency: Currency;
  imageUrl?: string | null;
  status: ProductStatus;
  createdAt: string;
  paymentPageProducts?: PaymentPageProduct[];
}

interface ProductsResponse {
  success: boolean;
  products: Product[];
  message?: string;
}

interface Statistics {
  total: number;
  published: number;
  draft: number;
  pending: number;
  disabled: number;
  totalValue: number;
}

/* =========================================================
   LABELS & HELPERS
========================================================= */

const statusLabels: Record<ProductStatus, string> = {
  DRAFT: "Brouillon",
  PENDING: "En attente",
  PUBLISHED: "Publié",
  DISABLED: "Désactivé",
};

const typeLabels: Record<ProductType, string> = {
  PHYSICAL: "Produit physique",
  DIGITAL: "Produit numérique",
  COURSE: "Formation",
  SERVICE: "Service",
  SCHOOL: "École",
  SUBSCRIPTION: "Abonnement",
};

function getStatusClass(status: ProductStatus): string {
  switch (status) {
    case "PUBLISHED":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "DISABLED":
      return "bg-red-100 text-red-700";
    case "DRAFT":
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function StatusIcon({ status }: { status: ProductStatus }) {
  switch (status) {
    case "PUBLISHED":
      return <CheckCircle size={14} />;
    case "PENDING":
      return <Clock size={14} />;
    case "DISABLED":
      return <Ban size={14} />;
    case "DRAFT":
    default:
      return <AlertCircle size={14} />;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [publishingId, setPublishingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null
    );
  };

  const calculateStatistics = (productList: Product[]): Statistics => {
    return {
      total: productList.length,
      published: productList.filter((p) => p.status === "PUBLISHED").length,
      draft: productList.filter((p) => p.status === "DRAFT").length,
      pending: productList.filter((p) => p.status === "PENDING").length,
      disabled: productList.filter((p) => p.status === "DISABLED").length,
      totalValue: productList.reduce(
        (total, p) => total + Number(p.price || 0),
        0
      ),
    };
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) throw new Error("Utilisateur non authentifié.");

      const response = await fetch(getProductsUrl(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      let data: ProductsResponse;
      try {
        data = await response.json();
      } catch {
        throw new Error("Le serveur a retourné une réponse invalide.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de récupérer les produits.");
      }

      const productList = Array.isArray(data.products) ? data.products : [];
      setProducts(productList);
      setStatistics(calculateStatistics(productList));
    } catch (err: any) {
      console.error("GET PRODUCTS ERROR:", err);
      setError(
        err?.message ||
          "Une erreur est survenue lors du chargement des produits."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const publishProduct = async (productId: number) => {
    try {
      setPublishingId(productId);
      setError(null);
      setSuccess(null);

      const token = getToken();
      if (!token) throw new Error("Utilisateur non authentifié.");

      const response = await fetch(`${getProductsUrl()}/${productId}/publish`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data: any;
      try {
        data = await response.json();
      } catch {
        throw new Error("Réponse invalide du serveur.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de publier le produit.");
      }

      setSuccess(data.message || "Produit publié avec succès.");
      await loadProducts();
    } catch (err: any) {
      console.error("PUBLISH PRODUCT ERROR:", err);
      setError(err?.message || "Impossible de publier le produit.");
    } finally {
      setPublishingId(null);
    }
  };

  const deleteProduct = async (productId: number) => {
    if (
      !window.confirm(
        "Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible."
      )
    ) {
      return;
    }

    try {
      setDeletingId(productId);
      setError(null);
      setSuccess(null);

      const token = getToken();
      if (!token) throw new Error("Utilisateur non authentifié.");

      const response = await fetch(`${getProductsUrl()}/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data: any;
      try {
        data = await response.json();
      } catch {
        throw new Error("Réponse invalide du serveur.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de supprimer le produit.");
      }

      setSuccess(data.message || "Produit supprimé avec succès.");
      await loadProducts();
    } catch (err: any) {
      console.error("DELETE PRODUCT ERROR:", err);
      setError(err?.message || "Impossible de supprimer le produit.");
    } finally {
      setDeletingId(null);
    }
  };

  const getPublicUrl = (product: Product): string | null => {
    const relations = product.paymentPageProducts || [];
    const activeRelation = relations.find((r) => r.paymentPage?.active);
    const relation = activeRelation || relations[0];
    const page = relation?.paymentPage;

    if (!page?.slug || typeof window === "undefined") return null;

    return `${window.location.origin}/pay/${page.slug}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={35} className="animate-spin text-blue-600" />
          <p className="text-gray-600">Chargement de vos produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes produits</h1>
            <p className="text-gray-500 mt-1">
              Gérez vos produits, formations, services et pages de paiement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadProducts}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white hover:bg-gray-50 transition disabled:opacity-60"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Actualiser
            </button>

            <Link
              href="/dashboard/products/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              <Plus size={18} />
              Nouveau produit
            </Link>
          </div>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 text-green-700 px-4 py-3 flex items-start gap-3">
            <CheckCircle size={20} className="mt-0.5 shrink-0" />
            <p>{success}</p>
          </div>
        )}

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold mt-1">{statistics?.total || 0}</p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-gray-500">Publiés</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {statistics?.published || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-gray-500">Brouillons</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {statistics?.draft || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-gray-500">En attente</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {statistics?.pending || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-gray-500">Désactivés</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {statistics?.disabled || 0}
            </p>
          </div>
        </div>

        {/* PRODUCTS GRID / EMPTY STATE */}
        {products.length === 0 ? (
          <div className="bg-white border rounded-2xl p-12 text-center">
            <Package size={55} className="mx-auto text-gray-300" />
            <h2 className="text-xl font-semibold mt-4">Aucun produit</h2>
            <p className="text-gray-500 mt-2">
              Commencez par créer votre premier produit ou service.
            </p>
            <Link
              href="/dashboard/products/create"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              <Plus size={18} />
              Créer un produit
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => {
              const publicUrl = getPublicUrl(product);

              return (
                <div
                  key={product.id}
                  className="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    {/* IMAGE */}
                    <div className="h-48 bg-gray-100 relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={50} className="text-gray-300" />
                        </div>
                      )}

                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(
                            product.status
                          )}`}
                        >
                          <StatusIcon status={product.status} />
                          {statusLabels[product.status]}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="font-bold text-lg text-gray-900 truncate">
                            {product.name}
                          </h2>
                          {product.subtitle && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {product.subtitle}
                            </p>
                          )}
                        </div>

                        <span className="text-xs bg-gray-100 rounded-lg px-2 py-1 whitespace-nowrap">
                          {typeLabels[product.type]}
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-2xl font-bold">
                          {Number(product.price).toLocaleString("fr-FR")}{" "}
                          <span className="text-sm font-medium text-gray-500">
                            {product.currency}
                          </span>
                        </p>
                      </div>

                      <div className="mt-3">
                        {publicUrl ? (
                          <div className="text-xs text-green-600 flex items-center gap-1.5 font-medium">
                            <CheckCircle size={14} />
                            Page de paiement disponible
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500 flex items-center gap-1.5">
                            <AlertCircle size={14} />
                            Aucune page de paiement
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="p-5 pt-0">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border hover:bg-gray-50 text-sm font-medium"
                      >
                        <Eye size={16} />
                        Voir
                      </Link>

                      <Link
                        href={`/dashboard/products/${product.id}?edit=true`}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border hover:bg-gray-50 text-sm font-medium"
                      >
                        <Edit size={16} />
                        Modifier
                      </Link>
                    </div>

                    {!publicUrl ? (
                      <Link
                        href={`/dashboard/payment-pages/create?productId=${product.id}`}
                        className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Plus size={16} />
                        Définir le mode de paiement
                      </Link>
                    ) : (
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        <ExternalLink size={16} />
                        Voir la page de paiement
                      </a>
                    )}

                    {product.status !== "PUBLISHED" && (
                      <button
                        type="button"
                        onClick={() => publishProduct(product.id)}
                        disabled={publishingId === product.id}
                        className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 text-sm font-medium"
                      >
                        {publishingId === product.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Publication...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            Publier
                          </>
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      disabled={deletingId === product.id}
                      className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium disabled:opacity-50"
                    >
                      {deletingId === product.id ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Suppression...
                        </>
                      ) : (
                        <>
                          <Trash2 size={15} />
                          Supprimer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}