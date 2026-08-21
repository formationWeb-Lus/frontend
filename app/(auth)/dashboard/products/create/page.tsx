
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Package,
  DollarSign,
  FileText,
  Settings2,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
} from "lucide-react";

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://paylink.coderise-solution.com/api";

/* =========================================================
   TYPES
========================================================= */

type ProductType =
  | "PHYSICAL"
  | "DIGITAL"
  | "COURSE"
  | "SERVICE"
  | "SCHOOL"
  | "SUBSCRIPTION";

type Currency =
  | "USD"
  | "CDF";

type ProductStatus =
  | "DRAFT"
  | "PUBLISHED";

type ProductFieldType =
  | "TEXT"
  | "TEXTAREA"
  | "NUMBER"
  | "PHONE"
  | "EMAIL"
  | "DATE"
  | "SELECT"
  | "BOOLEAN"
  | "FILE"
  | "IMAGE";

interface ProductField {
  name: string;
  label: string;
  type: ProductFieldType;
  value: string;
  required: boolean;
}

/* =========================================================
   PRODUCT TYPES
========================================================= */

const PRODUCT_TYPES: {
  value: ProductType;
  label: string;
  description: string;
}[] = [
  {
    value: "PHYSICAL",
    label: "Produit physique",
    description:
      "Produit livré physiquement au client.",
  },
  {
    value: "DIGITAL",
    label: "Produit numérique",
    description:
      "Fichier, logiciel ou contenu numérique.",
  },
  {
    value: "COURSE",
    label: "Formation",
    description:
      "Cours, formation ou programme éducatif.",
  },
  {
    value: "SERVICE",
    label: "Service",
    description:
      "Prestation ou service professionnel.",
  },
  {
    value: "SCHOOL",
    label: "École",
    description:
      "Inscription ou programme scolaire.",
  },
  {
    value: "SUBSCRIPTION",
    label: "Abonnement",
    description:
      "Produit basé sur un abonnement.",
  },
];

/* =========================================================
   FIELD TYPES
========================================================= */

