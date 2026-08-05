"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";


// =====================================================
// CONFIGURATION API
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


// =====================================================
// TYPES
// =====================================================

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

interface Instructor {
  id?: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface Company {
  id?: number;
  name?: string | null;
  logo?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface PaymentPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  active: boolean;
  createdAt?: string;
}

interface PublicPaymentResponse {
  success: boolean;

  paymentPage: PaymentPage;

  product: Product;

  instructor?: Instructor | null;

  company?: Company | null;

  message?: string;
}


// =====================================================
// PAYMENT
// =====================================================

type Telecom = "AM" | "OM" | "MP" | "AF";


// =====================================================
// OUTILS
// =====================================================

function formatPrice(
  price: number,
  currency: string
) {
  try {
    return (
      new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(price) +
      ` ${currency}`
    );
  } catch {
    return `${price} ${currency}`;
  }
}


function formatProductType(type: string) {
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


// =====================================================
// PAGE
// =====================================================

export default function PublicPaymentPage() {
  const params = useParams();

  // ===================================================
  // SLUG
  // ===================================================

  const rawSlug = params?.slug;

  const slug = useMemo(() => {
    if (Array.isArray(rawSlug)) {
      return rawSlug[0];
    }

    if (
      typeof rawSlug === "string" &&
      rawSlug.trim()
    ) {
      return rawSlug;
    }

    return undefined;
  }, [rawSlug]);


  // ===================================================
  // STATES
  // ===================================================

  const [data, setData] =
    useState<PublicPaymentResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [formValues, setFormValues] =
    useState<Record<string, string | boolean>>(
      {}
    );

  const [telecom, setTelecom] =
    useState<Telecom | "">("");

  const [phone, setPhone] =
    useState("");

  const [paying, setPaying] =
    useState(false);

  const [paymentMessage, setPaymentMessage] =
    useState<string | null>(null);

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);


  // ===================================================
  // RÉCUPÉRER LA PAGE PUBLIQUE
  // ===================================================

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError(
        "Le lien de paiement est invalide."
      );
      return;
    }

    let cancelled = false;

