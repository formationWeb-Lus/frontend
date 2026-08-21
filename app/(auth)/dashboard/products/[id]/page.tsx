"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  Edit,
  Save,
  Loader2,
  CheckCircle,
  ExternalLink,
  Trash2,
  AlertCircle,
  Package,
  Globe,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://paylink.coderise-solution.com/api";

type ProductStatus =
  | "DRAFT"
  | "PENDING"
  | "PUBLISHED"
  | "DISABLED";

type ProductType =
  | "PHYSICAL"
  | "DIGITAL"
  | "COURSE"
  | "SERVICE"
  | "SCHOOL"
  | "SUBSCRIPTION";

type Currency = "USD" | "CDF";

interface PaymentPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  active: boolean;
  createdAt: string;
}

interface ProductField {
  id: number;
  productId: number;
  name: string;
  label: string;
  type: string;
  value?: string | null;
  required: boolean;
  createdAt: string;
}

interface Product {
  id: number;
  userId: number;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  type: ProductType;
  price: number;
  currency: Currency;
  imageUrl?: string | null;
  status: ProductStatus;
  createdAt: string;
  fields?: ProductField[];
  paymentPages?: PaymentPage[];
}

const typeLabels: Record<
  ProductType,
  string
> = {
  PHYSICAL: "Produit physique",
  DIGITAL: "Produit numérique",
  COURSE: "Formation",
  SERVICE: "Service",
  SCHOOL: "École",
  SUBSCRIPTION: "Abonnement",
};

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const productId =
    Array.isArray(params.id)
      ? params.id[0]
      : params.id;

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [publishing, setPublishing] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

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

  const [imageUrl, setImageUrl] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const getToken = () => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Utilisateur non authentifié."
        );
      }

      const response = await fetch(
        `${API_URL}/product/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Produit introuvable."
        );
      }

      const loadedProduct =
        data.product as Product;

      setProduct(
        loadedProduct
      );

      setName(
        loadedProduct.name
      );

      setSubtitle(
        loadedProduct.subtitle ||
          ""
      );

      setDescription(
        loadedProduct.description ||
          ""
      );

      setType(
        loadedProduct.type
      );

      setPrice(
        String(
          loadedProduct.price
        )
      );

      setCurrency(
        loadedProduct.currency
      );

      setImageUrl(
        loadedProduct.imageUrl ||
          ""
      );
    } catch (err: any) {
      console.error(
        "GET PRODUCT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Impossible de récupérer le produit."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const saveProduct = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Utilisateur non authentifié."
        );
      }

      if (!name.trim()) {
        throw new Error(
          "Le nom est obligatoire."
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
        throw new Error(
          "Le prix est invalide."
        );
      }

      const response = await fetch(
        `${API_URL}/product/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),

            subtitle:
              subtitle.trim() ||
              null,

            description:
              description.trim() ||
              null,

            type,

            price:
              numericPrice,

            currency,

            imageUrl:
              imageUrl.trim() ||
              null,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Impossible de modifier le produit."
        );
      }

      setProduct(
        data.product
      );

      setEditing(false);

      setSuccess(
        data.message ||
          "Produit modifié avec succès."
      );
    } catch (err: any) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Impossible de modifier le produit."
      );
    } finally {
      setSaving(false);
    }
  };

  const publishProduct = async () => {
    try {
      setPublishing(true);
      setError(null);
      setSuccess(null);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Utilisateur non authentifié."
        );
      }

      const response = await fetch(
        `${API_URL}/products/${productId}/publish`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Impossible de publier le produit."
        );
      }

      setProduct(
        data.product
      );

      setSuccess(
        data.message ||
          "Produit publié avec succès."
      );
    } catch (err: any) {
      console.error(
        "PUBLISH PRODUCT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Impossible de publier le produit."
      );
    } finally {
      setPublishing(false);
    }
  };

  const deleteProduct = async () => {
    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer ce produit ?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Utilisateur non authentifié."
        );
      }

      const response = await fetch(
        `${API_URL}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Impossible de supprimer le produit."
        );
      }

      router.push(
        "/dashboard/products"
      );
    } catch (err: any) {
      console.error(
        "DELETE PRODUCT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Impossible de supprimer le produit."
      );
    } finally {
      setDeleting(false);
    }
  };

  const getPublicUrl = () => {
    if (!product) {
      return null;
    }

    const page =
      product.paymentPages?.find(
        (item) =>
          item.active
      ) ||
      product.paymentPages?.[0];

    if (!page) {
      return null;
    }

    if (
      typeof window ===
      "undefined"
    ) {
      return null;
    }

    return `${window.location.origin}/pay/${page.slug}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={35}
            className="animate-spin text-blue-600"
          />

          <p className="text-gray-600">
            Chargement du produit...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white border rounded-2xl p-8 text-center max-w-md">

          <AlertCircle
            size={45}
            className="mx-auto text-red-500"
          />

          <h1 className="text-xl font-bold mt-4">
            Produit introuvable
          </h1>

          <p className="text-gray-500 mt-2">
            {error ||
              "Ce produit n'existe pas ou vous n'avez pas accès à celui-ci."}
          </p>

          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl"
          >
            <ArrowLeft size={18} />
            Retour aux produits
          </Link>

        </div>
      </div>
    );
  }

  const publicUrl =
    getPublicUrl();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                router.push(
                  "/dashboard/products"
                )
              }
              className="p-2.5 bg-white border rounded-xl hover:bg-gray-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div>

              <h1 className="text-3xl font-bold">
                {product.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {typeLabels[
                  product.type
                ]}
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {!editing && (
              <button
                onClick={() =>
                  setEditing(true)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50"
              >
                <Edit size={18} />
                Modifier
              </button>
            )}

            {product.status !==
              "PUBLISHED" && (
              <button
                onClick={
                  publishProduct
                }
                disabled={
                  publishing
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-60"
              >
                {publishing ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Publication...
                  </>
                ) : (
                  <>
                    <CheckCircle
                      size={18}
                    />
                    Publier
                  </>
                )}
              </button>
            )}

          </div>
        </div>

        {/* MESSAGES */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex gap-3">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 flex gap-3">
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* MAIN */}

          <div className="lg:col-span-2 space-y-6">

            {/* PRODUCT */}

            <section className="bg-white border rounded-2xl overflow-hidden">

              {product.imageUrl ? (
                <img
                  src={
                    product.imageUrl
                  }
                  alt={
                    product.name
                  }
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                  <Package
                    size={70}
                    className="text-gray-300"
                  />
                </div>
              )}

              <div className="p-6">

                {!editing ? (
                  <>
                    <h2 className="text-2xl font-bold">
                      {product.name}
                    </h2>

                    {product.subtitle && (
                      <p className="text-gray-500 mt-2">
                        {
                          product.subtitle
                        }
                      </p>
                    )}

                    {product.description && (
                      <div className="mt-6 whitespace-pre-wrap text-gray-700 leading-7">
                        {
                          product.description
                        }
                      </div>
                    )}

                    <div className="mt-7">

                      <p className="text-3xl font-bold">
                        {product.price.toLocaleString(
                          "fr-FR"
                        )}{" "}
                        <span className="text-base text-gray-500">
                          {
                            product.currency
                          }
                        </span>
                      </p>

                    </div>
                  </>
                ) : (
                  <div className="space-y-5">

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nom
                      </label>

                      <input
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        className="w-full border rounded-xl px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Sous-titre
                      </label>

                      <input
                        value={
                          subtitle
                        }
                        onChange={(e) =>
                          setSubtitle(
                            e.target.value
                          )
                        }
                        className="w-full border rounded-xl px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Description
                      </label>

                      <textarea
                        value={
                          description
                        }
                        onChange={(e) =>
                          setDescription(
                            e.target.value
                          )
                        }
                        rows={7}
                        className="w-full border rounded-xl px-4 py-3 resize-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Type
                        </label>

                        <select
                          value={type}
                          onChange={(e) =>
                            setType(
                              e.target.value as ProductType
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3 bg-white"
                        >
                          {Object.entries(
                            typeLabels
                          ).map(
                            ([
                              value,
                              label,
                            ]) => (
                              <option
                                key={
                                  value
                                }
                                value={
                                  value
                                }
                              >
                                {
                                  label
                                }
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Prix
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            price
                          }
                          onChange={(e) =>
                            setPrice(
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Devise
                      </label>

                      <select
                        value={
                          currency
                        }
                        onChange={(e) =>
                          setCurrency(
                            e.target.value as Currency
                          )
                        }
                        className="w-full border rounded-xl px-4 py-3 bg-white"
                      >
                        <option value="USD">
                          USD
                        </option>

                        <option value="CDF">
                          CDF
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        URL de l'image
                      </label>

                      <input
                        type="url"
                        value={
                          imageUrl
                        }
                        onChange={(e) =>
                          setImageUrl(
                            e.target.value
                          )
                        }
                        className="w-full border rounded-xl px-4 py-3"
                      />
                    </div>

                    <div className="flex gap-3 pt-3">

                      <button
                        onClick={
                          saveProduct
                        }
                        disabled={
                          saving
                        }
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60"
                      >
                        {saving ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            <Save
                              size={18}
                            />
                            Enregistrer
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          setEditing(
                            false
                          )
                        }
                        className="px-5 py-3 border rounded-xl hover:bg-gray-50"
                      >
                        Annuler
                      </button>

                    </div>

                  </div>
                )}

              </div>
            </section>

            {/* FIELDS */}

            <section className="bg-white border rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-5">
                Champs d'inscription
              </h2>

              {!product.fields ||
              product.fields.length ===
                0 ? (
                <p className="text-gray-500">
                  Aucun champ
                  d'inscription
                  personnalisé.
                </p>
              ) : (
                <div className="space-y-3">

                  {product.fields.map(
                    (field) => (
                      <div
                        key={
                          field.id
                        }
                        className="border rounded-xl p-4 flex items-center justify-between"
                      >

                        <div>
                          <p className="font-semibold">
                            {
                              field.label
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            {field.name} ·{" "}
                            {
                              field.type
                            }
                          </p>
                        </div>

                        {field.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Obligatoire
                          </span>
                        )}

                      </div>
                    )
                  )}

                </div>
              )}

            </section>

          </div>

          {/* SIDEBAR */}

          <div className="space-y-6">

            {/* STATUS */}

            <section className="bg-white border rounded-2xl p-6">

              <h2 className="font-bold text-lg mb-4">
                Statut
              </h2>

              <div className="flex items-center gap-3">

                <div
                  className={`w-3 h-3 rounded-full ${
                    product.status ===
                    "PUBLISHED"
                      ? "bg-green-500"
                      : product.status ===
                        "DISABLED"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                />

                <span className="font-medium">
                  {product.status ===
                    "PUBLISHED" &&
                    "Publié"}

                  {product.status ===
                    "DRAFT" &&
                    "Brouillon"}

                  {product.status ===
                    "PENDING" &&
                    "En attente"}

                  {product.status ===
                    "DISABLED" &&
                    "Désactivé"}
                </span>

              </div>

            </section>

            {/* PUBLIC PAGE */}

            <section className="bg-white border rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-4">
                <Globe
                  size={20}
                  className="text-blue-600"
                />

                <h2 className="font-bold text-lg">
                  Page publique
                </h2>
              </div>

              {publicUrl ? (
                <>
                  <p className="text-sm text-gray-500 break-all mb-4">
                    {publicUrl}
                  </p>

                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    <ExternalLink
                      size={17}
                    />
                    Ouvrir la page
                  </a>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  Aucune page publique
                  disponible.
                </p>
              )}

            </section>

            {/* DELETE */}

            <section className="bg-white border border-red-200 rounded-2xl p-6">

              <h2 className="font-bold text-lg text-red-700">
                Zone dangereuse
              </h2>

              <p className="text-sm text-gray-500 mt-2 mb-5">
                La suppression est
                définitive. Si le produit
                possède des transactions,
                votre API empêchera sa
                suppression.
              </p>

              <button
                onClick={
                  deleteProduct
                }
                disabled={deleting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2
                      size={17}
                    />
                    Supprimer le produit
                  </>
                )}
              </button>

            </section>

          </div>
        </div>
      </div>
    </div>
  );
}