"use client";

import {
  Plus,
  Link as LinkIcon,
  Copy,
  Eye,
  WalletCards,
  CheckCircle,
  Users,
  Loader2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

/* =====================================================
TYPES
===================================================== */

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

interface PaymentPage {
  id: number;
  userId: number;
  title: string;
  slug: string;
  description: string | null;
  active: boolean;
  createdAt: string;

  product?: Product | null;

  products?: {
    productId: number;
    paymentPageId: number;
    product: Product;
  }[];

  transactions?: unknown[];
}

/* =====================================================
API RESPONSE
===================================================== */

interface PaymentPagesResponse {
  success: boolean;
  paymentPages?: PaymentPage[];
  message?: string;
}

/* =====================================================
PAGE
===================================================== */

export default function PaymentPagesPage() {
  const [paymentPages, setPaymentPages] = useState<PaymentPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  /* =====================================================
  CHARGER LES PAGES DE PAIEMENT
  ===================================================== */

  useEffect(() => {
    async function loadPaymentPages() {
      try {
        setLoading(true);
        setError("");

        const getToken = (): string | null => {
          if (typeof window === "undefined") {
            return null;
          }

          const token = localStorage.getItem("token");
          console.log("TOKEN FRONTEND :", token);
          return token;
        };

        const token = getToken();

        if (!token) {
          throw new Error(
            "Votre session a expiré. Veuillez vous reconnecter."
          );
        }

        const response = await fetch(`${apiUrl}/payment-pages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        let data: PaymentPagesResponse;

        try {
          data = await response.json();
        } catch {
          throw new Error(
            `Réponse invalide du serveur (${response.status}).`
          );
        }

        if (!response.ok) {
          throw new Error(
            data?.message || `Erreur serveur (${response.status}).`
          );
        }

        if (!data.success) {
          throw new Error(
            data?.message ||
              "Impossible de récupérer les pages de paiement."
          );
        }

        setPaymentPages(
          Array.isArray(data.paymentPages) ? data.paymentPages : []
        );
      } catch (err) {
        console.error("GET PAYMENT PAGES ERROR:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPaymentPages();
  }, [apiUrl]);

  /* =====================================================
  URL PUBLIQUE
  ===================================================== */

  function getPublicUrl(slug: string) {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/pay/${encodeURIComponent(slug)}`;
    }

    return `/pay/${encodeURIComponent(slug)}`;
  }

  /* =====================================================
  COPIER LE LIEN
  ===================================================== */

  async function copyPaymentLink(slug: string) {
    try {
      const url = getPublicUrl(slug);
      await navigator.clipboard.writeText(url);

      setCopiedSlug(slug);

      setTimeout(() => {
        setCopiedSlug(null);
      }, 2000);
    } catch (err) {
      console.error("COPY LINK ERROR:", err);
      alert("Impossible de copier le lien.");
    }
  }

  /* =====================================================
  STATISTIQUES
  ===================================================== */

  const totalPages = paymentPages.length;

  const activePages = paymentPages.filter((page) => page.active).length;

  const totalPayments = paymentPages.reduce((total, page) => {
    const transactions = Array.isArray(page.transactions)
      ? page.transactions
      : [];
    return total + transactions.length;
  }, 0);

  /* =====================================================
  LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-[#08192D]" />
          <p className="text-slate-500">
            Chargement des pages de paiement...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
  ERROR
  ===================================================== */

  if (error) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <AlertCircle size={32} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#08192D]">
            Impossible de charger les pages
          </h2>

          <p className="mt-3 text-slate-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
  RENDER
  ===================================================== */

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#08192D]">
            Pages de paiement
          </h1>
          <p className="mt-2 text-slate-500">
            Gérez les liens de paiement associés à vos produits et services.
          </p>
        </div>

        <Link
          href="/dashboard/payment-pages/create"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-6 py-4 font-semibold text-white transition hover:bg-[#102c4e]"
        >
          <Plus size={20} />
          Nouvelle page
        </Link>
      </div>

      {/* STATISTIQUES */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* PAGES */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <WalletCards className="text-yellow-500" size={30} />
          <h2 className="mt-4 text-3xl font-bold text-[#08192D]">
            {totalPages}
          </h2>
          <p className="text-slate-500">Pages créées</p>
        </div>

        {/* PAIEMENTS */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Users className="text-blue-600" size={30} />
          <h2 className="mt-4 text-3xl font-bold text-[#08192D]">
            {totalPayments}
          </h2>
          <p className="text-slate-500">Paiements reçus</p>
        </div>

        {/* PAGES ACTIVES */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <CheckCircle className="text-green-600" size={30} />
          <h2 className="mt-4 text-3xl font-bold text-[#08192D]">
            {activePages}
          </h2>
          <p className="text-slate-500">Pages actives</p>
        </div>
      </section>

      {/* EMPTY STATE */}
      {paymentPages.length === 0 && (
        <section className="rounded-3xl bg-white p-12 text-center shadow-sm">
          <WalletCards size={50} className="mx-auto text-slate-300" />
          <h2 className="mt-5 text-2xl font-bold text-[#08192D]">
            Aucune page de paiement
          </h2>
          <p className="mt-2 text-slate-500">
            Créez une page de paiement pour permettre à vos clients de payer vos produits.
          </p>
          <Link
            href="/dashboard/payment-pages/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white"
          >
            <Plus size={18} />
            Créer une page
          </Link>
        </section>
      )}

      {/* LISTE */}
      {paymentPages.length > 0 && (
        <section className="grid gap-6 lg:grid-cols-2">
          {paymentPages.map((page) => {
            const product =
              page.product || page.products?.[0]?.product || null;
            const publicUrl = getPublicUrl(page.slug);
            const transactionCount = Array.isArray(page.transactions)
              ? page.transactions.length
              : 0;

            return (
              <div
                key={page.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* AFFICHAGE DE L'IMAGE COMPLÈTE */}
                  {product?.imageUrl ? (
                    <div className="flex h-64 w-full items-center justify-center overflow-hidden bg-[#08192D] p-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-52 w-full items-center justify-center bg-slate-100">
                      <WalletCards size={50} className="text-slate-300" />
                    </div>
                  )}

                  {/* CONTENU DE LA CARTE */}
                  <div className="p-6">
                    {/* TITRE + STATUS */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-[#08192D]">
                          {page.title}
                        </h2>
                        {product && (
                          <p className="mt-1 font-medium text-slate-600">
                            {product.name}
                          </p>
                        )}
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
                          page.active
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {page.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* SOUS-TITRE */}
                    {product?.subtitle && (
                      <p className="mt-3 text-sm font-medium text-slate-600">
                        {product.subtitle}
                      </p>
                    )}

                    {/* DESCRIPTION */}
                    {product?.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>
                    )}

                    {/* INFORMATIONS COMPLÉMENTAIRES */}
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          Type
                        </p>
                        <p className="mt-1 font-semibold text-[#08192D]">
                          {product?.type || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          Prix
                        </p>
                        <p className="mt-1 font-semibold text-[#08192D]">
                          {typeof product?.price === "number"
                            ? product.price.toLocaleString("fr-FR")
                            : "—"}{" "}
                          {product?.currency ?? ""}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          Paiements
                        </p>
                        <p className="mt-1 font-semibold text-[#08192D]">
                          {transactionCount}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          ID Produit
                        </p>
                        <p className="mt-1 font-semibold text-[#08192D]">
                          {product?.id || "—"}
                        </p>
                      </div>
                    </div>

                    {/* LIEN PUBLIC */}
                    <div className="mt-6 rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Lien de paiement
                      </p>
                      <div className="flex items-center gap-2 overflow-hidden text-sm text-slate-600">
                        <LinkIcon size={15} className="shrink-0 text-slate-400" />
                        <span className="truncate">{publicUrl}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOUTONS D'ACTION (PIED DE CARTE) */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => copyPaymentLink(page.slug)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-semibold text-[#08192D] transition hover:bg-slate-50"
                  >
                    <Copy size={18} />
                    {copiedSlug === page.slug ? "Copié !" : "Copier"}
                  </button>

                  <Link
                    href={`/pay/${encodeURIComponent(page.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#08192D] py-3 font-semibold text-white transition hover:bg-[#102c4e]"
                  >
                    <Eye size={18} />
                    Voir
                    <ExternalLink size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}