"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Phone,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   CONFIGURATION API & CONSTANTES
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://paylink.coderise-solution.com/api";

const USD_TO_CDF_RATE = 2230;

/* =========================================================
   TYPES
========================================================= */

type PaymentCurrency = "USD" | "CDF";
type Telecom = "AM" | "OM" | "MP" | "AF";

type ProductFieldType =
  | "TEXT"
  | "TEXTAREA"
  | "NUMBER"
  | "PHONE"
  | "EMAIL"
  | "DATE"
  | "SELECT"
  | "IMAGE"
  | "FILE"
  | "BOOLEAN";

interface ProductField {
  id: number;
  name: string;
  label: string;
  type: ProductFieldType | string;
  value?: string | null;
  required: boolean;
  options?: string[];
}

interface Product {
  id: number;
  userId?: number;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  type: string;
  price: number;
  currency: string;
  imageUrl?: string | null;
  status?: string;
  createdAt?: string;
  fields?: ProductField[];
}

interface PaymentPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  active: boolean;
  createdAt?: string;
}

interface PublicPaymentApiResponse {
  success: boolean;
  paymentPage: PaymentPage;
  totalProducts: number;
  products: Product[];
  message?: string;
}

interface PaymentApiResponse {
  success?: boolean;
  message?: string;
  transactionId?: string;
  status?: string;
  data?: {
    transactionId?: string;
    status?: string;
    message?: string;
  };
}

/* =========================================================
   FONCTIONS UTILITAIRES
========================================================= */

function formatPrice(price: number, currency: string): string {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 2,
    }).format(price) + ` ${currency}`
  );
}

function convertToUsd(amount: number, currency: string): number {
  if (currency === "USD") return amount;
  if (currency === "CDF") return amount / USD_TO_CDF_RATE;
  return amount;
}

function convertToCdf(amount: number, currency: string): number {
  if (currency === "CDF") return amount;
  if (currency === "USD") return amount * USD_TO_CDF_RATE;
  return amount;
}

function formatProductType(type: string): string {
  const types: Record<string, string> = {
    PHYSICAL: "Produit physique",
    DIGITAL: "Produit numérique",
    COURSE: "Formation",
    SERVICE: "Service",
    SCHOOL: "École",
    SUBSCRIPTION: "Abonnement",
  };
  return types[type] || type;
}

function getFieldType(type: string): ProductFieldType {
  const supported: ProductFieldType[] = [
    "TEXT",
    "TEXTAREA",
    "NUMBER",
    "PHONE",
    "EMAIL",
    "DATE",
    "SELECT",
    "IMAGE",
    "FILE",
    "BOOLEAN",
  ];
  return supported.includes(type as ProductFieldType)
    ? (type as ProductFieldType)
    : "TEXT";
}

/* =========================================================
   COMPOSANT PRINCIPAL
========================================================= */

