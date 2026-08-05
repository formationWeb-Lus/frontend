"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Package,
  CheckCircle,
} from "lucide-react";

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
  createdAt: string;
}

export default function CreatePaymentPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  /* =====================================================
     CHARGER LES PRODUITS
  ===================================================== */

  useEffect(() => {
    async function loadProducts() {
      try {
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken");

        if (!token) {
          alert("Votre session a expiré.");
          return;
        }

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL n'est pas configuré."
          );
        }

        const response = await fetch(
  `${apiUrl}/product`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Impossible de récupérer les produits."
          );
        }

        /*
         * Selon ton controller, les produits peuvent être
         * directement dans data ou dans data.products.
         */
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList);
      } catch (error) {
        console.error(
          "LOAD PRODUCTS ERROR:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement des produits."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [apiUrl]);

  /* =====================================================
     SELECTION PRODUIT
  ===================================================== */

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);

    setTitle(
      product.subtitle
        ? `${product.name} - Paiement`
        : product.name
    );

    setDescription(
      product.description || ""
    );

    setSlug(
      generateSlug(product.name)
    );
  }

  /* =====================================================
     GENERER SLUG
  ===================================================== */

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /* =====================================================
     CREER PAYMENT PAGE
  ===================================================== */

  async function handleCreatePaymentPage() {
    if (!selectedProduct) {
      alert(
        "Veuillez sélectionner un produit."
      );
      return;
    }

    if (!title.trim()) {
      alert(
        "Veuillez entrer le titre de la page."
      );
      return;
    }

    if (!slug.trim()) {
      alert(
        "Veuillez entrer le slug."
      );
      return;
    }

    setCreating(true);

    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      if (!token) {
        throw new Error(
          "Votre session a expiré. Veuillez vous reconnecter."
        );
      }

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL n'est pas configuré."
        );
      }

      const payload = {
        productId: selectedProduct.id,
        title: title.trim(),
        slug: slug.trim(),
        description:
          description.trim() || null,
        active: true,
      };
const response = await fetch(
  `${apiUrl}/payment-pages`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }
);

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de créer la page de paiement."
        );
      }

      alert(
        "Page de paiement créée avec succès."
      );

      router.push(
        "/dashboard/payment-pages"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE PAYMENT PAGE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setCreating(false);
    }
  }

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2
            size={24}
            className="animate-spin"
          />

          Chargement des produits...
        </div>
      </div>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">

      {/* HEADER */}

      <div className="flex items-center gap-4">

        <Link
          href="/dashboard/payment-pages"
          className="
            rounded-xl
            bg-white
            p-3
            shadow-sm
            hover:bg-slate-50
          "
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-4xl font-bold text-[#08192D]">
            Créer une page de paiement
          </h1>

          <p className="mt-2 text-slate-500">
            Sélectionnez un produit existant et créez
            son lien de paiement.
          </p>
        </div>

      </div>

      {/* PRODUITS */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#08192D]">
            Sélectionner un produit
          </h2>

          <p className="mt-2 text-slate-500">
            Les produits proviennent directement de PostgreSQL.
          </p>
        </div>

        {products.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">

            <Package
              size={45}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-xl font-bold text-[#08192D]">
              Aucun produit disponible
            </h3>

            <p className="mt-2 text-slate-500">
              Créez d'abord un produit avant de créer
              une page de paiement.
            </p>

            <Link
              href="/dashboard/products/create"
              className="
                mt-6
                inline-flex
                rounded-xl
                bg-[#08192D]
                px-6
                py-3
                font-semibold
                text-white
              "
            >
              Créer un produit
            </Link>

          </div>

        ) : (

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => {

              const selected =
                selectedProduct?.id ===
                product.id;

              return (
                <button
                  type="button"
                  key={product.id}
                  onClick={() =>
                    handleSelectProduct(
                      product
                    )
                  }
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    text-left
                    transition
                    ${
                      selected
                        ? "border-[#08192D] ring-2 ring-[#08192D]"
                        : "border-slate-200 hover:border-slate-400"
                    }
                  `}
                >

                  {/* IMAGE */}

                  <div className="relative h-48 bg-slate-100">

                    {product.imageUrl ? (

                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <Package
                          size={45}
                          className="text-slate-300"
                        />

                      </div>

                    )}

                    {selected && (
                      <div className="absolute right-3 top-3 rounded-full bg-white p-1 shadow">
                        <CheckCircle
                          size={25}
                          className="text-green-600"
                        />
                      </div>
                    )}

                  </div>

                  {/* INFORMATIONS */}

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="font-bold text-[#08192D]">
                        {product.name}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">
                        {product.type}
                      </span>

                    </div>

                    {product.subtitle && (
                      <p className="mt-2 text-sm text-slate-500">
                        {product.subtitle}
                      </p>
                    )}

                    {product.description && (
                      <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-4 text-lg font-bold text-[#08192D]">
                      {product.price.toLocaleString()}{" "}
                      {product.currency}
                    </div>

                  </div>

                </button>
              );
            })}

          </div>

        )}

      </section>

      {/* CONFIGURATION */}

      {selectedProduct && (

        <section className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-[#08192D]">
            Configuration de la page
          </h2>

          <p className="mt-2 text-slate-500">
            Ces informations seront utilisées pour
            générer le lien public de paiement.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                Titre de la page
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  focus:border-[#08192D]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                Slug
              </label>

              <input
                value={slug}
                onChange={(e) =>
                  setSlug(
                    generateSlug(
                      e.target.value
                    )
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  focus:border-[#08192D]
                "
              />

              <p className="mt-2 text-xs text-slate-500">
                /pay/{slug}
              </p>
            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                Description de la page
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows={4}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  outline-none
                  focus:border-[#08192D]
                "
              />

            </div>

          </div>

          {/* APERÇU */}

          <div className="mt-8 rounded-2xl bg-slate-50 p-6">

            <h3 className="font-bold text-[#08192D]">
              Produit sélectionné
            </h3>

            <div className="mt-4 flex gap-4">

              {selectedProduct.imageUrl && (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="
                    h-24
                    w-24
                    rounded-xl
                    object-cover
                  "
                />
              )}

              <div>

                <h4 className="font-bold">
                  {selectedProduct.name}
                </h4>

                {selectedProduct.subtitle && (
                  <p className="text-sm text-slate-500">
                    {selectedProduct.subtitle}
                  </p>
                )}

                <p className="mt-2 font-bold">
                  {selectedProduct.price.toLocaleString()}{" "}
                  {selectedProduct.currency}
                </p>

              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:justify-end">

            <Link
              href="/dashboard/payment-pages"
              className="
                rounded-xl
                border
                border-slate-200
                px-6
                py-3
                text-center
                font-semibold
                text-slate-700
                hover:bg-slate-50
              "
            >
              Annuler
            </Link>

            <button
              type="button"
              onClick={
                handleCreatePaymentPage
              }
              disabled={creating}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#08192D]
                px-8
                py-3
                font-semibold
                text-white
                hover:bg-[#102c4e]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {creating ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Création...
                </>
              ) : (
                "Créer la page de paiement"
              )}

            </button>

          </div>

        </section>
      )}

    </div>
  );
}