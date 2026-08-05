"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  Package,
  Plus,
  Settings,
  Smartphone,
  WalletCards,
} from "lucide-react";

/* =====================================================
   API
===================================================== */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

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
  status: string;
  imageUrl?: string | null;
  createdAt?: string;
}

interface PaymentConfiguration {
  id: number | null;

  airtel: string | null;
  orange: string | null;
  mpesa: string | null;
  afrimoney: string | null;
  visa: string | null;

  status: string;
  active: boolean;
}

interface ProductPaymentData {
  product: Product;
  configuration: PaymentConfiguration | null;
  loading: boolean;
  error?: string;
}

/* =====================================================
   PAGE
===================================================== */

export default function PaymentConfigDashboardPage() {
  const [products, setProducts] = useState<
    ProductPaymentData[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ===================================================
     TOKEN
  =================================================== */

  const getToken = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  }, []);

  /* ===================================================
     CHARGER LES PRODUITS
  =================================================== */

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Votre session a expiré. Veuillez vous reconnecter."
        );
      }

      /* ===============================================
         RÉCUPÉRER LES PRODUITS
      =============================================== */

      const response = await fetch(
        `${API_URL}/product`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },

          cache: "no-store",
        }
      );

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      console.log(
        "GET PRODUCTS PAYMENT CONFIG:",
        {
          status: response.status,
          data,
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");

        throw new Error(
          "Votre session a expiré. Veuillez vous reconnecter."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Impossible de charger les produits."
        );
      }

      /*
       * Selon ton controller :
       * - data
       * - data.products
       * - data.data
       */

      const productList: Product[] =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data)
          ? data.data
          : [];

      /* ===============================================
         CHARGER LA CONFIGURATION DE CHAQUE PRODUIT
      =============================================== */

      const results: ProductPaymentData[] =
        await Promise.all(
          productList.map(
            async (product) => {
              try {
                const configResponse =
                  await fetch(
                    `${API_URL}/payment-config/product/${product.id}`,
                    {
                      method: "GET",

                      headers: {
                        Authorization: `Bearer ${token}`,
                        Accept:
                          "application/json",
                      },

                      cache: "no-store",
                    }
                  );

                let configData: any =
                  null;

                try {
                  configData =
                    await configResponse.json();
                } catch {
                  configData = null;
                }

                /*
                 * Une configuration absente
                 * n'est pas une erreur grave.
                 */

                if (
                  configResponse.ok &&
                  configData?.success
                ) {
                  return {
                    product,

                    configuration:
                      configData.configuration ??
                      null,

                    loading: false,
                  };
                }

                return {
                  product,

                  configuration: null,

                  loading: false,

                  error:
                    configData?.message ||
                    undefined,
                };
              } catch (err) {
                return {
                  product,

                  configuration: null,

                  loading: false,

                  error:
                    err instanceof Error
                      ? err.message
                      : "Erreur de configuration.",
                };
              }
            }
          )
        );

      setProducts(results);
    } catch (err) {
      console.error(
        "GET PAYMENT CONFIG DASHBOARD ERROR:",
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
  }, [getToken]);

  /* ===================================================
     LOAD
  =================================================== */

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[600px] max-w-6xl items-center justify-center px-6">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2
              size={26}
              className="animate-spin"
            />

            <span className="font-medium">
              Chargement de vos configurations de paiement...
            </span>
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#08192D] text-white shadow-sm">
                <CreditCard size={23} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-400">
                  PARAMÈTRES
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-[#08192D] sm:text-4xl">
                  Configuration des paiements
                </h1>
              </div>

            </div>

            <p className="max-w-3xl text-slate-500">
              Configurez les coordonnées de paiement que vous
              souhaitez associer à vos produits. Ces informations
              permettent d'identifier le compte sur lequel les
              paiements devront être attribués.
            </p>

          </div>

          <Link
            href="/dashboard/products"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[#08192D]
              px-5
              py-3
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#102c4e]
            "
          >
            <Plus size={19} />

            Ajouter un produit
          </Link>

        </div>

        {/* =================================================
            INFORMATION IMPORTANTE
        ================================================= */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-blue-100 bg-blue-50">

          <div className="p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <WalletCards size={22} />
              </div>

              <div>

                <h2 className="font-bold text-blue-950">
                  Comment fonctionnent les paiements ?
                </h2>

                <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
                  Les coordonnées renseignées ici ne constituent
                  pas un moyen de paiement directement connecté à
                  votre compte personnel. Les paiements des clients
                  sont d'abord reçus et suivis par la plateforme.
                  La plateforme identifie ensuite le produit et
                  l'entrepreneur concerné afin de procéder au
                  reversement selon le fonctionnement prévu.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">

            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">

              <h2 className="font-bold">
                Impossible de charger les produits
              </h2>

              <p className="mt-1 text-sm">
                {error}
              </p>

              <button
                type="button"
                onClick={loadProducts}
                className="mt-3 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Réessayer
              </button>

            </div>

          </div>
        )}

        {/* =================================================
            STATISTIQUES
        ================================================= */}

        {!error && products.length > 0 && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* TOTAL */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Produits
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#08192D]">
                    {products.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#08192D]">
                  <Package size={23} />
                </div>

              </div>

            </div>

            {/* CONFIGURÉS */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Configurations actives
                  </p>

                  <p className="mt-2 text-3xl font-bold text-green-600">
                    {
                      products.filter(
                        (item) =>
                          item.configuration
                            ?.active
                      ).length
                    }
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <CheckCircle2 size={23} />
                </div>

              </div>

            </div>

            {/* À CONFIGURER */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    À configurer
                  </p>

                  <p className="mt-2 text-3xl font-bold text-yellow-600">
                    {
                      products.filter(
                        (item) =>
                          !item.configuration ||
                          !item.configuration.active
                      ).length
                    }
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                  <Settings size={23} />
                </div>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            PRODUITS
        ================================================= */}

        {products.length === 0 && !error ? (

          <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
              <Package
                size={30}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#08192D]">
              Aucun produit disponible
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Vous devez d'abord créer un produit avant de
              pouvoir configurer ses coordonnées de paiement.
            </p>

            <Link
              href="/dashboard/products/create"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-[#08192D]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#102c4e]
              "
            >
              <Plus size={18} />

              Créer un produit
            </Link>

          </section>

        ) : (

          <section>

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#08192D]">
                  Vos produits
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Sélectionnez un produit pour configurer ses
                  coordonnées de paiement.
                </p>

              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {products.map(
                ({
                  product,
                  configuration,
                }) => {

                  const isActive =
                    Boolean(
                      configuration?.active
                    );

                  const hasConfiguration =
                    Boolean(
                      configuration &&
                      (
                        configuration.airtel ||
                        configuration.orange ||
                        configuration.mpesa ||
                        configuration.afrimoney ||
                        configuration.visa
                      )
                    );

                  return (
                    <article
                      key={product.id}
                      className="
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        shadow-sm
                        ring-1
                        ring-slate-100
                        transition
                        hover:-translate-y-1
                        hover:shadow-md
                      "
                    >

                      {/* IMAGE */}

                      <div className="relative h-48 bg-slate-100">

                        {product.imageUrl ? (

                          <img
                            src={
                              product.imageUrl
                            }
                            alt={
                              product.name
                            }
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center">

                            <Package
                              size={50}
                              className="text-slate-300"
                            />

                          </div>

                        )}

                        {/* STATUS */}

                        <div className="absolute right-4 top-4">

                          {isActive ? (

                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 shadow-sm">

                              <span className="h-2 w-2 rounded-full bg-green-500" />

                              Actif

                            </span>

                          ) : hasConfiguration ? (

                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700 shadow-sm">

                              <span className="h-2 w-2 rounded-full bg-yellow-500" />

                              En attente

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">

                              Non configuré

                            </span>

                          )}

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="p-6">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <h3 className="truncate text-lg font-bold text-[#08192D]">
                              {product.name}
                            </h3>

                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                              {product.type}
                            </p>

                          </div>

                          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-[#08192D]">
                            {product.price.toLocaleString()}{" "}
                            {product.currency}
                          </span>

                        </div>

                        {/* MOYENS CONFIGURÉS */}

                        <div className="mt-5">

                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                            Moyens configurés
                          </p>

                          {hasConfiguration ? (

                            <div className="flex flex-wrap gap-2">

                              {configuration?.airtel && (
                                <PaymentBadge label="Airtel" />
                              )}

                              {configuration?.orange && (
                                <PaymentBadge label="Orange" />
                              )}

                              {configuration?.mpesa && (
                                <PaymentBadge label="M-Pesa" />
                              )}

                              {configuration?.afrimoney && (
                                <PaymentBadge label="Afrimoney" />
                              )}

                              {configuration?.visa && (
                                <PaymentBadge label="Visa" />
                              )}

                            </div>

                          ) : (

                            <p className="text-sm text-slate-400">
                              Aucun moyen de paiement configuré.
                            </p>

                          )}

                        </div>

                        {/* ACTION */}

                        <Link
                          href={`/dashboard/payment-config/${product.id}`}
                          className="
                            mt-6
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-[#08192D]
                            px-5
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#102c4e]
                          "
                        >

                          <Settings size={18} />

                          {hasConfiguration
                            ? "Modifier la configuration"
                            : "Configurer les paiements"}

                          <ArrowRight size={17} />

                        </Link>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          </section>

        )}

        {/* =================================================
            EXPLICATION
        ================================================= */}

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#08192D]">
              <Smartphone size={22} />
            </div>

            <div>

              <h2 className="font-bold text-[#08192D]">
                À propos des coordonnées de paiement
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Vous pouvez enregistrer plusieurs coordonnées
                Mobile Money et Visa. Ces informations servent
                principalement à identifier le bénéficiaire du
                reversement. Elles ne remplacent pas le système
                de paiement de la plateforme.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Lorsqu'un client paie un produit, la plateforme
                conserve les informations de la transaction afin
                que l'administration puisse identifier l'entrepreneur
                concerné et effectuer ensuite le reversement sur
                les coordonnées configurées.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

/* =====================================================
   PAYMENT BADGE
===================================================== */

function PaymentBadge({
  label,
}: {
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">

      <CheckCircle2 size={13} />

      {label}

    </span>
  );
}