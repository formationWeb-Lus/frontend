"use client";

import {
  Share2,
  Music2,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Megaphone,
  AlertCircle,
  Loader2,
  ShoppingBag,
  Sparkles,
  Check,
} from "lucide-react";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

// =====================================================
// TYPES
// =====================================================

interface PaymentPage {
  id?: number;
  title?: string;
  slug?: string;
  description?: string | null;
  active?: boolean;
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
  createdAt?: string;

  paymentPage?: PaymentPage | null;
  paymentUrl?: string | null;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  products?: Product[];
  total?: number;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  available: boolean;
  icon: React.ReactNode;
}

// =====================================================
// API
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// =====================================================
// CHANNELS
// =====================================================

const CHANNELS: Channel[] = [
  {
    id: "facebook",
    name: "Facebook",
    description:
      "Promouvez vos produits auprès de votre audience Facebook.",
    available: true,
    icon: (
      <Share2
        size={24}
      />
    ),
  },

  {
    id: "instagram",
    name: "Instagram",
    description:
      "Présentez vos produits avec des publications visuelles.",
    available: true,
    icon: (
      <Share2
        size={24}
      />
    ),
  },

  {
    id: "tiktok",
    name: "TikTok",
    description:
      "Créez des contenus courts et engageants pour vos produits.",
    available: true,
    icon: (
      <Music2
        size={24}
      />
    ),
  },

  {
    id: "whatsapp",
    name: "WhatsApp",
    description:
      "Partagez directement vos produits avec vos clients.",
    available: true,
    icon: (
      <MessageCircle
        size={24}
      />
    ),
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    description:
      "Présentez vos produits et services à une audience professionnelle.",
    available: true,
    icon: (
      <Share2
        size={24}
      />
    ),
  },

  {
    id: "x",
    name: "X",
    description:
      "Diffusez vos offres et actualités sur X.",
    available: true,
    icon: (
      <Share2
        size={24}
      />
    ),
  },
];

// =====================================================
// PAGE
// =====================================================