export default function PublicPaymentPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug: string | undefined = Array.isArray(rawSlug)
    ? rawSlug[0]
    : typeof rawSlug === "string"
    ? rawSlug
    : undefined;

  const [data, setData] = useState<PublicPaymentApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({});
  const [telecom, setTelecom] = useState<Telecom | "">("");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [, setPaymentStatus] = useState<string | null>(null);
  const [paymentCurrency, setPaymentCurrency] = useState<PaymentCurrency>("USD");

  useEffect(() => {
    if (typeof slug !== "string" || !slug.trim()) {
      setLoading(false);
      setError("Le lien de paiement est invalide.");
      return;
    }

    const currentSlug: string = slug;
    let cancelled = false;

    async function loadPage() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/public/payment-pages/${encodeURIComponent(currentSlug)}`,
          {
            method: "GET",
            cache: "no-store",
            headers: { Accept: "application/json" },
          }
        );

        let responseData: unknown = null;
        try {
          responseData = await response.json();
        } catch {
          responseData = null;
        }

        if (!response.ok) {
          let message = "Cette page de paiement est indisponible.";
          if (
            typeof responseData === "object" &&
            responseData !== null &&
            "message" in responseData
          ) {
            const serverMessage = (responseData as { message?: unknown }).message;
            if (typeof serverMessage === "string" && serverMessage.trim()) {
              message = serverMessage;
            }
          }
          throw new Error(message);
        }

        if (!responseData || typeof responseData !== "object") {
          throw new Error("Réponse serveur invalide.");
        }

        const apiData = responseData as PublicPaymentApiResponse;

        if (apiData.success !== true) {
          throw new Error(
            apiData.message || "Cette page de paiement est indisponible."
          );
        }

        if (!apiData.paymentPage) {
          throw new Error("Page de paiement introuvable.");
        }

        const product = Array.isArray(apiData.products)
          ? apiData.products[0]
          : null;

        if (!product) {
          throw new Error(
            "Le produit associé à cette page est introuvable."
          );
        }

        if (cancelled) return;

        setData(apiData);
        setPaymentCurrency(product.currency === "CDF" ? "CDF" : "USD");

        const fields = Array.isArray(product.fields) ? product.fields : [];
        const initialValues: Record<string, string | boolean> = {};

        fields.forEach((field) => {
          initialValues[field.name] =
            field.type === "BOOLEAN" ? false : field.value || "";
        });

        setFormValues(initialValues);
      } catch (err: unknown) {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger cette page."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const product = data?.products?.[0] ?? null;
  const productFields = Array.isArray(product?.fields) ? product.fields : [];
  const originalPrice = Number(product?.price ?? 0);
  const originalCurrency = product?.currency || "USD";

  const paymentAmount = useMemo(() => {
    if (!product) return 0;
    if (paymentCurrency === originalCurrency) return originalPrice;
    return paymentCurrency === "CDF"
      ? convertToCdf(originalPrice, originalCurrency)
      : convertToUsd(originalPrice, originalCurrency);
  }, [product, originalPrice, originalCurrency, paymentCurrency]);

  const originalPriceDisplay = product
    ? formatPrice(originalPrice, originalCurrency)
    : "";

  const paymentPriceDisplay = formatPrice(paymentAmount, paymentCurrency);

  function updateField(fieldName: string, value: string | boolean) {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  }

  function validateFields(): string | null {
    for (const field of productFields) {
      if (!field.required) continue;
      const value = formValues[field.name];
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      ) {
        return `Veuillez remplir le champ "${field.label}".`;
      }
    }
    return null;
  }

  function normalizePhone(value: string): string {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.startsWith("00")) cleaned = cleaned.substring(2);
    if (cleaned.startsWith("0")) cleaned = "243" + cleaned.substring(1);
    if (cleaned.length === 9) cleaned = "243" + cleaned;
    return cleaned;
  }

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!product) {
      setPaymentMessage("Produit introuvable.");
      return;
    }

    setPaymentMessage(null);
    setPaymentSuccess(false);
    setTransactionId(null);
    setPaymentStatus(null);

    const fieldsError = validateFields();
    if (fieldsError) {
      setPaymentMessage(fieldsError);
      return;
    }

    if (!telecom) {
      setPaymentMessage("Veuillez sélectionner un moyen de paiement.");
      return;
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.length !== 12 || !normalizedPhone.startsWith("243")) {
      setPaymentMessage(
        "Numéro Mobile Money invalide. Exemple : 243812345678."
      );
      return;
    }

    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      setPaymentMessage("Le montant du paiement est invalide.");
      return;
    }

    try {
      setPaying(true);

      const payload = {
        amount: Number(paymentAmount.toFixed(2)),
        currency: paymentCurrency,
        phone: normalizedPhone,
        telecom,
        customFields: formValues,
      };

      const response = await fetch(`${API_URL}/payment/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: PaymentApiResponse | null = null;
      try {
        result = (await response.json()) as PaymentApiResponse;
      } catch {
        result = null;
      }

      if (!response.ok || !result || result.success !== true) {
        throw new Error(
          result?.message ||
            result?.data?.message ||
            "Impossible d'initialiser le paiement."
        );
      }

      const newTransactionId =
        result.data?.transactionId || result.transactionId || null;
      const newStatus =
        result.data?.status || result.status || "pending";

      setTransactionId(newTransactionId);
      setPaymentStatus(newStatus);

      const apiMessage = result.data?.message || result.message || "";

      setPaymentSuccess(true);
      setPaymentMessage(
        newStatus.toLowerCase() === "pending" ||
          apiMessage.toLowerCase().includes("insert pin")
          ? apiMessage ||
              "Transaction envoyée. Veuillez confirmer le paiement sur votre téléphone (PIN)."
          : apiMessage || "Paiement initialisé avec succès."
      );
    } catch (err: unknown) {
      setPaymentSuccess(false);
      setPaymentMessage(
        err instanceof Error ? err.message : "Erreur pendant le paiement."
      );
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-[#08192D]" />
          <p className="mt-4 text-slate-500">Chargement de la page de paiement...</p>
        </div>
      </main>
    );
  }

  if (error || !data || !product) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <AlertCircle size={48} className="mx-auto text-red-500" />
          <h1 className="mt-5 text-2xl font-bold text-slate-900">Page indisponible</h1>
          <p className="mt-3 text-slate-500">
            {error || "Cette page de paiement est indisponible."}
          </p>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center rounded-xl bg-[#08192D] px-5 py-3 font-semibold text-white transition hover:bg-[#102b48]"
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Page de paiement
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#08192D] md:text-3xl">
            {data.paymentPage.title}
          </h1>
          {data.paymentPage.description && (
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              {data.paymentPage.description}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
          {/* SECTION PRODUIT */}
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100">
            {product.imageUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 flex items-center justify-center p-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-slate-100">
                <div className="text-center text-slate-400">
                  <CreditCard className="mx-auto mb-3" size={42} />
                  <p className="text-sm">Aucune image disponible</p>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {formatProductType(product.type)}
                </span>
                {product.status && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Disponible
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                {product.name}
              </h2>

              {product.subtitle && (
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {product.subtitle}
                </p>
              )}

              {product.description && (
                <div className="mt-4">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Prix du produit
                </p>
                <p className="text-2xl font-bold text-[#08192D]">
                  {originalPriceDisplay}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION FORMULAIRE DE PAIEMENT */}
          <section>
            <form
              onSubmit={handlePayment}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 md:p-7"
            >
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#08192D]">Paiement</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Remplissez les informations nécessaires pour effectuer votre paiement.
                </p>
              </div>

              {/* CHAMPS DYNAMIQUES */}
              {productFields.length > 0 && (
                <div className="mb-6 space-y-4 border-b border-slate-100 pb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Informations requises
                  </h3>

                  {productFields.map((field) => {
                    const fType = getFieldType(field.type);

                    if (fType === "BOOLEAN") {
                      return (
                        <div key={field.id} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`field-${field.id}`}
                            checked={Boolean(formValues[field.name])}
                            onChange={(e) => updateField(field.name, e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-[#08192D] focus:ring-[#08192D]"
                          />
                          <label
                            htmlFor={`field-${field.id}`}
                            className="text-xs font-medium text-slate-700"
                          >
                            {field.label}{" "}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                        </div>
                      );
                    }

                    if (fType === "TEXTAREA") {
                      return (
                        <div key={field.id}>
                          <label className="block text-xs font-medium text-slate-700">
                            {field.label}{" "}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <textarea
                            value={String(formValues[field.name] || "")}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            required={field.required}
                            rows={3}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-[#08192D] focus:outline-none focus:ring-1 focus:ring-[#08192D]"
                          />
                        </div>
                      );
                    }

                    if (fType === "SELECT" && field.options) {
                      return (
                        <div key={field.id}>
                          <label className="block text-xs font-medium text-slate-700">
                            {field.label}{" "}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <select
                            value={String(formValues[field.name] || "")}
                            onChange={(e) => updateField(field.name, e.target.value)}
                            required={field.required}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-[#08192D] focus:outline-none focus:ring-1 focus:ring-[#08192D]"
                          >
                            <option value="">Sélectionnez...</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }

                    return (
                      <div key={field.id}>
                        <label className="block text-xs font-medium text-slate-700">
                          {field.label}{" "}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type={
                            fType === "NUMBER"
                              ? "number"
                              : fType === "EMAIL"
                              ? "email"
                              : fType === "DATE"
                              ? "date"
                              : "text"
                          }
                          value={String(formValues[field.name] || "")}
                          onChange={(e) => updateField(field.name, e.target.value)}
                          required={field.required}
                          className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-[#08192D] focus:outline-none focus:ring-1 focus:ring-[#08192D]"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* DEVISE */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-700">
                  Devise de règlement
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentCurrency("USD")}
                    className={`rounded-xl border py-2.5 text-center text-xs font-semibold transition ${
                      paymentCurrency === "USD"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentCurrency("CDF")}
                    className={`rounded-xl border py-2.5 text-center text-xs font-semibold transition ${
                      paymentCurrency === "CDF"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    CDF (FC)
                  </button>
                </div>
              </div>

              {/* OPERATEURS */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-700">
                  Moyen de paiement Mobile Money *
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {[
                    { id: "MP", name: "M-Pesa" },
                    { id: "OM", name: "Orange Money" },
                    { id: "AM", name: "Airtel Money" },
                    { id: "AF", name: "AfriMoney" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTelecom(item.id as Telecom)}
                      className={`rounded-xl border py-2.5 px-3 text-left text-xs font-semibold transition ${
                        telecom === item.id
                          ? "border-[#08192D] bg-[#08192D] text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* NUMERO DE TELEPHONE */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-700">
                  Numéro Mobile Money *
                </label>
                <div className="relative mt-1">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="243812345678"
                    required
                    className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-[#08192D] focus:outline-none focus:ring-1 focus:ring-[#08192D]"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Format : 243XXXXXXXXX ou 08XXXXXXXX
                </p>
              </div>

              {/* RECAPITULATIF */}
              <div className="mb-5 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Montant à payer</span>
                  <span className="text-base font-bold text-[#08192D]">
                    {paymentPriceDisplay}
                  </span>
                </div>
              </div>

              {/* MESSAGES */}
              {paymentMessage && (
                <div
                  className={`mb-5 flex items-start gap-2.5 rounded-xl p-3.5 text-xs ${
                    paymentSuccess
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {paymentSuccess ? (
                    <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                  ) : (
                    <AlertCircle size={18} className="shrink-0 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium">{paymentMessage}</p>
                    {transactionId && (
                      <p className="mt-0.5 text-[11px] opacity-80">
                        ID Transaction : {transactionId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* BOUTON PAIEMENT */}
              <button
                type="submit"
                disabled={paying}
                className="flex w-full items-center justify-center rounded-xl bg-[#08192D] py-3 text-sm font-semibold text-white transition hover:bg-[#102b48] disabled:opacity-50"
              >
                {paying ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  `Payer ${paymentPriceDisplay}`
                )}
              </button>

              <div className="mt-3 flex items-center justify-center text-[11px] text-slate-400">
                <ShieldCheck size={14} className="mr-1 text-green-600" />
                Paiement sécurisé crypté SSL
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}