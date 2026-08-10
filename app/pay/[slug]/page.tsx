
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
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   CONFIGURATION API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://paylink.coderise-solution.com/api";

/*
IMPORTANT

NEXT_PUBLIC_API_URL doit être :

https://paylink.coderise-solution.com/api

Les endpoints utilisés sont :

GET
https://paylink.coderise-solution.com/api/public/payment-pages/:slug

POST
https://paylink.coderise-solution.com/api/payment/initiate
*/

/* =========================================================
   TAUX USD / CDF
========================================================= */

const USD_TO_CDF_RATE = 2230;

/* =========================================================
   TYPES
========================================================= */

type PaymentCurrency = "USD" | "CDF";

type Telecom =
  | "AM"
  | "OM"
  | "MP"
  | "AF";

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

/* =========================================================
   PRODUCT FIELD
========================================================= */

interface ProductField {
  id: number;

  name: string;

  label: string;

  type: ProductFieldType | string;

  value?: string | null;

  required: boolean;
}

/* =========================================================
   PRODUCT
========================================================= */

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

/* =========================================================
   PAYMENT PAGE
========================================================= */

interface PaymentPage {
  id: number;

  title: string;

  slug: string;

  description?: string | null;

  active: boolean;

  createdAt?: string;
}

/* =========================================================
   PUBLIC PAYMENT API RESPONSE
========================================================= */

interface PublicPaymentApiResponse {
  success: boolean;

  paymentPage: PaymentPage;

  totalProducts: number;

  products: Product[];

  message?: string;
}

/* =========================================================
   PAYMENT API RESPONSE
========================================================= */

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
   FORMAT PRICE
========================================================= */

function formatPrice(
  price: number,
  currency: string
): string {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 2,
    }).format(price) +
    ` ${currency}`
  );
}

/* =========================================================
   CONVERT TO USD
========================================================= */

function convertToUsd(
  amount: number,
  currency: string
): number {
  if (currency === "USD") {
    return amount;
  }

  if (currency === "CDF") {
    return (
      amount / USD_TO_CDF_RATE
    );
  }

  return amount;
}

/* =========================================================
   CONVERT TO CDF
========================================================= */

function convertToCdf(
  amount: number,
  currency: string
): number {
  if (currency === "CDF") {
    return amount;
  }

  if (currency === "USD") {
    return (
      amount * USD_TO_CDF_RATE
    );
  }

  return amount;
}

/* =========================================================
   PRODUCT TYPE
========================================================= */

function formatProductType(
  type: string
): string {
  const types: Record<
    string,
    string
  > = {
    PHYSICAL: "Produit physique",
    DIGITAL: "Produit numérique",
    COURSE: "Formation",
    SERVICE: "Service",
    SCHOOL: "École",
    SUBSCRIPTION: "Abonnement",
  };

  return types[type] || type;
}

/* =========================================================
   FIELD TYPE
========================================================= */