export default function MarketingChannelsPage() {
  const searchParams =
    useSearchParams();

  // ===================================================
  // STATE
  // ===================================================

  const [products, setProducts] =
    useState<Product[]>([]);

  const [selectedChannelIds, setSelectedChannelIds] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===================================================
  // IDS PRODUITS DE L'URL
  // ===================================================

  const selectedProductIds =
    useMemo(() => {
      const parameter =
        searchParams.get(
          "products"
        );

      if (!parameter) {
        return [];
      }

      return parameter
        .split(",")
        .map(
          (value) =>
            Number(
              value.trim()
            )
        )
        .filter(
          (id) =>
            Number.isInteger(id) &&
            id > 0
        );
    }, [searchParams]);

  // ===================================================
  // TOKEN
  // ===================================================

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

  // ===================================================
  // FORMAT PRICE
  // ===================================================

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

  // ===================================================
  // CHARGER LES PRODUITS
  // ===================================================

  const loadProducts =
    useCallback(
      async () => {
        try {
          setLoading(true);
          setError("");

          // ==========================================
          // Vérifier les IDs
          // ==========================================

          if (
            selectedProductIds.length ===
            0
          ) {
            throw new Error(
              "Aucun produit n'a été sélectionné."
            );
          }

          // ==========================================
          // TOKEN
          // ==========================================

          const token =
            getToken();

          if (!token) {
            throw new Error(
              "Votre session a expiré. Veuillez vous reconnecter."
            );
          }

          // ==========================================
          // API
          // ==========================================

          const response =
            await fetch(
              `${API_URL}/api/marketing/products`,
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

          let data: ApiResponse;

          try {
            data =
              await response.json();
          } catch {
            throw new Error(
              "La réponse du serveur est invalide."
            );
          }

          console.log(
            "MARKETING CHANNELS PRODUCTS:",
            data
          );

          // ==========================================
          // 401
          // ==========================================

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

          // ==========================================
          // API ERROR
          // ==========================================

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

          // ==========================================
          // TOUS LES PRODUITS DE L'UTILISATEUR
          // ==========================================

          const userProducts =
            Array.isArray(
              data.products
            )
              ? data.products
              : [];

          // ==========================================
          // IMPORTANT :
          //
          // On prend UNIQUEMENT les IDs demandés
          // dans l'URL ET présents dans la réponse
          // privée de l'utilisateur.
          // ==========================================

          const selectedProducts =
            userProducts.filter(
              (product) =>
                selectedProductIds.includes(
                  product.id
                ) &&
                product.status ===
                  "PUBLISHED"
            );

          if (
            selectedProducts.length ===
            0
          ) {
            throw new Error(
              "Les produits sélectionnés ne sont plus disponibles."
            );
          }

          setProducts(
            selectedProducts
          );

          // ==========================================
          // SAUVEGARDE
          // ==========================================

          sessionStorage.setItem(
            "marketing_selected_products",
            JSON.stringify(
              selectedProducts.map(
                (product) =>
                  product.id
              )
            )
          );

          // ==========================================
          // RESTAURER CANAUX
          // ==========================================

          try {
            const storedChannels =
              sessionStorage.getItem(
                "marketing_selected_channels"
              );

            if (
              storedChannels
            ) {
              const parsed =
                JSON.parse(
                  storedChannels
                );

              if (
                Array.isArray(
                  parsed
                )
              ) {
                const validChannels =
                  parsed.filter(
                    (id) =>
                      CHANNELS.some(
                        (channel) =>
                          channel.id ===
                          id &&
                          channel.available
                      )
                  );

                setSelectedChannelIds(
                  validChannels
                );
              }
            }
          } catch (
            storageError
          ) {
            console.warn(
              "Impossible de restaurer les canaux:",
              storageError
            );
          }
        } catch (err) {
          console.error(
            "GET MARKETING CHANNELS PRODUCTS ERROR:",
            err
          );

          setProducts(
            []
          );

          setError(
            err instanceof Error
              ? err.message
              : "Une erreur est survenue."
          );
        } finally {
          setLoading(false);
        }
      },
      [
        selectedProductIds,
      ]
    );

  // ===================================================
  // LOAD
  // ===================================================

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ===================================================
  // TOGGLE CHANNEL
  // ===================================================

  function toggleChannel(
    channelId: string
  ) {
    setSelectedChannelIds(
      (current) => {
        if (
          current.includes(
            channelId
          )
        ) {
          return current.filter(
            (id) =>
              id !== channelId
          );
        }

        return [
          ...current,
          channelId,
        ];
      }
    );
  }

  // ===================================================
  // SELECT ALL CHANNELS
  // ===================================================

  function selectAllChannels() {
    setSelectedChannelIds(
      CHANNELS.filter(
        (channel) =>
          channel.available
      ).map(
        (channel) =>
          channel.id
      )
    );
  }

  // ===================================================
  // CLEAR CHANNELS
  // ===================================================

  function clearChannels() {
    setSelectedChannelIds(
      []
    );
  }

  // ===================================================
  // SELECTED CHANNELS
  // ===================================================

  const selectedChannels =
    useMemo(
      () =>
        CHANNELS.filter(
          (channel) =>
            selectedChannelIds.includes(
              channel.id
            )
        ),
      [
        selectedChannelIds,
      ]
    );

  // ===================================================
  // CONTINUER
  // ===================================================

  function continueToPublication() {
    setError("");

    if (
      products.length ===
      0
    ) {
      setError(
        "Aucun produit n'est disponible pour cette publicité."
      );

      return;
    }

    if (
      selectedChannelIds.length ===
      0
    ) {
      setError(
        "Veuillez sélectionner au moins un canal marketing."
      );

      return;
    }

    // ================================================
    // PRODUITS
    // ================================================

    const productIds =
      products.map(
        (product) =>
          product.id
      );

    // ================================================
    // CANAUX
    // ================================================

    sessionStorage.setItem(
      "marketing_selected_products",
      JSON.stringify(
        productIds
      )
    );

    sessionStorage.setItem(
      "marketing_selected_channels",
      JSON.stringify(
        selectedChannelIds
      )
    );

    // ================================================
    // POUR L'INSTANT :
    //
    // Pas de /campaign.
    //
    // On reste sur la page channels et on affiche
    // la confirmation.
    // ================================================

    setError("");

    alert(
      `Votre sélection est prête : ${productIds.length} produit(s) et ${selectedChannelIds.length} canal(aux).`
    );
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">

        <div className="flex min-h-screen items-center justify-center px-6">

          <div className="flex flex-col items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Loader2
                size={32}
                className="animate-spin text-[#08192D]"
              />
            </div>

            <div className="text-center">

              <p className="font-semibold text-[#08192D]">
                Préparation de votre publicité...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Chargement de vos produits sélectionnés.
              </p>

            </div>

          </div>

        </div>

      </main>
    );
  }

  // ===================================================
  // ERROR / EMPTY
  // ===================================================

  if (
    products.length ===
    0
  ) {
    return (
      <main className="min-h-screen bg-slate-50">

        <section className="border-b bg-white">

          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

            <Link
              href="/marketing/product"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#08192D]"
            >
              <ArrowLeft
                size={18}
              />

              Retour aux produits
            </Link>

          </div>

        </section>

        <section className="flex min-h-[70vh] items-center justify-center px-6">

          <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <AlertCircle
                size={40}
                className="text-red-500"
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-[#08192D]">
              Aucun produit sélectionné
            </h1>

            <p className="mt-3 text-slate-500">
              {error ||
                "Sélectionnez au moins un produit avant de choisir vos canaux."}
            </p>

            <Link
              href="/marketing/product"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
            >
              Sélectionner mes produits

              <ArrowRight
                size={18}
              />
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <Link
            href="/marketing/product"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#08192D]"
          >
            <ArrowLeft
              size={18}
            />

            Retour aux produits
          </Link>

          <div className="mt-8">

            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-[#08192D]">
              <Megaphone
                size={17}
              />

              Marketing
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#08192D] md:text-5xl">
              Choisissez vos canaux
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
              Sélectionnez plusieurs réseaux sociaux
              et canaux de communication pour diffuser
              votre publicité.
            </p>

          </div>

          {/* PROGRESS */}

          <div className="mt-10 flex items-center gap-3">

            <Step
              number="1"
              title="Produits"
              completed
            />

            <div className="h-px flex-1 bg-[#08192D]" />

            <Step
              number="2"
              title="Canaux"
              active
            />

            <div className="h-px flex-1 bg-slate-200" />

            <Step
              number="3"
              title="Publication"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* ERROR */}

        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle
              size={21}
              className="mt-0.5 shrink-0"
            />

            <p className="text-sm font-medium">
              {error}
            </p>

          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              CHANNELS
          ================================================= */}

          <div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#08192D]">
                  Où voulez-vous faire votre publicité ?
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Vous pouvez sélectionner plusieurs
                  canaux en même temps.
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={
                    selectAllChannels
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#08192D] transition hover:bg-slate-50"
                >
                  Tout sélectionner
                </button>

                <button
                  type="button"
                  onClick={
                    clearChannels
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
                >
                  Effacer
                </button>

              </div>

            </div>

            {/* CHANNEL GRID */}

            <div className="grid gap-5 sm:grid-cols-2">

              {CHANNELS.map(
                (channel) => {

                  const selected =
                    selectedChannelIds.includes(
                      channel.id
                    );

                  return (
                    <button
                      key={
                        channel.id
                      }
                      type="button"
                      disabled={
                        !channel.available
                      }
                      onClick={() =>
                        toggleChannel(
                          channel.id
                        )
                      }
                      className={`group relative rounded-3xl bg-white p-6 text-left transition duration-300 ${
                        selected
                          ? "shadow-xl ring-2 ring-[#08192D]"
                          : "shadow-sm ring-1 ring-slate-100 hover:-translate-y-1 hover:shadow-lg"
                      } ${
                        !channel.available
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >

                      {/* CHECK */}

                      {selected && (
                        <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#08192D] text-white">
                          <Check
                            size={17}
                          />
                        </div>
                      )}

                      {/* ICON */}

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                          selected
                            ? "bg-[#08192D] text-white"
                            : "bg-slate-100 text-[#08192D]"
                        }`}
                      >
                        {
                          channel.icon
                        }
                      </div>

                      {/* TEXT */}

                      <h3 className="mt-5 text-lg font-bold text-[#08192D]">
                        {
                          channel.name
                        }
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {
                          channel.description
                        }
                      </p>

                      {!channel.available && (
                        <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                          Bientôt disponible
                        </span>
                      )}

                      {selected && (
                        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">

                          <CheckCircle2
                            size={16}
                          />

                          Canal sélectionné

                        </div>
                      )}

                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:h-fit">

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#08192D] text-white">
                <Sparkles
                  size={23}
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#08192D]">
                Résumé
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Vérifiez les produits et les canaux
                sélectionnés.
              </p>

              {/* =================================================
                  PRODUCTS
              ================================================= */}

              <div className="mt-6">

                <div className="flex items-center justify-between">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Produits
                  </p>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#08192D]">
                    {
                      products.length
                    }
                  </span>

                </div>

                <div className="mt-3 space-y-3">

                  {products.map(
                    (product) => (
                      <div
                        key={
                          product.id
                        }
                        className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
                      >

                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white">

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
                            <div className="flex h-full w-full items-center justify-center">
                              <ShoppingBag
                                size={
                                  20
                                }
                                className="text-slate-300"
                              />
                            </div>
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-[#08192D]">
                            {
                              product.name
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {formatPrice(
                              product.price,
                              product.currency
                            )}
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  CHANNELS
              ================================================= */}

              <div className="mt-7 border-t border-slate-100 pt-6">

                <div className="flex items-center justify-between">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Canaux
                  </p>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#08192D]">
                    {
                      selectedChannelIds.length
                    }
                  </span>

                </div>

                {selectedChannels.length ===
                0 ? (
                  <div className="mt-3 rounded-2xl bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">
                      Aucun canal sélectionné.
                    </p>

                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">

                    {selectedChannels.map(
                      (channel) => (
                        <span
                          key={
                            channel.id
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-[#08192D] px-3 py-2 text-xs font-semibold text-white"
                        >

                          {
                            channel.icon
                          }

                          {
                            channel.name
                          }

                        </span>
                      )
                    )}

                  </div>
                )}

              </div>

              {/* =================================================
                  CTA
              ================================================= */}

              <button
                type="button"
                onClick={
                  continueToPublication
                }
                disabled={
                  selectedChannelIds.length ===
                  0
                }
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-5 py-4 font-semibold text-white transition hover:bg-[#102c4e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continuer

                <ArrowRight
                  size={19}
                />
              </button>

              <Link
                href={`/marketing/product?selected=${products
                  .map(
                    (product) =>
                      product.id
                  )
                  .join(",")}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft
                  size={16}
                />

                Modifier mes produits
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

// =====================================================
// STEP COMPONENT
// =====================================================

interface StepProps {
  number: string;
  title: string;
  active?: boolean;
  completed?: boolean;
}

function Step({
  number,
  title,
  active = false,
  completed = false,
}: StepProps) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
          active ||
          completed
            ? "bg-[#08192D] text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? (
          <Check
            size={17}
          />
        ) : (
          number
        )}
      </div>

      <span
        className={`hidden text-sm font-semibold sm:block ${
          active ||
          completed
            ? "text-[#08192D]"
            : "text-slate-400"
        }`}
      >
        {title}
      </span>

    </div>
  );
}