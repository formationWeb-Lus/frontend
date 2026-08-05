
"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Megaphone,
  MessageCircle,
  Music2,
  Share2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Copy,
  CheckCircle2,
  Globe,
} from "lucide-react";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

// =====================================================
// TYPES
// =====================================================

type ChannelId =
  | "facebook"
  | "tiktok"
  | "whatsapp"
  | "x"
  | "linkedin";

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

  videoUrl?: string | null;

  status: string;

  createdAt?: string;

  paymentPage?: PaymentPage | null;

  paymentUrl?: string | null;
}

interface ProductsApiResponse {
  success: boolean;
  message?: string;
  products?: Product[];
  total?: number;
}

interface Channel {
  id: ChannelId;
  name: string;
  description: string;
  icon: React.ReactNode;
  className: string;
}

// =====================================================
// API
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// =====================================================
// SITE URL
// =====================================================

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

// =====================================================
// FACEBOOK ICON
// =====================================================

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1Z" />
    </svg>
  );
}

// =====================================================
// LINKEDIN ICON
// =====================================================

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v11H4V10Zm8 0h4.8v1.5h.1c.7-1.2 2.2-2 4.1-2 4.4 0 5 2.9 5 6.7V21h-5v-4.3c0-1 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V21h-5V10Z" />
    </svg>
  );
}

// =====================================================
// TIKTOK ICON
// =====================================================

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M15.5 3c.3 2.4 1.6 3.8 4 4v3.2c-1.5 0-2.9-.4-4-1.1v6.7c0 3.9-2.6 6.2-6 6.2-3.2 0-5.5-2.2-5.5-5.3 0-3.3 2.6-5.6 6.1-5.6.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-1.4 0-2.7.9-2.7 2.5 0 1.4 1 2.3 2.3 2.3 1.5 0 2.5-1 2.5-2.9V3h3.3Z" />
    </svg>
  );
}

// =====================================================
// X ICON
// =====================================================

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.2l-4.9-6.4L6.5 22H3.4l7.3-8.4L2.8 2H9l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
    </svg>
  );
}

// =====================================================
// WHATSAPP ICON
// =====================================================

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.6 6L.1 24l6.3-1.6a12 12 0 0 0 5.7 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.2-1.3-6.2-3.5-8.4ZM12.1 21.7c-1.8 0-3.5-.5-5-1.3l-.4-.2-3.7.9 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 0 5.4-4.4 9.8-9.9 9.8Zm5.4-7.3c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.3-.6.1-1.5-.7-2.5-1.3-3.5-2.9-.3-.5.3-.5.8-1.7.1-.2 0-.4-.1-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7 0 1.6 1.2 3.2 1.4 3.4.2.2 2.4 3.7 5.9 5.2 2.2.9 3 .9 4.1.8.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

// =====================================================
// CHANNELS
// =====================================================

