"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Copy, Check, Loader2, AlertCircle, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  paymentUrl: string;
}

interface PaymentPageInfo {
  title: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  pageInfo?: PaymentPageInfo;
  products?: Product[];
  error?: string;
}

export default function PaymentPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<PaymentPageInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>("");

  // Récupération sécurisée du domaine côté client (évite les erreurs d'hydratation SSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Chargement des données
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/payment-page");
      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Impossible de charger les informations de paiement.");
      }

      if (data.products && data.products.length > 0) {
        setProducts(data.products);
        setSelectedProduct(data.products[0]);
      }
      
      if (data.pageInfo) {
        setPageInfo(data.pageInfo);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Copie du lien dans le presse-papier
  const handleCopyLink = async (url: string) => {
    const fullUrl = origin ? `${origin}${url}` : url;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie du lien :", err);
    }
  };

  // Affichage du loader
  if (loading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // Affichage si aucun produit n'est disponible
  if (!products.length) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Aucun produit disponible</h3>
        <p className="mt-1 text-sm text-gray-500">Revenez plus tard ou contactez le support.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      {/* En-tête de la page */}
      {pageInfo && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {pageInfo.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {pageInfo.description}
          </p>
        </div>
      )}

      {/* Grille des produits */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isSelected = selectedProduct?.id === product.id;
          return (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`cursor-pointer overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {product.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Panneau du produit sélectionné et lien de paiement */}
      {selectedProduct && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Lien de paiement pour {selectedProduct.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Copiez ce lien pour procéder au règlement ou le partager.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={origin ? `${origin}${selectedProduct.paymentUrl}` : selectedProduct.paymentUrl}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={() => handleCopyLink(selectedProduct.paymentUrl)}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copié
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copier
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}