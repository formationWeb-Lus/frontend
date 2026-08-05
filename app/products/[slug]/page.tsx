"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

/* =====================================================
   TYPES
===================================================== */

interface ProductField {
  id: number;
  name: string;
  label: string;
  type: string;
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

  status: string;

  createdAt?: string;

  fields?: ProductField[];
}

interface Instructor {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface Company {
  id: number;
  name: string;
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

interface PublicPageResponse {
  success: boolean;

  paymentPage: PaymentPage;

  product: Product;

  instructor?: Instructor | null;

  company?: Company | null;

  message?: string;
}

/* =====================================================
   CONFIGURATION API
===================================================== */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   TYPE FIELD
===================================================== */

function normalizeFieldType(type: string) {
  return String(type || "").toUpperCase();
}

/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(
  price: number,
  currency: string
) {
  try {
    return (
      new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(Number(price || 0)) +
      ` ${currency}`
    );
  } catch {
    return `${price} ${currency}`;
  }
}

/* =====================================================
   PAGE PUBLIQUE
===================================================== */

export default function PublicProductPage() {
  /* ===================================================
     PARAMÈTRE SLUG
  =================================================== */

  const params = useParams();

  const rawSlug = params?.slug;

  /*
   * IMPORTANT :
   * Next.js peut retourner string | string[] | undefined.
   */

  const slug = useMemo(() => {
    if (typeof rawSlug === "string") {
      return rawSlug;
    }

    if (Array.isArray(rawSlug)) {
      return rawSlug[0];
    }

    return undefined;
  }, [rawSlug]);

  /* ===================================================
     STATES
  =================================================== */

  const [data, setData] =
    useState<PublicPageResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [formData, setFormData] =
    useState<Record<string, string>>({});

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [paymentMessage, setPaymentMessage] =
    useState<string | null>(null);

  /* ===================================================
     RÉCUPÉRER LA PAGE PUBLIQUE
  =================================================== */

  useEffect(() => {
    /*
     * On ne fait rien tant que slug n'est pas disponible.
     */

    if (!slug) {
      return;
    }

    const fetchPublicPage = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          "📄 Chargement page publique :",
          slug
        );

        const response = await fetch(
          `${API_URL}/api/public/payment-pages/${encodeURIComponent(
            slug
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result =
          await response.json();

        console.log(
          "📦 PAGE PUBLIQUE :",
          result
        );

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Impossible de charger cette page."
          );
        }

        if (!result?.success) {
          throw new Error(
            result?.message ||
              "Cette page n'est pas disponible."
          );
        }

        /*
         * Sécurisation des données.
         */

        const safeProduct = {
          ...(result.product || {}),
          fields:
            Array.isArray(
              result.product?.fields
            )
              ? result.product.fields
              : [],
        };

        const safeResult = {
          ...result,
          product: safeProduct,
          instructor:
            result.instructor || null,
          company:
            result.company || null,
        };

        setData(safeResult);

        /*
         * Initialiser les champs du formulaire.
         */

        const initialValues: Record<
          string,
          string
        > = {};

        safeProduct.fields.forEach(
          (field: ProductField) => {
            initialValues[field.name] =
              field.value || "";
          }
        );

        setFormData(initialValues);
      } catch (err: any) {
        console.error(
          "❌ PAGE PUBLIQUE ERROR:",
          err
        );

        setError(
          err?.message ||
            "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPage();
  }, [slug]);

  /* ===================================================
     CHANGEMENT CHAMP
  =================================================== */

  function handleFieldChange(
    fieldName: string,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));
  }

  /* ===================================================
     PRODUIT
  =================================================== */

  const product = data?.product;

  const fields =
    product?.fields || [];

  const instructor =
    data?.instructor || null;

  const company =
    data?.company || null;

  /* ===================================================
     VALIDATION
  =================================================== */

  function validateForm() {
    for (const field of fields) {
      if (!field.required) {
        continue;
      }

      const value =
        formData[field.name];

      if (!value || !value.trim()) {
        alert(
          `Veuillez remplir le champ : ${field.label}`
        );

        return false;
      }
    }

    return true;
  }

  /* ===================================================
     PAIEMENT
  =================================================== */

  async function handlePayment() {
    if (!product) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setPaymentLoading(true);
      setPaymentMessage(null);

      /*
       * Pour l'instant on prépare les données.
       *
       * La prochaine étape consistera à connecter
       * cette requête à ton endpoint SerdiPay.
       */

      const payload = {
        productId: product.id,

        amount: product.price,

        currency: product.currency,

        customer: formData,
      };

      console.log(
        "💳 DONNÉES PAIEMENT :",
        payload
      );

      /*
       * À remplacer par ton endpoint de paiement
       * lorsque celui-ci sera prêt.
       */

      const response = await fetch(
        `${API_URL}/api/public/payments`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Impossible d'initialiser le paiement."
        );
      }

      setPaymentMessage(
        result?.message ||
          "Paiement initialisé avec succès."
      );
    } catch (err: any) {
      console.error(
        "❌ PAYMENT ERROR:",
        err
      );

      setPaymentMessage(
        err?.message ||
          "Une erreur est survenue lors du paiement."
      );
    } finally {
      setPaymentLoading(false);
    }
  }

  /* ===================================================
     CHARGEMENT
  =================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
          <div className="text-center">
            <Loader2
              className="mx-auto animate-spin text-[#08192D]"
              size={42}
            />

            <p className="mt-4 text-slate-600">
              Chargement de la formation...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ===================================================
     ERREUR
  =================================================== */

  if (error || !data || !product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm">
            <AlertCircle
              className="mx-auto text-red-500"
              size={50}
            />

            <h1 className="mt-5 text-2xl font-bold text-[#08192D]">
              Page indisponible
            </h1>

            <p className="mt-3 text-slate-500">
              {error ||
                "Cette formation n'est pas disponible."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#08192D] px-6 py-3 font-semibold text-white"
            >
              <ArrowLeft size={18} />

              Retour
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ===================================================
     AFFICHAGE
  =================================================== */

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-[#08192D]"
          >
            <ArrowLeft size={19} />

            Retour
          </Link>

          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 size={17} />

            Inscription sécurisée
          </div>
        </div>
      </header>

      {/* =================================================
          CONTENU
      ================================================= */}

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* =================================================
              COLONNE PRINCIPALE
          ================================================= */}

          <div className="lg:col-span-2">
            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-[380px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[380px] w-full items-center justify-center bg-gradient-to-br from-[#08192D] to-slate-700">
                  <GraduationCap
                    size={90}
                    className="text-white/80"
                  />
                </div>
              )}
            </div>

            {/* =================================================
                INFORMATIONS FORMATION
            ================================================= */}

            <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  {product.type}
                </span>

                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                  Disponible
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold text-[#08192D]">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="mt-3 text-xl text-slate-500">
                  {product.subtitle}
                </p>
              )}

              {product.description && (
                <div className="mt-7">
                  <h2 className="text-xl font-bold text-[#08192D]">
                    À propos de cette formation
                  </h2>

                  <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                    {product.description}
                  </p>
                </div>
              )}
            </section>

            {/* =================================================
                FORMATEUR
            ================================================= */}

            <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#08192D]">
                Formateur
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <User
                    size={30}
                    className="text-[#08192D]"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#08192D]">
                    {instructor?.name ||
                      "Formateur"}
                  </h3>

                  {instructor?.email && (
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Mail size={15} />

                      {instructor.email}
                    </p>
                  )}

                  {instructor?.phone && (
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Phone size={15} />

                      {instructor.phone}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                ÉTABLISSEMENT
            ================================================= */}

            {company && (
              <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#08192D]">
                  Établissement
                </h2>

                <div className="mt-5 flex gap-4">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                      <GraduationCap
                        size={28}
                        className="text-[#08192D]"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-[#08192D]">
                      {company.name}
                    </h3>

                    {company.address && (
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />

                        {company.address}
                      </p>
                    )}

                    {company.phone && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Phone size={16} />

                        {company.phone}
                      </p>
                    )}

                    {company.email && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Mail size={16} />

                        {company.email}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* =================================================
              SIDEBAR INSCRIPTION
          ================================================= */}

          <aside>
            <div className="sticky top-6 rounded-3xl bg-white p-7 shadow-sm">
              {/* =============================================
                  PRIX
              ============================================= */}

              <div className="border-b pb-6">
                <p className="text-sm font-medium text-slate-500">
                  Prix de la formation
                </p>

                <div className="mt-2 text-4xl font-bold text-[#08192D]">
                  {formatPrice(
                    product.price,
                    product.currency
                  )}
                </div>
              </div>

              {/* =============================================
                  FORMULAIRE
              ============================================= */}

              <div className="pt-6">
                <h2 className="text-2xl font-bold text-[#08192D]">
                  Inscription
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Remplissez vos informations pour
                  vous inscrire à cette formation.
                </p>

                <div className="mt-6 space-y-5">
                  {fields.length === 0 ? (
                    <>
                      {/* NOM PAR DÉFAUT */}

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                          Nom complet
                        </label>

                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="text"
                            value={
                              formData.name ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Votre nom complet"
                            className="w-full rounded-2xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-[#08192D]"
                          />
                        </div>
                      </div>

                      {/* EMAIL */}

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                          Adresse email
                        </label>

                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="email"
                            value={
                              formData.email ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "email",
                                e.target.value
                              )
                            }
                            placeholder="exemple@email.com"
                            className="w-full rounded-2xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-[#08192D]"
                          />
                        </div>
                      </div>

                      {/* TÉLÉPHONE */}

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                          Numéro de téléphone
                        </label>

                        <div className="relative">
                          <Phone
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="tel"
                            value={
                              formData.phone ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "phone",
                                e.target.value
                              )
                            }
                            placeholder="243XXXXXXXXX"
                            className="w-full rounded-2xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-[#08192D]"
                          />
                        </div>
                      </div>

                      {/* DATE DE NAISSANCE */}

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                          Date de naissance
                        </label>

                        <div className="relative">
                          <Calendar
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="date"
                            value={
                              formData.birthDate ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "birthDate",
                                e.target.value
                              )
                            }
                            className="w-full rounded-2xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-[#08192D]"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* =========================================
                       CHAMPS CONFIGURÉS PAR LE FORMATEUR
                    ========================================= */

                    fields.map(
                      (field) => {
                        const type =
                          normalizeFieldType(
                            field.type
                          );

                        const value =
                          formData[
                            field.name
                          ] || "";

                        return (
                          <div
                            key={field.id}
                          >
                            <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                              {field.label}

                              {field.required && (
                                <span className="ml-1 text-red-500">
                                  *
                                </span>
                              )}
                            </label>

                            {type ===
                              "TEXTAREA" ? (
                              <textarea
                                value={
                                  value
                                }
                                onChange={(
                                  e
                                ) =>
                                  handleFieldChange(
                                    field.name,
                                    e
                                      .target
                                      .value
                                  )
                                }
                                rows={4}
                                placeholder={
                                  field.label
                                }
                                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-[#08192D]"
                              />
                            ) : type ===
                              "SELECT" ? (
                              <select
                                value={
                                  value
                                }
                                onChange={(
                                  e
                                ) =>
                                  handleFieldChange(
                                    field.name,
                                    e
                                      .target
                                      .value
                                  )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 outline-none transition focus:border-[#08192D]"
                              >
                                <option value="">
                                  Sélectionnez
                                </option>

                                {/* 
                                  Si les options sont ajoutées
                                  plus tard dans le modèle,
                                  elles pourront être utilisées ici.
                                */}
                              </select>
                            ) : (
                              <input
                                type={
                                  type ===
                                  "EMAIL"
                                    ? "email"
                                    : type ===
                                      "PHONE"
                                    ? "tel"
                                    : type ===
                                      "NUMBER"
                                    ? "number"
                                    : type ===
                                      "DATE"
                                    ? "date"
                                    : "text"
                                }
                                value={
                                  value
                                }
                                onChange={(
                                  e
                                ) =>
                                  handleFieldChange(
                                    field.name,
                                    e
                                      .target
                                      .value
                                  )
                                }
                                placeholder={
                                  field.label
                                }
                                className="w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-[#08192D]"
                              />
                            )}
                          </div>
                        );
                      }
                    )
                  )}
                </div>

                {/* =========================================
                    MESSAGE PAIEMENT
                ========================================= */}

                {paymentMessage && (
                  <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                    {paymentMessage}
                  </div>
                )}

                {/* =========================================
                    BOUTON PAYER
                ========================================= */}

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#08192D] px-6 py-4 font-bold text-white transition hover:bg-[#102c4e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paymentLoading ? (
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
                      {formatPrice(
                        product.price,
                        product.currency
                      )}
                    </>
                  )}
                </button>

                {/* =========================================
                    SÉCURITÉ
                ========================================= */}

                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Vos informations sont
                    utilisées uniquement pour
                    traiter votre inscription
                    et votre paiement.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}