const CHANNELS: Channel[] = [
  {
    id: "facebook",
    name: "Facebook",
    description:
      "Partagez votre produit directement sur Facebook.",
    className:
      "bg-blue-50 text-blue-600",
    icon: <FacebookIcon />,
  },

  {
    id: "tiktok",
    name: "TikTok",
    description:
      "Ouvrez TikTok pour publier votre contenu.",
    className:
      "bg-slate-100 text-slate-900",
    icon: <TikTokIcon />,
  },

  {
    id: "whatsapp",
    name: "WhatsApp",
    description:
      "Envoyez votre produit avec son titre, son prix et son lien.",
    className:
      "bg-green-50 text-green-600",
    icon: <WhatsAppIcon />,
  },

  {
    id: "x",
    name: "X",
    description:
      "Publiez votre produit sur X avec son lien.",
    className:
      "bg-slate-100 text-slate-900",
    icon: <XIcon />,
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    description:
      "Partagez votre produit sur LinkedIn.",
    className:
      "bg-sky-50 text-sky-700",
    icon: <LinkedinIcon />,
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

  const [selectedProductId, setSelectedProductId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [sharingChannel, setSharingChannel] =
    useState<ChannelId | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  // ===================================================
  // PRODUCT IDS
  // ===================================================

  const selectedProductIds =
    useMemo(() => {
      const parameter =
        searchParams.get("products");

      if (!parameter) {
        return [];
      }

      return [
        ...new Set(
          parameter
            .split(",")
            .map((value) =>
              Number(value.trim())
            )
            .filter(
              (id) =>
                Number.isInteger(id) &&
                id > 0
            )
        ),
      ];
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

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
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
  // ABSOLUTE MEDIA URL
  // ===================================================

  function getAbsoluteMediaUrl(
    url?: string | null
  ): string | null {
    if (!url) {
      return null;
    }

    try {
      if (
        url.startsWith("http://") ||
        url.startsWith("https://")
      ) {
        return url;
      }

      return new URL(
        url,
        API_URL
      ).toString();
    } catch {
      return null;
    }
  }

  // ===================================================
  // LOAD PRODUCTS
  // ===================================================

  const loadProducts =
    useCallback(
      async () => {
        try {
          setLoading(true);
          setError("");
          setSuccess("");

          if (
            selectedProductIds.length ===
            0
          ) {
            throw new Error(
              "Aucun produit n'a été sélectionné."
            );
          }

          const token =
            getToken();

          if (!token) {
            throw new Error(
              "Votre session a expiré. Veuillez vous reconnecter."
            );
          }

          /*
           * IMPORTANT
           *
           * Ton serveur utilise :
           *
           * app.use("/api/marketing", marketingRoutes)
           *
           * et ta route est :
           *
           * router.get("/products", ...)
           *
           * Donc l'URL correcte est :
           *
           * /api/marketing/products
           */

          const response = await fetch(
  `${API_URL}/marketing/products`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }
);

          let data:
            ProductsApiResponse;

          try {
            data =
              await response.json();
          } catch {
            throw new Error(
              "La réponse du serveur est invalide."
            );
          }

          if (
            response.status ===
            401
          ) {
            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "accessToken"
            );

            throw new Error(
              "Votre session n'est plus valide. Veuillez vous reconnecter."
            );
          }

          if (!response.ok) {
            throw new Error(
              data?.message ||
                `Erreur serveur (${response.status}).`
            );
          }

          if (!data.success) {
            throw new Error(
              data.message ||
                "Impossible de récupérer vos produits Marketing."
            );
          }

          const userProducts =
            Array.isArray(
              data.products
            )
              ? data.products
              : [];

          /*
           * On garde uniquement les produits
           * sélectionnés dans l'étape précédente.
           */

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
              "Les produits sélectionnés ne sont plus disponibles ou ne sont pas publiés."
            );
          }

          setProducts(
            selectedProducts
          );

          /*
           * Sélection automatique
           * du premier produit.
           */

          setSelectedProductId(
            selectedProducts[0].id
          );

          /*
           * Sauvegarde pour les étapes
           * suivantes.
           */

          sessionStorage.setItem(
            "marketing_selected_products",
            JSON.stringify(
              selectedProducts.map(
                (product) =>
                  product.id
              )
            )
          );
        } catch (err) {
          console.error(
            "MARKETING PRODUCTS ERROR:",
            err
          );

          setProducts([]);
          setSelectedProductId(null);

          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger les produits."
          );
        } finally {
          setLoading(false);
        }
      },
      [selectedProductIds]
    );

  // ===================================================
  // LOAD
  // ===================================================

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ===================================================
  // CURRENT PRODUCT
  // ===================================================

  const selectedProduct =
    useMemo(
      () =>
        products.find(
          (product) =>
            product.id ===
            selectedProductId
        ) ||
        products[0] ||
        null,
      [
        products,
        selectedProductId,
      ]
    );

  // ===================================================
  // PUBLIC PRODUCT URL
  // ===================================================

  function getProductPublicUrl(
    product: Product
  ): string {
    /*
     * PRIORITÉ 1 :
     * URL fournie par le backend.
     */

    if (
      product.paymentUrl
    ) {
      try {
        return new URL(
          product.paymentUrl,
          SITE_URL
        ).toString();
      } catch {
        // continue
      }
    }

    /*
     * PRIORITÉ 2 :
     * paymentPage.slug
     */

    const slug =
      product.paymentPage
        ?.slug;

    if (slug) {
      return `${SITE_URL}/pay/${encodeURIComponent(
        slug
      )}`;
    }

    /*
     * FALLBACK
     */

    return `${SITE_URL}/pay/${product.id}`;
  }

  // ===================================================
  // SHARE TEXT
  // ===================================================

  function getShareText(
    product: Product
  ): string {
    const price =
      formatPrice(
        product.price,
        product.currency
      );

    const subtitle =
      product.subtitle ||
      product.description ||
      "";

    const url =
      getProductPublicUrl(
        product
      );

    return [
      `🛍️ ${product.name}`,
      subtitle,
      `💰 Prix : ${price}`,
      "",
      `🔗 Acheter / découvrir :`,
      url,
    ]
      .filter(
        (value) =>
          value !== ""
      )
      .join("\n");
  }

  // ===================================================
  // COPY LINK
  // ===================================================

  async function copyProductLink() {
    if (
      !selectedProduct
    ) {
      return;
    }

    try {
      const url =
        getProductPublicUrl(
          selectedProduct
        );

      await navigator.clipboard.writeText(
        url
      );

      setCopied(true);
      setError("");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "COPY LINK ERROR:",
        error
      );

      setError(
        "Impossible de copier le lien."
      );
    }
  }

  // ===================================================
  // OPEN SHARE WINDOW
  // ===================================================

  function openShareWindow(
    url: string
  ) {
    const popup =
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    if (!popup) {
      setError(
        "La fenêtre de partage a été bloquée par votre navigateur. Autorisez les fenêtres pop-up puis réessayez."
      );

      return false;
    }

    return true;
  }

  // ===================================================
  // SHARE PRODUCT
  // ===================================================

  async function shareProduct(
    channelId: ChannelId
  ) {
    if (
      !selectedProduct
    ) {
      setError(
        "Veuillez sélectionner un produit."
      );

      return;
    }

    try {
      setError("");
      setSuccess("");

      setSharingChannel(
        channelId
      );

      const product =
        selectedProduct;

      const productUrl =
        getProductPublicUrl(
          product
        );

      const shareText =
        getShareText(
          product
        );

      /*
       * Vérification de l'URL.
       */

      if (
        !productUrl.startsWith(
          "http://"
        ) &&
        !productUrl.startsWith(
          "https://"
        )
      ) {
        throw new Error(
          "L'URL du produit doit être une URL publique complète."
        );
      }

      // =================================================
      // FACEBOOK
      // =================================================

      if (
        channelId ===
        "facebook"
      ) {
        /*
         * Facebook permet principalement
         * de transmettre l'URL.
         *
         * Le titre, sous-titre et image
         * seront idéalement récupérés par
         * Facebook depuis la page publique
         * via les métadonnées Open Graph.
         */

        const facebookUrl =
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            productUrl
          )}`;

        const opened =
          openShareWindow(
            facebookUrl
          );

        if (opened) {
          setSuccess(
            `Facebook est ouvert avec le produit « ${product.name} ». Cliquez sur Publier pour terminer.`
          );
        }

        return;
      }

      // =================================================
      // WHATSAPP
      // =================================================

      if (
        channelId ===
        "whatsapp"
      ) {
        /*
         * WhatsApp reçoit directement :
         *
         * - titre
         * - sous-titre
         * - prix
         * - lien
         */

        const whatsappUrl =
          `https://wa.me/?text=${encodeURIComponent(
            shareText
          )}`;

        const opened =
          openShareWindow(
            whatsappUrl
          );

        if (opened) {
          setSuccess(
            `WhatsApp est ouvert avec les informations de « ${product.name} ».`
          );
        }

        return;
      }

      // =================================================
      // X
      // =================================================

      if (
        channelId ===
        "x"
      ) {
        const xUrl =
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}`;

        const opened =
          openShareWindow(
            xUrl
          );

        if (opened) {
          setSuccess(
            `X est ouvert avec le contenu de « ${product.name} ».`
          );
        }

        return;
      }

      // =================================================
      // LINKEDIN
      // =================================================

      if (
        channelId ===
        "linkedin"
      ) {
        /*
         * LinkedIn reçoit l'URL publique.
         *
         * LinkedIn récupère ensuite le titre,
         * la description et l'image depuis
         * la page publique.
         */

        const linkedinUrl =
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            productUrl
          )}`;

        const opened =
          openShareWindow(
            linkedinUrl
          );

        if (opened) {
          setSuccess(
            `LinkedIn est ouvert avec le produit « ${product.name} ». Cliquez sur Publier pour terminer.`
          );
        }

        return;
      }

      // =================================================
      // TIKTOK
      // =================================================

      if (
        channelId ===
        "tiktok"
      ) {
        const opened =
          openShareWindow(
            "https://www.tiktok.com/upload"
          );

        if (!opened) {
          return;
        }

        if (
          product.videoUrl
        ) {
          setSuccess(
            `TikTok est ouvert. La vidéo de « ${product.name} » est disponible dans votre produit.`
          );
        } else {
          setSuccess(
            `TikTok est ouvert. Ajoutez votre contenu pour publier « ${product.name} ».`
          );
        }

        return;
      }
    } catch (error) {
      console.error(
        "SHARE PRODUCT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Impossible de partager le produit."
      );
    } finally {
      setSharingChannel(
        null
      );
    }
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
              <svg
                className="h-8 w-8 animate-spin text-[#08192D]"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="42 20"
                />
              </svg>
            </div>

            <div className="text-center">
              <p className="font-semibold text-[#08192D]">
                Préparation de votre publication...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Récupération de vos produits.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ===================================================
  // NO PRODUCTS
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#08192D]"
            >
              <ArrowLeft size={18} />

              Retour aux produits
            </Link>
          </div>
        </section>

        <section className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
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
                "Sélectionnez au moins un produit avant de continuer."}
            </p>

            <Link
              href="/marketing/product"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white hover:bg-[#102840]"
            >
              Sélectionner mes produits

              <ArrowRight size={18} />
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#08192D]"
          >
            <ArrowLeft size={18} />

            Retour aux produits
          </Link>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-[#08192D]">
              <Megaphone size={17} />

              Marketing
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#08192D] md:text-5xl">
              Partager votre produit
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
              Sélectionnez un produit puis
              choisissez le réseau social sur
              lequel vous souhaitez le publier.
            </p>
          </div>

          {/* PROGRESS */}

          <div className="mt-10 flex items-center gap-3">
            <Step
              number="1"
              title="Produit"
              completed
            />

            <div className="h-px flex-1 bg-[#08192D]" />

            <Step
              number="2"
              title="Réseau social"
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
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle
              size={21}
              className="mt-0.5 shrink-0"
            />

            <p className="text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle2
              size={21}
              className="mt-0.5 shrink-0"
            />

            <p className="text-sm font-medium">
              {success}
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div>
            <h2 className="text-2xl font-bold text-[#08192D]">
              Vos produits sélectionnés
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Cliquez sur un produit pour le
              sélectionner avant de choisir un
              réseau social.
            </p>

            <div className="mt-6 grid gap-5">
              {products.map(
                (product) => {
                  const selected =
                    selectedProduct?.id ===
                    product.id;

                  const image =
                    getAbsoluteMediaUrl(
                      product.imageUrl
                    );

                  const video =
                    getAbsoluteMediaUrl(
                      product.videoUrl
                    );

                  const publicUrl =
                    getProductPublicUrl(
                      product
                    );

                  return (
                    <button
                      key={
                        product.id
                      }
                      type="button"
                      onClick={() =>
                        setSelectedProductId(
                          product.id
                        )
                      }
                      className={`w-full rounded-3xl bg-white p-5 text-left transition ${
                        selected
                          ? "shadow-xl ring-2 ring-[#08192D]"
                          : "shadow-sm ring-1 ring-slate-100 hover:shadow-md"
                      }`}
                    >
                      <div className="flex gap-5">
                        {/* MEDIA */}

                        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                          {video ? (
                            <video
                              src={video}
                              className="h-full w-full object-cover"
                              muted
                              playsInline
                            />
                          ) : image ? (
                            <img
                              src={image}
                              alt={
                                product.name
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ShoppingBag
                                size={28}
                                className="text-slate-300"
                              />
                            </div>
                          )}

                          {video && (
                            <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                              VIDÉO
                            </div>
                          )}
                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold text-[#08192D]">
                                {
                                  product.name
                                }
                              </h3>

                              {product.subtitle && (
                                <p className="mt-1 text-sm text-slate-500">
                                  {
                                    product.subtitle
                                  }
                                </p>
                              )}
                            </div>

                            {selected && (
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#08192D] text-white">
                                <Check
                                  size={17}
                                />
                              </div>
                            )}
                          </div>

                          <p className="mt-4 text-sm font-bold text-[#08192D]">
                            {formatPrice(
                              product.price,
                              product.currency
                            )}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <Globe
                              size={14}
                              className="shrink-0 text-slate-400"
                            />

                            <p className="truncate text-xs text-slate-400">
                              {publicUrl}
                            </p>
                          </div>

                          <p className="mt-2 text-xs text-slate-400">
                            {video
                              ? "Image + vidéo disponibles"
                              : image
                              ? "Image disponible"
                              : "Aucun média"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              SOCIAL NETWORKS
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#08192D] text-white">
                <Sparkles size={23} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#08192D]">
                Publier sur
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Les informations de votre produit
                seront préparées automatiquement
                avant l'ouverture du réseau social.
              </p>

              {/* SELECTED PRODUCT */}

              {selectedProduct && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Produit sélectionné
                  </p>

                  <p className="mt-2 font-bold text-[#08192D]">
                    {
                      selectedProduct.name
                    }
                  </p>

                  {selectedProduct.subtitle && (
                    <p className="mt-1 text-sm text-slate-500">
                      {
                        selectedProduct.subtitle
                      }
                    </p>
                  )}

                  <p className="mt-2 text-xs font-semibold text-[#08192D]">
                    {formatPrice(
                      selectedProduct.price,
                      selectedProduct.currency
                    )}
                  </p>
                </div>
              )}

              {/* PUBLIC URL */}

              {selectedProduct && (
                <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Lien public
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <p className="min-w-0 flex-1 truncate text-xs text-slate-500">
                      {getProductPublicUrl(
                        selectedProduct
                      )}
                    </p>

                    <button
                      type="button"
                      onClick={
                        copyProductLink
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#08192D] hover:bg-slate-200"
                      title="Copier le lien"
                    >
                      {copied ? (
                        <Check
                          size={16}
                        />
                      ) : (
                        <Copy
                          size={16}
                        />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* SHARE PREVIEW */}

              {selectedProduct && (
                <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Aperçu du partage
                  </p>

                  <div className="mt-3 rounded-xl bg-slate-50 p-3">
                    <p className="whitespace-pre-line text-xs leading-5 text-slate-600">
                      {getShareText(
                        selectedProduct
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* CHANNELS */}

              <div className="mt-6 space-y-3">
                {CHANNELS.map(
                  (channel) => {
                    const sharing =
                      sharingChannel ===
                      channel.id;

                    return (
                      <button
                        key={
                          channel.id
                        }
                        type="button"
                        disabled={
                          Boolean(
                            sharingChannel
                          )
                        }
                        onClick={() =>
                          shareProduct(
                            channel.id
                          )
                        }
                        className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#08192D] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${channel.className}`}
                        >
                          {channel.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-[#08192D]">
                            {
                              channel.name
                            }
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {
                              channel.description
                            }
                          </p>
                        </div>

                        {sharing ? (
                          <svg
                            className="h-5 w-5 animate-spin text-[#08192D]"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray="42 20"
                            />
                          </svg>
                        ) : (
                          <ExternalLink
                            size={18}
                            className="shrink-0 text-slate-400 transition group-hover:text-[#08192D]"
                          />
                        )}
                      </button>
                    );
                  }
                )}
              </div>

              {/* MEDIA INFO */}

              {selectedProduct && (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Médias du produit
                  </p>

                  <div className="mt-3 space-y-2">
                    {selectedProduct.imageUrl && (
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <CheckCircle2
                          size={16}
                          className="text-green-500"
                        />

                        <span className="text-xs font-medium text-slate-600">
                          Image disponible
                        </span>
                      </div>
                    )}

                    {selectedProduct.videoUrl && (
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <CheckCircle2
                          size={16}
                          className="text-green-500"
                        />

                        <span className="text-xs font-medium text-slate-600">
                          Vidéo disponible
                        </span>
                      </div>
                    )}

                    {!selectedProduct.imageUrl &&
                      !selectedProduct.videoUrl && (
                        <div className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
                          Ce produit ne possède
                          actuellement aucun média.
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* BACK */}

              <Link
                href={`/marketing/product?selected=${products
                  .map(
                    (product) =>
                      product.id
                  )
                  .join(",")}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
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
// STEP
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
          <Check size={17} />
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