function getFieldType(
  type: string
): ProductFieldType {
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

  if (
    supported.includes(
      type as ProductFieldType
    )
  ) {
    return type as ProductFieldType;
  }

  return "TEXT";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function PublicPaymentPage() {
  const params = useParams();

  /* =======================================================
     RAW SLUG
  ======================================================= */

  const rawSlug = params?.slug;

  /*
    IMPORTANT :

    On transforme immédiatement le paramètre
    en string | undefined.

    Cela évite de transmettre directement
    string | undefined à encodeURIComponent().
  */

  const slug: string | undefined =
    Array.isArray(rawSlug)
      ? rawSlug[0]
      : typeof rawSlug === "string"
        ? rawSlug
        : undefined;

  /* =======================================================
     STATES
  ======================================================= */

  const [data, setData] =
    useState<PublicPaymentApiResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [formValues, setFormValues] =
    useState<
      Record<
        string,
        string | boolean
      >
    >({});

  const [telecom, setTelecom] =
    useState<Telecom | "">("");

  const [phone, setPhone] =
    useState("");

  const [paying, setPaying] =
    useState(false);

  const [
    paymentMessage,
    setPaymentMessage,
  ] = useState<string | null>(null);

  const [
    paymentSuccess,
    setPaymentSuccess,
  ] = useState(false);

  const [
    transactionId,
    setTransactionId,
  ] = useState<string | null>(null);

  const [
    paymentStatus,
    setPaymentStatus,
  ] = useState<string | null>(null);

  const [
    paymentCurrency,
    setPaymentCurrency,
  ] = useState<PaymentCurrency>("USD");

  /* =======================================================
     CHARGEMENT PAGE PUBLIQUE
  ======================================================= */

  useEffect(() => {
    /*
      IMPORTANT :

      On vérifie slug AVANT de créer
      la fonction asynchrone.

      Puis on crée une nouvelle constante
      explicitement typée string.

      Cela supprime définitivement :

      Argument of type
      'string | undefined'
      is not assignable to parameter
      of type 'string | number | boolean'
    */

    if (
      typeof slug !== "string" ||
      !slug.trim()
    ) {
      setLoading(false);

      setError(
        "Le lien de paiement est invalide."
      );

      return;
    }

    /*
      Ici currentSlug est garanti comme string.
    */

    const currentSlug: string =
      slug;

    let cancelled = false;

    async function loadPage() {
      try {
        setLoading(true);

        setError(null);

        /* =================================================
           ENCODER SLUG
        ================================================= */

        const encodedSlug =
          encodeURIComponent(
            currentSlug
          );

        /* =================================================
           URL
        ================================================= */

        const url =
          `${API_URL}/public/payment-pages/${encodedSlug}`;

        console.log(
          "========================================"
        );

        console.log(
          "🔎 API URL :",
          API_URL
        );

        console.log(
          "🔎 SLUG :",
          currentSlug
        );

        console.log(
          "🔎 PAGE URL :",
          url
        );

        console.log(
          "========================================"
        );

        /* =================================================
           REQUEST
        ================================================= */

        const response =
          await fetch(url, {
            method: "GET",

            cache: "no-store",

            headers: {
              Accept:
                "application/json",
            },
          });

        /* =================================================
           RESPONSE JSON
        ================================================= */

        let responseData: unknown =
          null;

        try {
          responseData =
            await response.json();
        } catch {
          responseData = null;
        }

        console.log(
          "📦 PAGE RESPONSE :",
          responseData
        );

        /* =================================================
           HTTP ERROR
        ================================================= */

        if (!response.ok) {
          let message =
            "Cette page de paiement est indisponible.";

          if (
            typeof responseData ===
              "object" &&
            responseData !== null &&
            "message" in responseData
          ) {
            const serverMessage =
              (
                responseData as {
                  message?: unknown;
                }
              ).message;

            if (
              typeof serverMessage ===
                "string" &&
              serverMessage.trim()
            ) {
              message =
                serverMessage;
            }
          }

          throw new Error(
            message
          );
        }

        /* =================================================
           VALIDATION RESPONSE
        ================================================= */

        if (
          !responseData ||
          typeof responseData !==
            "object"
        ) {
          throw new Error(
            "Réponse serveur invalide."
          );
        }

        const apiData =
          responseData as PublicPaymentApiResponse;

        /* =================================================
           API SUCCESS
        ================================================= */

        if (
          apiData.success !== true
        ) {
          throw new Error(
            apiData.message ||
              "Cette page de paiement est indisponible."
          );
        }

        /* =================================================
           PAYMENT PAGE
        ================================================= */

        if (
          !apiData.paymentPage
        ) {
          throw new Error(
            "Page de paiement introuvable."
          );
        }

        /* =================================================
           PRODUCT
        ================================================= */

        const product =
          Array.isArray(
            apiData.products
          )
            ? apiData.products[0]
            : null;

        if (!product) {
          throw new Error(
            "Le produit associé à cette page est introuvable."
          );
        }

        /* =================================================
           CANCELLED
        ================================================= */

        if (cancelled) {
          return;
        }

        /* =================================================
           SAVE DATA
        ================================================= */

        setData(apiData);

        /* =================================================
           INITIAL PAYMENT CURRENCY
        ================================================= */

        if (
          product.currency ===
          "CDF"
        ) {
          setPaymentCurrency(
            "CDF"
          );
        } else {
          setPaymentCurrency(
            "USD"
          );
        }

        /* =================================================
           INITIAL FORM VALUES
        ================================================= */

        const fields =
          Array.isArray(
            product.fields
          )
            ? product.fields
            : [];

        const initialValues: Record<
          string,
          string | boolean
        > = {};

        fields.forEach(
          (field) => {
            if (
              field.type ===
              "BOOLEAN"
            ) {
              initialValues[
                field.name
              ] = false;
            } else {
              initialValues[
                field.name
              ] =
                field.value || "";
            }
          }
        );

        setFormValues(
          initialValues
        );
      } catch (
        err: unknown
      ) {
        if (cancelled) {
          return;
        }

        console.error(
          "❌ PUBLIC PAYMENT PAGE ERROR :",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger cette page."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* =======================================================
     PRODUCT
  ======================================================= */

  const product =
    data?.products?.[0] ?? null;

  /* =======================================================
     PRODUCT FIELDS
  ======================================================= */

  const productFields =
    Array.isArray(
      product?.fields
    )
      ? product.fields
      : [];

  const hasFields =
    productFields.length > 0;

  /* =======================================================
     ORIGINAL PRICE
  ======================================================= */

  const originalPrice =
    Number(
      product?.price ?? 0
    );

  const originalCurrency =
    product?.currency || "USD";

  /* =======================================================
     PAYMENT AMOUNT
  ======================================================= */

  const paymentAmount =
    useMemo(() => {
      if (!product) {
        return 0;
      }

      if (
        paymentCurrency ===
        originalCurrency
      ) {
        return originalPrice;
      }

      if (
        paymentCurrency ===
        "CDF"
      ) {
        return convertToCdf(
          originalPrice,
          originalCurrency
        );
      }

      return convertToUsd(
        originalPrice,
        originalCurrency
      );
    }, [
      product,
      originalPrice,
      originalCurrency,
      paymentCurrency,
    ]);

  /* =======================================================
     PRICE DISPLAY
  ======================================================= */

  const originalPriceDisplay =
    product
      ? formatPrice(
          originalPrice,
          originalCurrency
        )
      : "";

  const paymentPriceDisplay =
    formatPrice(
      paymentAmount,
      paymentCurrency
    );

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  function updateField(
    fieldName: string,
    value: string | boolean
  ) {
    setFormValues(
      (previous) => ({
        ...previous,
        [fieldName]:
          value,
      })
    );
  }

  /* =======================================================
     VALIDATE FIELDS
  ======================================================= */

  function validateFields():
    string | null {
    for (
      const field of productFields
    ) {
      if (!field.required) {
        continue;
      }

      const value =
        formValues[
          field.name
        ];

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

  /* =======================================================
     NORMALIZE PHONE
  ======================================================= */

  function normalizePhone(
    value: string
  ): string {
    let cleaned =
      value.replace(
        /\D/g,
        ""
      );

    /*
      00XXXXXXXXX
      -> XXXXXXXXX
    */

    if (
      cleaned.startsWith(
        "00"
      )
    ) {
      cleaned =
        cleaned.substring(2);
    }

    /*
      0812345678
      -> 243812345678
    */

    if (
      cleaned.startsWith(
        "0"
      )
    ) {
      cleaned =
        "243" +
        cleaned.substring(1);
    }

    /*
      812345678
      -> 243812345678
    */

    if (
      cleaned.length === 9
    ) {
      cleaned =
        "243" +
        cleaned;
    }

    return cleaned;
  }

  /* =======================================================
     PAYMENT
  ======================================================= */

  async function handlePayment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    /* =====================================================
       PRODUCT
    ===================================================== */

    if (!product) {
      setPaymentMessage(
        "Produit introuvable."
      );

      return;
    }

    /* =====================================================
       RESET
    ===================================================== */

    setPaymentMessage(
      null
    );

    setPaymentSuccess(
      false
    );

    setTransactionId(
      null
    );

    setPaymentStatus(
      null
    );

    /* =====================================================
       VALIDATE FIELDS
    ===================================================== */

    const fieldsError =
      validateFields();

    if (fieldsError) {
      setPaymentMessage(
        fieldsError
      );

      return;
    }

    /* =====================================================
       VALIDATE TELECOM
    ===================================================== */

    if (!telecom) {
      setPaymentMessage(
        "Veuillez sélectionner un moyen de paiement."
      );

      return;
    }

    /* =====================================================
       VALIDATE PHONE
    ===================================================== */

    const normalizedPhone =
      normalizePhone(phone);

    if (
      normalizedPhone.length !==
        12 ||
      !normalizedPhone.startsWith(
        "243"
      )
    ) {
      setPaymentMessage(
        "Numéro Mobile Money invalide. Exemple : 243812345678."
      );

      return;
    }

    /* =====================================================
       VALIDATE AMOUNT
    ===================================================== */

    if (
      !Number.isFinite(
        paymentAmount
      ) ||
      paymentAmount <= 0
    ) {
      setPaymentMessage(
        "Le montant du paiement est invalide."
      );

      return;
    }

    try {
      setPaying(true);

      setPaymentMessage(
        null
      );

      setPaymentSuccess(
        false
      );

      /* ===================================================
         PAYMENT PAYLOAD
      =================================================== */

      const payload = {
        amount:
          Number(
            paymentAmount.toFixed(
              2
            )
          ),

        currency:
          paymentCurrency,

        phone:
          normalizedPhone,

        telecom,
      };

      console.log(
        "========================================"
      );

      console.log(
        "💳 INITIALISATION PAIEMENT"
      );

      console.log(
        "API :",
        API_URL
      );

      console.log(
        "ENDPOINT :",
        `${API_URL}/payment/initiate`
      );

      console.log(
        "PAYLOAD :",
        payload
      );

      console.log(
        "========================================"
      );

      /* ===================================================
         CALL PAYMENT API
      =================================================== */

      const response =
        await fetch(
          `${API_URL}/payment/initiate`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      /* ===================================================
         READ RESPONSE
      =================================================== */

      let result:
        PaymentApiResponse | null =
        null;

      try {
        result =
          (await response.json()) as PaymentApiResponse;
      } catch {
        result = null;
      }

      console.log(
        "📦 PAYMENT RESPONSE :",
        result
      );

      /* ===================================================
         HTTP ERROR
      =================================================== */

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.data?.message ||
            "Impossible d'initialiser le paiement."
        );
      }

      /* ===================================================
         API ERROR
      =================================================== */

      if (
        !result ||
        result.success !== true
      ) {
        throw new Error(
          result?.message ||
            result?.data?.message ||
            "Le paiement n'a pas pu être initialisé."
        );
      }

      /* ===================================================
         TRANSACTION ID
      =================================================== */

      const newTransactionId =
        result.data
          ?.transactionId ||
        result.transactionId ||
        null;

      /* ===================================================
         STATUS
      =================================================== */

      const newStatus =
        result.data
          ?.status ||
        result.status ||
        "pending";

      setTransactionId(
        newTransactionId
      );

      setPaymentStatus(
        newStatus
      );

      /* ===================================================
         MESSAGE
      =================================================== */

      const apiMessage =
        result.data
          ?.message ||
        result.message ||
        "";

      /* ===================================================
         PENDING
      =================================================== */

      if (
        newStatus.toLowerCase() ===
          "pending" ||
        apiMessage
          .toLowerCase()
          .includes(
            "insert pin"
          )
      ) {
        setPaymentSuccess(
          true
        );

        setPaymentMessage(
          apiMessage ||
            "Transaction envoyée. Veuillez confirmer le paiement sur votre téléphone."
        );

        return;
      }

      /* ===================================================
         SUCCESS
      =================================================== */

      setPaymentSuccess(
        true
      );

      setPaymentMessage(
        apiMessage ||
          "Paiement initialisé avec succès."
      );
    } catch (
      error: unknown
    ) {
      console.error(
        "❌ PAYMENT ERROR :",
        error
      );

      setPaymentSuccess(
        false
      );

      setPaymentMessage(
        error instanceof Error
          ? error.message
          : "Erreur pendant le paiement."
      );
    } finally {
      setPaying(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <div className="text-center">
            <Loader2
              size={42}
              className="mx-auto animate-spin text-[#08192D]"
            />

            <p className="mt-4 text-slate-500">
              Chargement de la page de paiement...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !data ||
    !product
  ) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto flex max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm">
            <AlertCircle
              size={48}
              className="mx-auto text-red-500"
            />

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Page indisponible
            </h1>

            <p className="mt-3 text-slate-500">
              {error ||
                "Cette page de paiement est indisponible."}
            </p>

            <button
              type="button"
              onClick={() =>
                window.history.back()
              }
              className="mt-6 inline-flex items-center rounded-xl bg-[#08192D] px-5 py-3 font-semibold text-white transition hover:bg-[#102b48]"
            >
              <ArrowLeft
                size={18}
                className="mr-2"
              />

              Retour
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Page de paiement
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#08192D] md:text-4xl">
            {data.paymentPage.title}
          </h1>

          {data.paymentPage.description && (
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              {
                data.paymentPage.description
              }
            </p>
          )}
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* =================================================
              PRODUCT
          ================================================= */}

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">

            {/* =================================================
                IMAGE
            ================================================= */}

            {product.imageUrl ? (
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={
                    product.imageUrl
                  }
                  alt={
                    product.name
                  }
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-slate-100">
                <div className="text-center text-slate-400">
                  <CreditCard
                    className="mx-auto mb-3"
                    size={42}
                  />

                  <p className="text-sm">
                    Aucune image disponible
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                PRODUCT INFO
            ================================================= */}

            <div className="p-6 md:p-8">

              <div className="mb-4 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {formatProductType(
                    product.type
                  )}
                </span>

                {product.status && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Disponible
                  </span>
                )}

              </div>

              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                {
                  product.name
                }
              </h2>

              {product.subtitle && (
                <p className="mt-2 text-base font-medium text-slate-500">
                  {
                    product.subtitle
                  }
                </p>
              )}

              {product.description && (
                <div className="mt-5">
                  <p className="whitespace-pre-line leading-7 text-slate-600">
                    {
                      product.description
                    }
                  </p>
                </div>
              )}

              {/* =================================================
                  ORIGINAL PRICE
              ================================================= */}

              <div className="mt-7 rounded-2xl bg-slate-50 p-5">

                <p className="text-sm font-medium text-slate-500">
                  Prix du produit
                </p>

                <p className="mt-1 text-3xl font-bold text-[#08192D]">
                  {
                    originalPriceDisplay
                  }
                </p>

              </div>

            </div>
          </section>

          {/* =================================================
              PAYMENT
          ================================================= */}

          <section>

            <form
              onSubmit={
                handlePayment
              }
              className="rounded-3xl bg-white p-6 shadow-sm md:p-7"
            >

              {/* =================================================
                  PAYMENT HEADER
              ================================================= */}

              <div className="mb-7">

                <h2 className="text-xl font-bold text-[#08192D]">
                  Paiement
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Remplissez les informations nécessaires pour effectuer votre paiement.
                </p>

              </div>

              {/* =================================================
                  PRODUCT FIELDS
              ================================================= */}

              {hasFields && (
                <div className="mb-7 space-y-5">

                  {productFields.map(
                    (field) => {
                      const fieldType =
                        getFieldType(
                          field.type
                        );

                      const value =
                        formValues[
                          field.name
                        ];

                      return (
                        <div
                          key={
                            field.id
                          }
                        >

                          <label className="mb-2 block text-sm font-semibold text-slate-700">

                            {
                              field.label
                            }

                            {field.required && (
                              <span className="ml-1 text-red-500">
                                *
                              </span>
                            )}

                          </label>

                          {/* =================================================
                              TEXT
                          ================================================= */}

                          {fieldType ===
                            "TEXT" && (
                            <input
                              type="text"
                              value={
                                typeof value ===
                                "string"
                                  ? value
                                  : ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  field.name,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                            />
                          )}

                          {/* =================================================
                              EMAIL
                          ================================================= */}

                          {fieldType ===
                            "EMAIL" && (
                            <div className="relative">

                              <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                type="email"
                                value={
                                  typeof value ===
                                  "string"
                                    ? value
                                    : ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateField(
                                    field.name,
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                              />

                            </div>
                          )}

                          {/* =================================================
                              PHONE FIELD
                          ================================================= */}

                          {fieldType ===
                            "PHONE" && (
                            <div className="relative">

                              <Phone
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                type="tel"
                                value={
                                  typeof value ===
                                  "string"
                                    ? value
                                    : ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateField(
                                    field.name,
                                    event
                                      .target
                                      .value
                                  )
                                }
                                placeholder="243812345678"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                              />

                            </div>
                          )}

                          {/* =================================================
                              NUMBER
                          ================================================= */}

                          {fieldType ===
                            "NUMBER" && (
                            <input
                              type="number"
                              value={
                                typeof value ===
                                "string"
                                  ? value
                                  : ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  field.name,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                            />
                          )}

                          {/* =================================================
                              DATE
                          ================================================= */}

                          {fieldType ===
                            "DATE" && (
                            <input
                              type="date"
                              value={
                                typeof value ===
                                "string"
                                  ? value
                                  : ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  field.name,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                            />
                          )}

                          {/* =================================================
                              TEXTAREA
                          ================================================= */}

                          {fieldType ===
                            "TEXTAREA" && (
                            <textarea
                              value={
                                typeof value ===
                                "string"
                                  ? value
                                  : ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  field.name,
                                  event
                                    .target
                                    .value
                                )
                              }
                              rows={4}
                              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                            />
                          )}

                          {/* =================================================
                              SELECT
                          ================================================= */}

                          {fieldType ===
                            "SELECT" && (
                            <select
                              value={
                                typeof value ===
                                "string"
                                  ? value
                                  : ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  field.name,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                            >

                              <option value="">
                                Sélectionner
                              </option>

                              <option value="option1">
                                Option 1
                              </option>

                              <option value="option2">
                                Option 2
                              </option>

                            </select>
                          )}

                          {/* =================================================
                              BOOLEAN
                          ================================================= */}

                          {fieldType ===
                            "BOOLEAN" && (
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">

                              <input
                                type="checkbox"
                                checked={
                                  value ===
                                  true
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateField(
                                    field.name,
                                    event
                                      .target
                                      .checked
                                  )
                                }
                                className="h-5 w-5"
                              />

                              <span className="text-sm text-slate-600">
                                {
                                  field.label
                                }
                              </span>

                            </label>
                          )}

                          {/* =================================================
                              FILE / IMAGE
                          ================================================= */}

                          {(
                            fieldType ===
                              "FILE" ||
                            fieldType ===
                              "IMAGE"
                          ) && (
                            <input
                              type="file"
                              accept={
                                fieldType ===
                                "IMAGE"
                                  ? "image/*"
                                  : undefined
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                            />
                          )}

                        </div>
                      );
                    }
                  )}

                </div>
              )}

              {/* =================================================
                  CURRENCY
              ================================================= */}

              <div className="mb-7">

                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Devise de paiement
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* USD */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentCurrency(
                        "USD"
                      )
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      paymentCurrency ===
                      "USD"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >

                    <span className="block text-sm font-bold">
                      🇺🇸 USD
                    </span>

                    <span
                      className={`mt-1 block text-xs ${
                        paymentCurrency ===
                        "USD"
                          ? "text-white/70"
                          : "text-slate-400"
                      }`}
                    >
                      Dollar américain
                    </span>

                  </button>

                  {/* CDF */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentCurrency(
                        "CDF"
                      )
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      paymentCurrency ===
                      "CDF"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >

                    <span className="block text-sm font-bold">
                      🇨🇩 CDF
                    </span>

                    <span
                      className={`mt-1 block text-xs ${
                        paymentCurrency ===
                        "CDF"
                          ? "text-white/70"
                          : "text-slate-400"
                      }`}
                    >
                      Franc congolais
                    </span>

                  </button>

                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Taux appliqué : 1 USD ={" "}
                  {USD_TO_CDF_RATE.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  CDF
                </p>

              </div>

              {/* =================================================
                  TELECOM
              ================================================= */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Moyen de paiement
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {[
                    [
                      "AM",
                      "Airtel Money",
                    ],
                    [
                      "OM",
                      "Orange Money",
                    ],
                    [
                      "MP",
                      "M-Pesa",
                    ],
                    [
                      "AF",
                      "Afrimoney",
                    ],
                  ].map(
                    ([code, label]) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() =>
                          setTelecom(
                            code as Telecom
                          )
                        }
                        className={`rounded-xl border p-4 text-left font-bold transition ${
                          telecom ===
                          code
                            ? "border-[#08192D] bg-[#08192D] text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                        }`}
                      >

                        <span className="block text-sm">
                          {label}
                        </span>

                        <span
                          className={`mt-1 block text-xs ${
                            telecom ===
                            code
                              ? "text-white/70"
                              : "text-slate-400"
                          }`}
                        >
                          {code}
                        </span>

                      </button>
                    )
                  )}

                </div>
              </div>

              {/* =================================================
                  PHONE
              ================================================= */}

              <div className="mt-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Numéro Mobile Money
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(
                      event
                    ) =>
                      setPhone(
                        event.target.value
                      )
                    }
                    placeholder="243812345678"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-slate-200"
                  />

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Exemple : 243812345678
                </p>

              </div>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div className="mt-7 rounded-2xl bg-slate-50 p-4">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm text-slate-500">
                    Total à payer
                  </span>

                  <span className="text-xl font-bold text-[#08192D]">
                    {
                      paymentPriceDisplay
                    }
                  </span>

                </div>

                {paymentCurrency !==
                  originalCurrency && (
                  <p className="mt-2 text-right text-xs text-slate-400">
                    Prix de référence :{" "}
                    {
                      originalPriceDisplay
                    }
                  </p>
                )}

              </div>

              {/* =================================================
                  PAYMENT MESSAGE
              ================================================= */}

              {paymentMessage && (
                <div
                  className={`mt-5 rounded-xl p-4 ${
                    paymentSuccess
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  <div className="flex items-start gap-3">

                    {paymentSuccess ? (
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                    )}

                    <div>

                      <p className="text-sm font-medium">
                        {
                          paymentMessage
                        }
                      </p>

                      {transactionId && (
                        <p className="mt-2 text-xs font-semibold">
                          Transaction :{" "}
                          {
                            transactionId
                          }
                        </p>
                      )}

                      {paymentStatus && (
                        <p className="mt-1 text-xs">
                          Statut :{" "}
                          {
                            paymentStatus
                          }
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  PAYMENT BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={paying}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#08192D] px-6 py-4 font-bold text-white transition hover:bg-[#102b48] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {paying ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    Traitement...
                  </>
                ) : (
                  <>
                    <CreditCard
                      size={20}
                    />

                    Payer{" "}
                    {
                      paymentPriceDisplay
                    }
                  </>
                )}

              </button>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">

                <ShieldCheck
                  size={16}
                />

                Paiement sécurisé

              </div>

            </form>
          </section>

        </div>
      </div>
    </main>
  );
}