const FIELD_TYPES: {
  value: ProductFieldType;
  label: string;
}[] = [
  {
    value: "TEXT",
    label: "Texte",
  },
  {
    value: "TEXTAREA",
    label: "Paragraphe",
  },
  {
    value: "NUMBER",
    label: "Nombre",
  },
  {
    value: "PHONE",
    label: "Téléphone",
  },
  {
    value: "EMAIL",
    label: "Email",
  },
  {
    value: "DATE",
    label: "Date",
  },
  {
    value: "SELECT",
    label: "Liste",
  },
  {
    value: "BOOLEAN",
    label: "Oui / Non",
  },
  {
    value: "FILE",
    label: "Fichier",
  },
  {
    value: "IMAGE",
    label: "Image",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function CreateProductPage() {
  const router = useRouter();

  /* =======================================================
     STATES
  ======================================================= */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [showPreview, setShowPreview] =
    useState(false);

  /* PRODUCT */

  const [name, setName] =
    useState("");

  const [subtitle, setSubtitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [type, setType] =
    useState<ProductType>("COURSE");

  const [price, setPrice] =
    useState("");

  const [currency, setCurrency] =
    useState<Currency>("USD");

 const [imageFile, setImageFile] =
useState<File | null>(null);

const [imagePreview, setImagePreview] =
useState("");

  const [status, setStatus] =
    useState<ProductStatus>("DRAFT");

  /* CUSTOM FIELDS */

  const [fields, setFields] =
    useState<ProductField[]>([]);

  /* =======================================================
     TOKEN
  ======================================================= */

  /* =======================================================
   TOKEN
======================================================= */

const getToken = (): string | null => {

  if (typeof window === "undefined") {
    return null;
  }


  const cookieToken =
    document.cookie
      .split("; ")
      .find(
        (row) =>
          row.startsWith("token=")
      )
      ?.split("=")[1];


  return cookieToken || null;

};
  /* =======================================================
     CLEAR ALERTS
  ======================================================= */

  const clearAlerts = () => {
    setError("");
    setSuccess("");
  };

  /* =======================================================
     GENERATE TECHNICAL NAME
  ======================================================= */
const generateFieldName = (value: string) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+/, "")
    .replace(/_+$/, "");
};

/* =======================================================
ADD FIELD
======================================================= */

const addField = () => {
  setFields((previous) => [
    ...previous,
    {
      name: "",
      label: "",
      type: "TEXT",
      value: "",
      required: false,
    },
  ]);
};

/* =======================================================
UPDATE FIELD
======================================================= */

const updateField = (
  index: number,
  key: keyof ProductField,
  value: string | boolean
) => {
  setFields((previous) =>
    previous.map((field, fieldIndex) =>
      fieldIndex === index
        ? {
            ...field,
            [key]: value,
          }
        : field
    )
  );
};

/* =======================================================
LABEL CHANGE
======================================================= */

const handleFieldLabelChange = (
  index: number,
  value: string
) => {
  setFields((previous) =>
    previous.map((field, fieldIndex) => {
      if (fieldIndex !== index) {
        return field;
      }

      return {
        ...field,
        label: value,
        name:
          field.name ||
          generateFieldName(value),
      };
    })
  );
};

/* =======================================================
REMOVE FIELD
======================================================= */

const removeField = (index: number) => {
  setFields((previous) =>
    previous.filter(
      (_, fieldIndex) => fieldIndex !== index
    )
  );
};


  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    if (!name.trim()) {
      return (
        "Le nom du produit est obligatoire."
      );
    }

    if (!price.trim()) {
      return (
        "Le prix du produit est obligatoire."
      );
    }

    const numericPrice =
      Number(price);

    if (
      Number.isNaN(
        numericPrice
      ) ||
      numericPrice < 0
    ) {
      return (
        "Le prix du produit est invalide."
      );
    }

    const names =
      new Set<string>();

    for (
      let i = 0;
      i < fields.length;
      i++
    ) {
      const field =
        fields[i];

      if (
        !field.name.trim()
      ) {
        return `Le nom technique du champ ${
          i + 1
        } est obligatoire.`;
      }

      if (
        !field.label.trim()
      ) {
        return `Le libellé du champ ${
          i + 1
        } est obligatoire.`;
      }

      const technicalName =
        field.name.trim();

      if (
        names.has(
          technicalName
        )
      ) {
        return `Le nom technique "${technicalName}" est utilisé plusieurs fois.`;
      }

      names.add(
        technicalName
      );
    }

    return null;
  };

  /* =======================================================
     CREATE PRODUCT
  ======================================================= */
const handleSubmit = async (
  event: FormEvent
) => {

event.preventDefault();

clearAlerts();


const token =
  getToken();


if (!token) {

  setError(
    "Utilisateur non authentifié. Veuillez vous reconnecter."
  );

  return;

}


const validationError =
  validateForm();


if (validationError) {

  setError(
    validationError
  );

  return;

}



try {

  setLoading(true);



const formData = new FormData();

formData.append(
  "name",
  name.trim()
);

formData.append(
  "subtitle",
  subtitle.trim()
    ? subtitle.trim()
    : ""
);

formData.append(
  "description",
  description.trim()
    ? description.trim()
    : ""
);

formData.append(
  "type",
  type
);

formData.append(
  "price",
  String(Number(price))
);

formData.append(
  "currency",
  currency
);

formData.append(
  "status",
  status
);

formData.append(
  "fields",
  JSON.stringify(
    fields.map(
      (field) => ({
        name:
          field.name.trim(),

        label:
          field.label.trim(),

        type:
          field.type,

        value:
          field.value.trim()
            ? field.value.trim()
            : null,

        required:
          field.required,
      })
    )
  )
);

if (imageFile) {
  formData.append(
    "image",
    imageFile
  );
}

console.log(
  "CREATE PRODUCT FORMDATA:",
  {
    name,
    subtitle,
    description,
    type,
    price,
    currency,
    status,
    imageFile,
    fields,
  }
);

const response =
  await fetch(
    `${API_URL}/product`,
    {
      method: "POST",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },

      body: formData,
    }
  );

     

      /* =================================================
         REQUEST
      ================================================= */

      /* =================================================
         RESPONSE
      ================================================= */

      let data: any = null;

      try {
        data =
          await response.json();
      } catch {
        throw new Error(
          "Le serveur a retourné une réponse invalide."
        );
      }

      console.log(
        "CREATE PRODUCT RESPONSE:",
        data
      );

      /* =================================================
         TOKEN EXPIRED
      ================================================= */

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "accessToken"
        );

        throw new Error(
          "Votre session a expiré. Veuillez vous reconnecter."
        );
      }

      /* =================================================
         SERVER ERROR
      ================================================= */

     if (!response.ok) {
  const message =
    data?.message ||
    "Impossible de créer le produit.";

  // Cas : abonnement requis
  if (
    response.status === 403 ||
    message.toLowerCase().includes("abonnement") ||
    message.toLowerCase().includes("subscription")
  ) {
    setError(message);

    setTimeout(() => {
      router.push("/dashboard/subscriptions");
    }, 2500);

    return;
  }

  throw new Error(message);
}

      /* =================================================
         SUCCESS
      ================================================= */

      setSuccess(
        data?.message ||
          "Produit créé avec succès."
      );

      /* =================================================
         REDIRECT
      ================================================= */

      setTimeout(() => {
        router.push(
          "/dashboard/products"
        );

        router.refresh();
      }, 1000);

    } catch (err: any) {
      console.error(
        "CREATE PRODUCT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Une erreur est survenue lors de la création du produit."
      );

    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     CANCEL
  ======================================================= */

  const handleCancel = () => {
    if (loading) {
      return;
    }

    router.push(
      "/dashboard/products"
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={
                handleCancel
              }
              disabled={loading}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <ArrowLeft
                size={20}
              />
            </button>

            <div>

              <div className="flex items-center gap-2">

                <Package
                  size={22}
                  className="text-blue-600"
                />

                <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
                  Créer un produit
                </h1>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Configurez votre produit avant de l'enregistrer.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowPreview(
                !showPreview
              )
            }
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:flex"
          >
            <Eye
              size={18}
            />

            {showPreview
              ? "Masquer aperçu"
              : "Aperçu"}
          </button>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle
              size={21}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">

              <p className="font-semibold">
                Erreur
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="rounded-lg p-1 hover:bg-red-100"
            >
              <X
                size={18}
              />
            </button>

          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">

            <CheckCircle2
              size={21}
              className="mt-0.5 shrink-0"
            />

            <div>

              <p className="font-semibold">
                Succès
              </p>

              <p className="mt-1 text-sm">
                {success}
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div
            className={
              showPreview
                ? "grid gap-6 lg:grid-cols-[1fr_380px]"
                : ""
            }
          >

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-6">

              {/* =================================================
                  GENERAL INFORMATION
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FileText
                        size={20}
                      />
                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        Informations générales
                      </h2>

                      <p className="text-sm text-slate-500">
                        Les informations principales du produit.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="space-y-5 p-6">

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Nom du produit *
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target
                            .value
                        )
                      }
                      placeholder="Ex : Formation Développement Web"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  {/* SUBTITLE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Sous-titre
                    </label>

                    <input
                      type="text"
                      value={
                        subtitle
                      }
                      onChange={(
                        event
                      ) =>
                        setSubtitle(
                          event.target
                            .value
                        )
                      }
                      placeholder="Ex : Apprenez à créer des applications modernes"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  {/* DESCRIPTION */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      rows={7}
                      value={
                        description
                      }
                      onChange={(
                        event
                      ) =>
                        setDescription(
                          event.target
                            .value
                        )
                      }
                      placeholder="Présentez votre produit..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

              </section>

              {/* =================================================
                  PRODUCT TYPE
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Package
                        size={20}
                      />
                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        Type de produit
                      </h2>

                      <p className="text-sm text-slate-500">
                        Sélectionnez le type correspondant.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="grid gap-3 p-6 sm:grid-cols-2">

                  {PRODUCT_TYPES.map(
                    (item) => {

                      const selected =
                        type ===
                        item.value;

                      return (
                        <button
                          key={
                            item.value
                          }
                          type="button"
                          onClick={() =>
                            setType(
                              item.value
                            )
                          }
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                              : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                          }`}
                        >

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <p className="font-semibold text-slate-900">
                                {
                                  item.label
                                }
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {
                                  item.description
                                }
                              </p>

                            </div>

                            {selected && (
                              <CheckCircle2
                                size={
                                  19
                                }
                                className="shrink-0 text-blue-600"
                              />
                            )}

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

              </section>

              {/* =================================================
                  PRICING
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <DollarSign
                        size={20}
                      />
                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        Tarification
                      </h2>

                      <p className="text-sm text-slate-500">
                        Définissez le prix et la devise.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">

                  {/* PRICE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Prix *
                    </label>

                    <div className="relative">

                      <DollarSign
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          price
                        }
                        onChange={(
                          event
                        ) =>
                          setPrice(
                            event.target
                              .value
                          )
                        }
                        placeholder="15"
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                    </div>

                  </div>

                  {/* CURRENCY */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Devise
                    </label>

                    <select
                      value={
                        currency
                      }
                      onChange={(
                        event
                      ) =>
                        setCurrency(
                          event.target
                            .value as Currency
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >

                      <option value="USD">
                        USD — Dollar américain
                      </option>

                      <option value="CDF">
                        CDF — Franc congolais
                      </option>

                    </select>

                  </div>

                </div>

              </section>
{/* =================================================
    IMAGE
================================================= */}

<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

  <div className="border-b border-slate-100 p-6">

    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
        <ImageIcon size={20} />
      </div>

      <div>
        <h2 className="font-bold text-slate-900">
          Image du produit
        </h2>
        <p className="text-sm text-slate-500">
          Téléchargez la couverture de votre livre.
        </p>
      </div>

    </div>

  </div>

  <div className="p-6">

    <label className="mb-2 block text-sm font-semibold text-slate-700">
      Image du produit
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }}
      className="w-full rounded-xl border border-slate-200 px-4 py-3"
    />

    {imagePreview && (
      /* Conteneur avec hauteur fixe (h-96) et centrage flex */
      <div className="mt-5 flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5 p-4">

        <img
          src={imagePreview}
          alt={name || "Couverture du livre"}
          /* object-contain affiche l'image ENTIÈRE sans la rogner */
          className="h-full max-h-full w-auto max-w-full rounded-lg object-contain shadow-md"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

      </div>
    )}

  </div>

</section>

              {/* =================================================
                  STATUS
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                  <h2 className="font-bold text-slate-900">
                    Publication
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choisissez le statut du produit.
                  </p>

                </div>

                <div className="grid gap-4 p-6 md:grid-cols-2">

                  {/* DRAFT */}

                  <button
                    type="button"
                    onClick={() =>
                      setStatus(
                        "DRAFT"
                      )
                    }
                    className={`rounded-2xl border p-5 text-left transition ${
                      status ===
                      "DRAFT"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="font-bold text-slate-900">
                          Brouillon
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Enregistrer sans publier.
                        </p>

                      </div>

                      {status ===
                        "DRAFT" && (
                        <CheckCircle2
                          size={
                            20
                          }
                          className="text-orange-600"
                        />
                      )}

                    </div>

                  </button>

                  {/* PUBLISHED */}

                  <button
                    type="button"
                    onClick={() =>
                      setStatus(
                        "PUBLISHED"
                      )
                    }
                    className={`rounded-2xl border p-5 text-left transition ${
                      status ===
                      "PUBLISHED"
                        ? "border-green-400 bg-green-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="font-bold text-slate-900">
                          Publier
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Publier immédiatement.
                        </p>

                      </div>

                      {status ===
                        "PUBLISHED" && (
                        <CheckCircle2
                          size={
                            20
                          }
                          className="text-green-600"
                        />
                      )}

                    </div>

                  </button>

                </div>

              </section>

              {/* =================================================
                  CUSTOM FIELDS
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-6">

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Settings2
                          size={20}
                        />
                      </div>

                      <div>

                        <h2 className="font-bold text-slate-900">
                          Champs personnalisés
                        </h2>

                        <p className="text-sm text-slate-500">
                          Informations demandées au client.
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={
                        addField
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >

                      <Plus
                        size={18}
                      />

                      Ajouter un champ

                    </button>

                  </div>

                </div>

                <div className="p-6">

                  {fields.length ===
                  0 ? (

                    <div className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">

                      <Settings2
                        size={40}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-4 font-semibold text-slate-600">
                        Aucun champ personnalisé
                      </p>

                      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                        Vous pouvez demander le nom, téléphone, email, etc.
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-5">

                      {fields.map(
                        (
                          field,
                          index
                        ) => (

                          <div
                            key={
                              index
                            }
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                          >

                            {/* FIELD HEADER */}

                            <div className="mb-5 flex items-center justify-between">

                              <div>

                                <p className="font-bold text-slate-900">
                                  Champ{" "}
                                  {index +
                                    1}
                                </p>

                                <p className="text-xs text-slate-500">
                                  Informations demandées au client.
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeField(
                                    index
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                              >

                                <Trash2
                                  size={
                                    16
                                  }
                                />

                                Supprimer

                              </button>

                            </div>

                            <div className="grid gap-5 md:grid-cols-2">

                              {/* LABEL */}

                              <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                  Libellé *
                                </label>

                                <input
                                  type="text"
                                  value={
                                    field.label
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    handleFieldLabelChange(
                                      index,
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  placeholder="Nom complet"
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                              </div>

                              {/* TECHNICAL NAME */}

                              <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                  Nom technique *
                                </label>

                                <input
                                  type="text"
                                  value={
                                    field.name
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateField(
                                      index,
                                      "name",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  placeholder="fullName"
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                  Exemple : fullName
                                </p>

                              </div>

                              {/* TYPE */}

                              <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                  Type
                                </label>

                                <select
                                  value={
                                    field.type
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateField(
                                      index,
                                      "type",
                                      event
                                        .target
                                        .value as ProductFieldType
                                    )
                                  }
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                >

                                  {FIELD_TYPES.map(
                                    (
                                      item
                                    ) => (
                                      <option
                                        key={
                                          item.value
                                        }
                                        value={
                                          item.value
                                        }
                                      >
                                        {
                                          item.label
                                        }
                                      </option>
                                    )
                                  )}

                                </select>

                              </div>

                              {/* DEFAULT VALUE */}

                              <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                  Valeur par défaut
                                </label>

                                <input
                                  type="text"
                                  value={
                                    field.value
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateField(
                                      index,
                                      "value",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  placeholder="Optionnel"
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                              </div>

                            </div>

                            {/* REQUIRED */}

                            <label className="mt-5 flex cursor-pointer items-center gap-3">

                              <input
                                type="checkbox"
                                checked={
                                  field.required
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateField(
                                    index,
                                    "required",
                                    event
                                      .target
                                      .checked
                                  )
                                }
                                className="h-5 w-5 rounded border-slate-300 text-blue-600"
                              />

                              <span className="text-sm font-semibold text-slate-700">
                                Champ obligatoire
                              </span>

                            </label>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

              </section>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    handleCancel
                  }
                  disabled={
                    loading
                  }
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Save
                        size={19}
                      />

                      Créer le produit
                    </>
                  )}

                </button>

              </div>

            </div>

            {/* =================================================
                PREVIEW
            ================================================= */}

            {showPreview && (
              <aside className="hidden lg:block">

                <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 p-5">

                    <div className="flex items-center gap-2">

                      <Eye
                        size={18}
                        className="text-blue-600"
                      />

                      <h3 className="font-bold text-slate-900">
                        Aperçu
                      </h3>

                    </div>

                  </div>

                  <div className="aspect-video bg-slate-100">

                   {imagePreview ? (
  <img
    src={imagePreview}
    alt={
      name ||
      "Produit"
    }
    className="h-full w-full object-cover"
  />
) : (
                      <div className="flex h-full flex-col items-center justify-center text-slate-400">

                        <ImageIcon
                          size={
                            42
                          }
                        />

                        <p className="mt-2 text-sm">
                          Aucune image
                        </p>

                      </div>
                    )}

                  </div>

                  <div className="p-5">

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {
                        PRODUCT_TYPES.find(
                          (item) =>
                            item.value ===
                            type
                        )?.label
                      }
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                      {name ||
                        "Nom du produit"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {subtitle ||
                        "Sous-titre du produit"}
                    </p>

                    <p className="mt-4 line-clamp-5 text-sm leading-6 text-slate-600">
                      {description ||
                        "La description apparaîtra ici."}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                      <span className="text-sm text-slate-500">
                        Prix
                      </span>

                      <span className="text-2xl font-bold text-slate-900">
                        {price ||
                          "0"}{" "}
                        {currency}
                      </span>

                    </div>

                    <button
                      type="button"
                      disabled
                      className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white opacity-90"
                    >
                      Acheter maintenant
                    </button>

                  </div>

                </div>

              </aside>
            )}

          </div>

        </form>

      </main>

    </div>
  );
};

