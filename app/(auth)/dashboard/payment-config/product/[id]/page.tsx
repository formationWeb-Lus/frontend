"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Save,
  ShieldCheck,
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
  type: string;
  price: number;
  currency: string;
  status: string;
  imageUrl?: string | null;
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

interface ApiResponse {
  success: boolean;
  message?: string;

  product?: Product;

  configuration?: PaymentConfiguration;
}

/* =====================================================
   DEFAULT CONFIGURATION
===================================================== */

const DEFAULT_CONFIGURATION: PaymentConfiguration = {
  id: null,

  airtel: "",
  orange: "",
  mpesa: "",
  afrimoney: "",
  visa: "",

  status: "PENDING",
  active: false,
};

/* =====================================================
   PAGE
===================================================== */

export default function PaymentConfigurationPage() {
  const params = useParams();
  const router = useRouter();

  /* ===================================================
     RÉCUPÉRATION SÉCURISÉE DU PRODUCT ID
  =================================================== */

  const rawId = params?.id;

  const productId: string | null =
    typeof rawId === "string"
      ? rawId
      : Array.isArray(rawId)
      ? rawId[0] ?? null
      : null;

  /* ===================================================
     STATE
  =================================================== */

  const [product, setProduct] =
    useState<Product | null>(null);

  const [configuration, setConfiguration] =
    useState<PaymentConfiguration>(
      DEFAULT_CONFIGURATION
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState<string | null>(null);

  /* ===================================================
     TOKEN
  =================================================== */

  const getToken = useCallback(() => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    const token =
      localStorage.getItem("token");

    return token;
  }, []);

  /* ===================================================
     CHARGER LA CONFIGURATION
  =================================================== */

  const loadConfiguration =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        setMessage(null);

        if (!productId) {
          throw new Error(
            "Identifiant du produit invalide."
          );
        }

        const token = getToken();

        if (!token) {
          throw new Error(
            "Votre session n'est plus valide. Veuillez vous reconnecter."
          );
        }

        const response = await fetch(
          `${API_URL}/payment-config/product/${encodeURIComponent(productId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Impossible de récupérer la configuration de paiement"
          );
        }

        let data: ApiResponse | null = null;

        try {
          data = (await response.json()) as ApiResponse;
        } catch {
          data = null;
        }

        if (response.status === 401) {
          localStorage.removeItem("token");
          throw new Error(
            "Votre session n'est plus valide. Veuillez vous reconnecter."
          );
        }

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message ||
              "Impossible de charger la configuration de paiement."
          );
        }

        if (data.product) {
          setProduct(data.product);
        }

        if (data.configuration) {
          setConfiguration({
            id: data.configuration.id ?? null,
            airtel: data.configuration.airtel ?? "",
            orange: data.configuration.orange ?? "",
            mpesa: data.configuration.mpesa ?? "",
            afrimoney: data.configuration.afrimoney ?? "",
            visa: data.configuration.visa ?? "",
            status: data.configuration.status ?? "PENDING",
            active: Boolean(data.configuration.active),
          });
        } else {
          setConfiguration(DEFAULT_CONFIGURATION);
        }
      } catch (err) {
        console.error("GET PAYMENT CONFIG ERROR:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue lors du chargement."
        );
      } finally {
        setLoading(false);
      }
    }, [productId, getToken]);

  useEffect(() => {
    loadConfiguration();
  }, [loadConfiguration]);

  function updateField(
    field: "airtel" | "orange" | "mpesa" | "afrimoney" | "visa",
    value: string
  ) {
    setConfiguration((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      setMessage(null);

      if (!productId) {
        throw new Error("Identifiant du produit invalide.");
      }

      const token = getToken();

      if (!token) {
        throw new Error(
          "Votre session n'est plus valide. Veuillez vous reconnecter."
        );
      }

      const hasPaymentMethod =
        Boolean(configuration.airtel?.trim()) ||
        Boolean(configuration.orange?.trim()) ||
        Boolean(configuration.mpesa?.trim()) ||
        Boolean(configuration.afrimoney?.trim()) ||
        Boolean(configuration.visa?.trim());

      if (!hasPaymentMethod) {
        throw new Error(
          "Veuillez configurer au moins un moyen de paiement."
        );
      }

      const payload = {
        airtel: configuration.airtel?.trim() || null,
        orange: configuration.orange?.trim() || null,
        mpesa: configuration.mpesa?.trim() || null,
        afrimoney: configuration.afrimoney?.trim() || null,
        visa: configuration.visa?.trim() || null,
      };

      const response = await fetch(
        `${API_URL}/api/payment-config/product/${encodeURIComponent(productId)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      let data: ApiResponse | null = null;

      try {
        data = (await response.json()) as ApiResponse;
      } catch {
        data = null;
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error(
          "Votre session n'est plus valide. Veuillez vous reconnecter."
        );
      }

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Impossible d'enregistrer la configuration."
        );
      }

      if (data.configuration) {
        setConfiguration({
          id: data.configuration.id ?? null,
          airtel: data.configuration.airtel ?? "",
          orange: data.configuration.orange ?? "",
          mpesa: data.configuration.mpesa ?? "",
          afrimoney: data.configuration.afrimoney ?? "",
          visa: data.configuration.visa ?? "",
          status: data.configuration.status ?? "ACTIVE",
          active: Boolean(data.configuration.active),
        });
      }

      setMessage(
        data.message ||
          "Configuration de paiement enregistrée avec succès."
      );
    } catch (err) {
      console.error("SAVE PAYMENT CONFIG ERROR:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'enregistrement."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 size={25} className="animate-spin" />
            <span className="font-medium">
              Chargement de la configuration...
            </span>
          </div>
        </div>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/dashboard/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#08192D]"
          >
            <ArrowLeft size={18} />
            Retour aux produits
          </Link>

          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3 text-red-700">
              <AlertCircle size={23} className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <h2 className="font-bold">
                  Impossible de charger la configuration
                </h2>
                <p className="mt-1 text-sm leading-6">{error}</p>
                <button
                  type="button"
                  onClick={() => loadConfiguration()}
                  className="mt-4 inline-flex items-center rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ===================================================
          META PIXEL CODE
      =================================================== */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4331977260409210');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=4331977260409210&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/dashboard/products"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#08192D]"
          >
            <ArrowLeft size={18} />
            Retour aux produits
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-[#08192D] sm:text-4xl">
            Configuration des paiements
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Configurez les comptes de paiement associés à ce produit afin de recevoir directement les paiements de vos clients.
          </p>
        </div>

        {/* PRODUCT */}
        {product && (
          <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <WalletCards size={34} className="text-slate-400" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Produit concerné
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#08192D]">
                  {product.name}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">
                    {product.type}
                  </span>
                  <span className="font-bold text-[#08192D]">
                    {product.price} {product.currency}
                  </span>
                  <span>{product.status}</span>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                    configuration.active
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      configuration.active ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  {configuration.active
                    ? "Paiements actifs"
                    : "Configuration en attente"}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle2 size={21} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && product && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={21} className="mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{error}</p>
              <button
                type="button"
                onClick={() => setError(null)}
                className="mt-2 text-xs font-bold underline"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* PAYMENT CONFIGURATION FORM */}
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#08192D] text-white">
                <CreditCard size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#08192D]">
                  Moyens de paiement
                </h2>
                <p className="text-sm text-slate-500">
                  Ajoutez les comptes sur lesquels vous souhaitez recevoir vos paiements.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <PaymentMethod
              title="Airtel Money"
              description="Compte Airtel Money utilisé pour recevoir les paiements."
              icon="AM"
              value={configuration.airtel || ""}
              placeholder="Ex. 2439XXXXXXXX"
              onChange={(value) => updateField("airtel", value)}
            />

            <PaymentMethod
              title="Orange Money"
              description="Compte Orange Money utilisé pour recevoir les paiements."
              icon="OM"
              value={configuration.orange || ""}
              placeholder="Ex. 2438XXXXXXXX"
              onChange={(value) => updateField("orange", value)}
            />

            <PaymentMethod
              title="M-Pesa"
              description="Compte M-Pesa utilisé pour recevoir les paiements."
              icon="MP"
              value={configuration.mpesa || ""}
              placeholder="Ex. 2438XXXXXXXX"
              onChange={(value) => updateField("mpesa", value)}
            />

            <PaymentMethod
              title="Afrimoney"
              description="Compte Afrimoney utilisé pour recevoir les paiements."
              icon="AF"
              value={configuration.afrimoney || ""}
              placeholder="Ex. 2439XXXXXXXX"
              onChange={(value) => updateField("afrimoney", value)}
            />

            <PaymentMethod
              title="Visa"
              description="Identifiant marchand ou compte Visa fourni par votre prestataire."
              icon="VISA"
              value={configuration.visa || ""}
              placeholder="Identifiant marchand Visa"
              onChange={(value) => updateField("visa", value)}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-blue-600" />
              <div>
                <h3 className="font-bold text-blue-900">
                  Configuration sécurisée
                </h3>
                <p className="mt-1 text-sm leading-6 text-blue-700">
                  Les comptes renseignés seront associés uniquement à ce produit. Les paiements effectués par les clients pourront ainsi être rattachés au bon produit et au bon commerçant.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/products"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Annuler
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-7 py-3.5 font-semibold text-white transition hover:bg-[#102c4e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={19} />
                  Enregistrer les paiements
                </>
              )}
            </button>
          </div>
        </section>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <Smartphone size={21} className="mt-0.5 shrink-0 text-slate-500" />
          <p className="text-sm leading-6 text-slate-500">
            Vous pouvez configurer un ou plusieurs moyens de paiement. Seuls les moyens renseignés seront proposés aux clients lors du paiement de ce produit.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   PAYMENT METHOD
===================================================== */

interface PaymentMethodProps {
  title: string;
  description: string;
  icon: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function PaymentMethod({
  title,
  description,
  icon,
  value,
  placeholder,
  onChange,
}: PaymentMethodProps) {
  const configured = Boolean(value.trim());

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        configured
          ? "border-green-200 bg-green-50/30"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#08192D] text-xs font-bold text-white">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[#08192D]">{title}</h3>
            {configured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                <CheckCircle2 size={13} />
                Configuré
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <div className="w-full sm:max-w-sm">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Compte / identifiant
          </label>
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#08192D] outline-none transition placeholder:text-slate-400 focus:border-[#08192D] focus:ring-2 focus:ring-[#08192D]/10"
          />
        </div>
      </div>
    </div>
  );
}