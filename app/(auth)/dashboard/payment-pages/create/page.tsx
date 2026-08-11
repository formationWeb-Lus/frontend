"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Package,
  CheckCircle,
  MousePointerClick, // Icône ajoutée pour l'état vide
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

    // Scroll automatique vers le formulaire pour aider l'utilisateur
    setTimeout(() => {
        document.getElementById('configuration-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
  ==================================================== */

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
    <div className="mx-auto max-w-6xl space-y-8 pb-12 px-4">

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
            border border-slate-100
          "
        >
          <ArrowLeft size={20} className="text-[#08192D]" />
        </Link>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#08192D]">
            Créer une page de paiement
          </h1>

          <p className="mt-2 text-slate-500">
            Étape 1 : Sélectionnez un produit. Étape 2 : Configurez le lien.
          </p>
        </div>

      </div>

      {/* SECTION 1 : PRODUITS */}

      <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100">

        <div className="mb-6 pb-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-[#08192D]">
            1. Sélectionner un produit
          </h2>

          <p className="mt-2 text-slate-500">
            Cliquez sur le bouton "Sélectionner" du produit que vous souhaitez vendre.
          </p>
        </div>

        {products.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center bg-slate-50">

            <Package
              size={45}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-xl font-bold text-[#08192D]">
              Aucun produit disponible
            </h3>

            <p className="mt-2 text-slate-500">
              Créez d'abord un produit avant de pouvoir créer
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
                hover:bg-[#102c4e]
                transition
              "
            >
              Créer mon premier produit
            </Link>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => {

              const isSelected =
                selectedProduct?.id ===
                product.id;

              return (
                <div
                  key={product.id}
                  className={`
                    flex flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    transition
                    bg-white
                    ${
                      isSelected
                        ? "border-[#08192D] ring-2 ring-[#08192D] shadow-lg"
                        : "border-slate-100 hover:shadow-md shadow-sm"
                    }
                  `}
                >

                  {/* IMAGE */}

                  <div className="relative h-48 bg-slate-50 border-b border-slate-100">

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
                          size={40}
                          className="text-slate-300"
                        />

                      </div>

                    )}

                    {isSelected && (
                      <div className="absolute right-3 top-3 rounded-full bg-white p-1.5 shadow-md">
                        <CheckCircle
                          size={22}
                          className="text-green-600"
                        />
                      </div>
                    )}

                  </div>

                  {/* INFORMATIONS */}

                  <div className="p-5 flex-grow flex flex-col">

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="font-bold text-[#08192D] line-clamp-1">
                        {product.name}
                      </h3>

                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {product.type}
                      </span>

                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-slate-500 flex-grow">
                        {product.subtitle || product.description || "Aucune description"}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-3">
                        <div className="text-xl font-bold text-[#08192D]">
                          {product.price.toLocaleString()}{" "}
                          <span className="text-sm font-medium text-slate-500">{product.currency}</span>
                        </div>
                        
                        {/* BOUTON DE SELECTION CLAIR ET EXPLICITE */}
                        <button
                            type="button"
                            onClick={() => handleSelectProduct(product)}
                            className={`
                                rounded-lg px-4 py-2 text-sm font-semibold transition flex items-center gap-2
                                ${isSelected 
                                    ? "bg-green-100 text-green-800 border border-green-200" 
                                    : "bg-[#08192D] text-white hover:bg-[#102c4e]"
                                }
                            `}
                        >
                            {isSelected ? (
                                <> <CheckCircle size={16}/> Sélectionné </>
                            ) : (
                                "Sélectionner"
                            )}
                        </button>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>

      {/* SECTION 2 : CONFIGURATION - Toujours visible mais désactivée si pas de sélection */}

      <section 
        id="configuration-section" 
        className={`rounded-3xl bg-white p-6 md:p-8 shadow-sm border transition-all duration-300 ${selectedProduct ? 'border-slate-100 opacity-100' : 'border-slate-200 opacity-60'}`}
      >

        <div className="mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-[#08192D]">
                2. Configuration de la page
            </h2>

            <p className="mt-2 text-slate-500">
                Ces informations seront utilisées pour générer le lien public de paiement.
            </p>
        </div>

        {!selectedProduct ? (
            // État vide pour le formulaire
            <div className="flex flex-col items-center justify-center text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                <MousePointerClick size={40} className="text-slate-400 animate-pulse"/>
                <p className="mt-4 text-slate-600 font-medium">
                    Veuillez d'abord sélectionner un produit ci-dessus
                </p>
                <p className="text-sm text-slate-500">
                    Le formulaire de configuration s'activera automatiquement.
                </p>
            </div>
        ) : (
            // État actif du formulaire
            <>
                <div className="grid gap-6 md:grid-cols-2">

                    <div className="md:col-span-2 rounded-2xl bg-slate-50 p-5 border border-slate-100 flex items-center gap-4">
                         {selectedProduct.imageUrl ? (
                            <img src={selectedProduct.imageUrl} alt="" className="h-16 w-16 rounded-lg object-cover border border-slate-200" />
                         ) : (
                            <div className="h-16 w-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                <Package size={24}/>
                            </div>
                         )}
                         <div>
                            <p className="text-xs text-slate-500">Produit sélectionné</p>
                            <p className="font-bold text-[#08192D] text-lg">{selectedProduct.name}</p>
                            <p className="font-bold text-green-700">{selectedProduct.price.toLocaleString()} {selectedProduct.currency}</p>
                         </div>
                    </div>

                    <div>
                    <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                        Titre de la page (affiché au client)
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                        setTitle(e.target.value)
                        }
                        placeholder="Ex: Paiement pour Caméra Sony"
                        className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        outline-none
                        focus:border-[#08192D]
                        focus:ring-1 focus:ring-[#08192D]
                        transition
                        "
                    />
                    </div>

                    <div>
                    <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                        Lien personnalisé (Slug)
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            /pay/
                        </span>
                        <input
                            value={slug}
                            onChange={(e) =>
                            setSlug(
                                generateSlug(
                                e.target.value
                                )
                            )
                            }
                            placeholder="camera-sony-123"
                            className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            pl-14
                            outline-none
                            focus:border-[#08192D]
                            focus:ring-1 focus:ring-[#08192D]
                            transition
                            "
                        />
                    </div>
                    </div>

                    <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-[#08192D]">
                        Description affichée sur la page (optionnel)
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                        }
                        rows={4}
                        placeholder="Informations complémentaires pour le client..."
                        className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        outline-none
                        focus:border-[#08192D]
                        focus:ring-1 focus:ring-[#08192D]
                        transition
                        "
                    />

                    </div>

                </div>

                {/* ACTIONS */}

                <div className="mt-10 flex flex-col-reverse gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:justify-end">

                    <Link
                    href="/dashboard/payment-pages"
                    className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-6
                        py-3
                        text-center
                        font-semibold
                        text-slate-700
                        hover:bg-slate-50
                        transition
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
                        transition
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        shadow-md
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
            </>
        )}

      </section>

    </div>
  );
}