    async function loadPage() {
      try {
        setLoading(true);
        setError(null);

        const encodedSlug =
          encodeURIComponent(slug);

        console.log(
          "🔎 Chargement page publique :",
          slug
        );

        const response = await fetch(
          `${API_URL}/api/public/payment-pages/${encodedSlug}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        let responseData: unknown = null;

        try {
          responseData =
            await response.json();
        } catch {
          responseData = null;
        }

        console.log(
          "📦 PAGE PUBLIQUE :",
          responseData
        );

        if (!response.ok) {
          const message =
            typeof responseData === "object" &&
            responseData !== null &&
            "message" in responseData &&
            typeof (
              responseData as {
                message?: unknown;
              }
            ).message === "string"
              ? (
                  responseData as {
                    message: string;
                  }
                ).message
              : "Cette page de paiement n'est pas disponible.";

          throw new Error(message);
        }

        if (
          !responseData ||
          typeof responseData !== "object"
        ) {
          throw new Error(
            "Réponse invalide du serveur."
          );
        }

        const publicData =
          responseData as PublicPaymentResponse;

        if (!publicData.success) {
          throw new Error(
            publicData.message ||
              "Cette page de paiement n'est pas disponible."
          );
        }

        if (!publicData.product) {
          throw new Error(
            "Le produit associé à cette page est introuvable."
          );
        }

        if (cancelled) {
          return;
        }

        setData(publicData);

        // =================================================
        // INITIALISER LES CHAMPS
        // =================================================

        const fields =
          Array.isArray(
            publicData.product.fields
          )
            ? publicData.product.fields
            : [];

        const initialValues: Record<
          string,
          string | boolean
        > = {};

        fields.forEach((field) => {
          if (field.type === "BOOLEAN") {
            initialValues[field.name] =
              false;
          } else {
            initialValues[field.name] =
              field.value || "";
          }
        });

        setFormValues(initialValues);

      } catch (err: unknown) {
        if (cancelled) {
          return;
        }

        console.error(
          "❌ PUBLIC PAYMENT PAGE ERROR:",
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


  // ===================================================
  // PRODUIT
  // ===================================================

  const product =
    data?.product ?? null;


  // ===================================================
  // CHAMPS DU PRODUIT
  //
  // IMPORTANT :
  // Chaque produit possède SES propres champs.
  // ===================================================

  const productFields =
    Array.isArray(product?.fields)
      ? product.fields
      : [];


  const hasFields =
    productFields.length > 0;


  // ===================================================
  // FORMATEUR
  // ===================================================

  const instructor =
    data?.instructor ?? null;


  // ===================================================
  // ENTREPRISE / ÉCOLE
  // ===================================================

  const company =
    data?.company ?? null;


  // ===================================================
  // MODIFIER UN CHAMP
  // ===================================================

  function updateField(
    fieldName: string,
    value: string | boolean
  ) {
    setFormValues((previous) => ({
      ...previous,
      [fieldName]: value,
    }));
  }


  // ===================================================
  // VALIDATION
  // ===================================================

  function validateFields() {
    for (const field of productFields) {
      if (!field.required) {
        continue;
      }

      const value =
        formValues[field.name];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      ) {
        return (
          `Veuillez remplir le champ : ` +
          `"${field.label}".`
        );
      }
    }

    return null;
  }


  // ===================================================
  // NORMALISATION TÉLÉPHONE
  // ===================================================

  function normalizePhone(
    value: string
  ) {
    let cleaned =
      value.replace(/\D/g, "");

    if (
      cleaned.startsWith("00")
    ) {
      cleaned =
        cleaned.substring(2);
    }

    if (
      cleaned.startsWith("0")
    ) {
      cleaned =
        "243" +
        cleaned.substring(1);
    }

    if (
      cleaned.length === 9
    ) {
      cleaned =
        "243" + cleaned;
    }

    return cleaned;
  }


  // ===================================================
  // PAIEMENT
  // ===================================================

  async function handlePayment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!product) {
      setPaymentMessage(
        "Produit introuvable."
      );
      return;
    }

    setPaymentMessage(null);
    setPaymentSuccess(false);


    // =================================================
    // VALIDATION DES CHAMPS
    // =================================================

    const fieldsError =
      validateFields();

    if (fieldsError) {
      setPaymentMessage(
        fieldsError
      );
      return;
    }


    // =================================================
    // VALIDATION MOBILE MONEY
    // =================================================

    if (!telecom) {
      setPaymentMessage(
        "Veuillez sélectionner votre moyen de paiement."
      );
      return;
    }


    const normalizedPhone =
      normalizePhone(phone);

    if (
      normalizedPhone.length !== 12 ||
      !normalizedPhone.startsWith("243")
    ) {
      setPaymentMessage(
        "Veuillez entrer un numéro Mobile Money valide."
      );
      return;
    }


    try {
      setPaying(true);


      // =================================================
      // DONNÉES CLIENT
      // =================================================

      const customerData: Record<
        string,
        string | boolean
      > = {
        ...formValues,

        paymentPhone:
          normalizedPhone,

        telecom,
      };


      // =================================================
      // RÉCUPÉRER LES INFORMATIONS PRINCIPALES
      // =================================================

      const customerName =
        typeof formValues.name ===
          "string"
          ? formValues.name
          : typeof formValues.fullName ===
              "string"
            ? formValues.fullName
            : undefined;

      const customerEmail =
        typeof formValues.email ===
          "string"
          ? formValues.email
          : undefined;


      // =================================================
      // PAYLOAD
      //
      // Le backend pourra utiliser ces données
      // pour créer Customer + Payment + Enrollment.
      // =================================================

      const payload = {
        productId: product.id,

        paymentPageId:
          data?.paymentPage?.id ?? null,

        amount: product.price,

        currency:
          product.currency,

        phone:
          normalizedPhone,

        telecom,

        customer: {
          name:
            customerName || null,

          email:
            customerEmail || null,

          phone:
            normalizedPhone,
        },

        fields:
          customerData,
      };


      console.log(
        "💳 PAYMENT PAYLOAD:",
        payload
      );


      // =================================================
      // APPEL API
      // =================================================
      //
      // IMPORTANT :
      // Adapte cette URL si ton endpoint de paiement
      // porte un autre nom.
      // =================================================

      const response =
        await fetch(
          `${API_URL}/api/public/payments`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(payload),
          }
        );


      let result: unknown = null;

      try {
        result =
          await response.json();
      } catch {
        result = null;
      }


      console.log(
        "📦 PAYMENT RESPONSE:",
        result
      );


      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "message" in result &&
          typeof (
            result as {
              message?: unknown;
            }
          ).message === "string"
            ? (
                result as {
                  message: string;
                }
              ).message
            : "Impossible d'effectuer le paiement.";

        throw new Error(message);
      }


      // =================================================
      // SUCCÈS
      // =================================================

      setPaymentSuccess(true);

      setPaymentMessage(
        "Votre demande de paiement a été envoyée avec succès."
      );

    } catch (err: unknown) {
      console.error(
        "❌ PAYMENT ERROR:",
        err
      );

      setPaymentSuccess(false);

      setPaymentMessage(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors du paiement."
      );
    } finally {
      setPaying(false);
    }
  }


  // ===================================================
  // CHARGEMENT
  // ===================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">

          <div className="animate-pulse">

            <div className="h-10 w-64 rounded-lg bg-slate-200" />

            <div className="mt-4 h-5 w-96 max-w-full rounded bg-slate-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-2">

              <div className="h-[450px] rounded-3xl bg-white" />

              <div className="h-[450px] rounded-3xl bg-white" />

            </div>

          </div>

        </div>
      </main>
    );
  }


  // ===================================================
  // ERREUR
  // ===================================================

  if (error || !data || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">

            <AlertCircle size={32} />

          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#08192D]">
            Page indisponible
          </h1>

          <p className="mt-3 text-slate-500">
            {error ||
              "Cette page de paiement n'est pas disponible."}
          </p>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-5 py-3 font-semibold text-white hover:bg-[#102c4e]"
          >
            <ArrowLeft size={18} />
            Retour
          </button>

        </div>

      </main>
    );
  }


  // ===================================================
  // RENDU
  // ===================================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b bg-white">

        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              {company?.logo ? (
                <img
                  src={company.logo}
                  alt={
                    company.name ||
                    "Établissement"
                  }
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#08192D] text-lg font-bold text-white">
                  {(company?.name ||
                    instructor?.name ||
                    product.name ||
                    "P"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div>

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {company?.name ||
                    "Paiement sécurisé"}
                </p>

                <p className="font-bold text-[#08192D]">
                  {company?.name ||
                    instructor?.name ||
                    "Formation / Service"}
                </p>

              </div>

            </div>

            <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">

              <ShieldCheck
                size={18}
                className="text-green-600"
              />

              Paiement sécurisé

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          CONTENU
      ================================================= */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">

        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">


          {/* =================================================
              INFORMATIONS PRODUIT
          ================================================= */}

          <section>

            {/* IMAGE */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-[280px] w-full object-cover sm:h-[380px]"
                />
              ) : (
                <div className="flex h-[280px] items-center justify-center bg-gradient-to-br from-[#08192D] to-[#16385f] sm:h-[380px]">

                  <div className="text-center text-white">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-3xl font-bold backdrop-blur">

                      {product.name
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <p className="mt-4 text-lg font-semibold">
                      {product.name}
                    </p>

                  </div>

                </div>
              )}

            </div>


            {/* INFORMATIONS */}
            <div className="mt-6">

              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {formatProductType(
                  product.type
                )}
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#08192D] sm:text-4xl">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="mt-2 text-lg font-medium text-slate-500">
                  {product.subtitle}
                </p>
              )}

              {product.description && (
                <div className="mt-6 whitespace-pre-line leading-7 text-slate-600">
                  {product.description}
                </div>
              )}


              {/* FORMATEUR / ÉTABLISSEMENT */}

              {(instructor ||
                company) && (

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Présenté par
                  </p>

                  <div className="mt-4 flex items-center gap-4">

                    {company?.logo ? (
                      <img
                        src={
                          company.logo
                        }
                        alt={
                          company.name ||
                          "Établissement"
                        }
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-[#08192D]">
                        <User
                          size={25}
                        />
                      </div>
                    )}

                    <div>

                      <h2 className="font-bold text-[#08192D]">
                        {company?.name ||
                          instructor?.name ||
                          "Formateur"}
                      </h2>

                      {instructor?.name &&
                        company?.name && (
                          <p className="mt-1 text-sm text-slate-500">
                            Formateur :{" "}
                            {
                              instructor.name
                            }
                          </p>
                        )}

                      {company?.address && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">

                          <MapPin
                            size={14}
                          />

                          {
                            company.address
                          }

                        </p>
                      )}

                    </div>

                  </div>

                </div>

              )}

            </div>

          </section>


          {/* =================================================
              PAIEMENT
          ================================================= */}

          <section>

            <form
              onSubmit={
                handlePayment
              }
              className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
            >

              {/* PRIX */}

              <div className="border-b border-slate-100 pb-6">

                <p className="text-sm font-medium text-slate-500">
                  Montant à payer
                </p>

                <div className="mt-2 text-4xl font-bold text-[#08192D]">
                  {formatPrice(
                    product.price,
                    product.currency
                  )}
                </div>

              </div>


              {/* =================================================
                  FORMULAIRE DYNAMIQUE
              ================================================= */}

              {hasFields && (

                <div className="pt-6">

                  <div className="mb-6">

                    <h2 className="text-xl font-bold text-[#08192D]">
                      Informations d'inscription
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Veuillez renseigner les informations demandées.
                    </p>

                  </div>


                  <div className="space-y-5">

                    {productFields.map(
                      (field) => {

                        const fieldType =
                          getFieldType(
                            field.type
                          );

                        const value =
                          formValues[
                            field.name
                          ] ?? "";

                        const inputId =
                          `field-${field.id}`;


                        // =====================================
                        // BOOLEAN
                        // =====================================

                        if (
                          fieldType ===
                          "BOOLEAN"
                        ) {
                          return (
                            <label
                              key={
                                field.id
                              }
                              htmlFor={
                                inputId
                              }
                              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4"
                            >

                              <input
                                id={
                                  inputId
                                }
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
                                className="mt-1 h-4 w-4 rounded border-slate-300"
                              />

                              <span className="text-sm text-slate-700">

                                {field.label}

                                {field.required && (
                                  <span className="ml-1 text-red-500">
                                    *
                                  </span>
                                )}

                              </span>

                            </label>
                          );
                        }


                        // =====================================
                        // TEXTAREA
                        // =====================================

                        if (
                          fieldType ===
                          "TEXTAREA"
                        ) {
                          return (
                            <div
                              key={
                                field.id
                              }
                            >

                              <label
                                htmlFor={
                                  inputId
                                }
                                className="mb-2 block text-sm font-semibold text-[#08192D]"
                              >

                                {
                                  field.label
                                }

                                {field.required && (
                                  <span className="ml-1 text-red-500">
                                    *
                                  </span>
                                )}

                              </label>

                              <textarea
                                id={
                                  inputId
                                }
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
                                rows={
                                  4
                                }
                                required={
                                  field.required
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-[#08192D]/10"
                              />

                            </div>
                          );
                        }


                        // =====================================
                        // SELECT
                        // =====================================

                        if (
                          fieldType ===
                          "SELECT"
                        ) {
                          let options: string[] =
                            [];

                          if (
                            field.value
                          ) {
                            try {
                              const parsed =
                                JSON.parse(
                                  field.value
                                );

                              if (
                                Array.isArray(
                                  parsed
                                )
                              ) {
                                options =
                                  parsed.map(
                                    String
                                  );
                              }
                            } catch {
                              options =
                                field.value
                                  .split(
                                    ","
                                  )
                                  .map(
                                    (
                                      item
                                    ) =>
                                      item.trim()
                                  )
                                  .filter(
                                    Boolean
                                  );
                            }
                          }

                          return (
                            <div
                              key={
                                field.id
                              }
                            >

                              <label
                                htmlFor={
                                  inputId
                                }
                                className="mb-2 block text-sm font-semibold text-[#08192D]"
                              >

                                {
                                  field.label
                                }

                                {field.required && (
                                  <span className="ml-1 text-red-500">
                                    *
                                  </span>
                                )}

                              </label>

                              <select
                                id={
                                  inputId
                                }
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
                                required={
                                  field.required
                                }
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-[#08192D]/10"
                              >

                                <option value="">
                                  Sélectionner...
                                </option>

                                {options.map(
                                  (
                                    option
                                  ) => (
                                    <option
                                      key={
                                        option
                                      }
                                      value={
                                        option
                                      }
                                    >
                                      {
                                        option
                                      }
                                    </option>
                                  )
                                )}

                              </select>

                            </div>
                          );
                        }


                        // =====================================
                        // IMAGE / FILE
                        // =====================================

                        if (
                          fieldType ===
                            "IMAGE" ||
                          fieldType ===
                            "FILE"
                        ) {
                          return (
                            <div
                              key={
                                field.id
                              }
                            >

                              <label
                                htmlFor={
                                  inputId
                                }
                                className="mb-2 block text-sm font-semibold text-[#08192D]"
                              >

                                {
                                  field.label
                                }

                                {field.required && (
                                  <span className="ml-1 text-red-500">
                                    *
                                  </span>
                                )}

                              </label>

                              <input
                                id={
                                  inputId
                                }
                                type="file"
                                accept={
                                  fieldType ===
                                  "IMAGE"
                                    ? "image/*"
                                    : undefined
                                }
                                required={
                                  field.required
                                }
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                                onChange={(
                                  event
                                ) => {

                                  const file =
                                    event
                                      .target
                                      .files?.[0];

                                  updateField(
                                    field.name,
                                    file
                                      ? file.name
                                      : ""
                                  );

                                }}
                              />

                            </div>
                          );
                        }


                        // =====================================
                        // INPUT STANDARD
                        // =====================================

                        let inputType =
                          "text";

                        if (
                          fieldType ===
                          "NUMBER"
                        ) {
                          inputType =
                            "number";
                        }

                        if (
                          fieldType ===
                          "EMAIL"
                        ) {
                          inputType =
                            "email";
                        }

                        if (
                          fieldType ===
                          "PHONE"
                        ) {
                          inputType =
                            "tel";
                        }

                        if (
                          fieldType ===
                          "DATE"
                        ) {
                          inputType =
                            "date";
                        }


                        return (
                          <div
                            key={
                              field.id
                            }
                          >

                            <label
                              htmlFor={
                                inputId
                              }
                              className="mb-2 block text-sm font-semibold text-[#08192D]"
                            >

                              {
                                field.label
                              }

                              {field.required && (
                                <span className="ml-1 text-red-500">
                                  *
                                </span>
                              )}

                            </label>

                            <div className="relative">

                              {fieldType ===
                                "EMAIL" && (
                                <Mail
                                  size={
                                    18
                                  }
                                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                              )}

                              {fieldType ===
                                "PHONE" && (
                                <Phone
                                  size={
                                    18
                                  }
                                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                              )}

                              {fieldType !==
                                "EMAIL" &&
                                fieldType !==
                                  "PHONE" && (
                                  <User
                                    size={
                                      18
                                    }
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                  />
                                )}

                              <input
                                id={
                                  inputId
                                }
                                type={
                                  inputType
                                }
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
                                required={
                                  field.required
                                }
                                placeholder={
                                  field.label
                                }
                                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-[#08192D]/10"
                              />

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              )}


              {/* =================================================
                  SI AUCUN CHAMP
              ================================================= */}

              {!hasFields && (

                <div className="pt-6">

                  <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="flex items-start gap-3">

                      <CheckCircle2
                        size={22}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>

                        <p className="font-semibold text-[#08192D]">
                          Achat direct
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          Aucun renseignement supplémentaire n'est nécessaire pour ce produit.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              )}


              {/* =================================================
                  PAIEMENT
              ================================================= */}

              <div className="mt-8 border-t border-slate-100 pt-6">

                <h2 className="text-xl font-bold text-[#08192D]">
                  Paiement
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choisissez votre moyen de paiement.
                </p>


                {/* MOBILE MONEY */}

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setTelecom("AM")
                    }
                    className={`rounded-xl border p-4 text-sm font-bold transition ${
                      telecom === "AM"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-[#08192D] hover:border-slate-400"
                    }`}
                  >
                    Airtel Money
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setTelecom("OM")
                    }
                    className={`rounded-xl border p-4 text-sm font-bold transition ${
                      telecom === "OM"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-[#08192D] hover:border-slate-400"
                    }`}
                  >
                    Orange Money
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setTelecom("MP")
                    }
                    className={`rounded-xl border p-4 text-sm font-bold transition ${
                      telecom === "MP"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-[#08192D] hover:border-slate-400"
                    }`}
                  >
                    M-Pesa
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setTelecom("AF")
                    }
                    className={`rounded-xl border p-4 text-sm font-bold transition ${
                      telecom === "AF"
                        ? "border-[#08192D] bg-[#08192D] text-white"
                        : "border-slate-200 bg-white text-[#08192D] hover:border-slate-400"
                    }`}
                  >
                    Afrimoney
                  </button>

                </div>


                {/* NUMÉRO */}

                <div className="mt-5">

                  <label
                    htmlFor="payment-phone"
                    className="mb-2 block text-sm font-semibold text-[#08192D]"
                  >
                    Numéro Mobile Money
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="payment-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(
                          event.target.value
                        )
                      }
                      placeholder="243xxxxxxxxx"
                      required
                      className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#08192D] focus:ring-2 focus:ring-[#08192D]/10"
                    />

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Exemple : 243XXXXXXXXX
                  </p>

                </div>


                {/* MESSAGE */}

                {paymentMessage && (

                  <div
                    className={`mt-5 flex items-start gap-3 rounded-xl p-4 text-sm ${
                      paymentSuccess
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >

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

                    <p>
                      {
                        paymentMessage
                      }
                    </p>

                  </div>
                )}


                {/* BOUTON */}

                <button
                  type="submit"
                  disabled={paying}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#08192D] px-6 py-4 text-base font-bold text-white transition hover:bg-[#102c4e] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {paying ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Traitement du paiement...

                    </>
                  ) : (
                    <>
                      <CreditCard
                        size={20}
                      />

                      Payer maintenant

                    </>
                  )}

                </button>


                {/* SÉCURITÉ */}

                <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400">

                  <ShieldCheck
                    size={15}
                  />

                  Vos informations sont protégées.

                </div>

              </div>

            </form>

          </section>

        </div>

      </div>

    </main>
  );
}