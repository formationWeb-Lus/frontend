"use client";

import {
ShoppingBag,
ArrowRight,
Loader2,
AlertCircle,
PackageOpen,
Megaphone,
CheckCircle2,
ExternalLink,
} from "lucide-react";

import Link from "next/link";
import {
useCallback,
useEffect,
useMemo,
useState,
} from "react";

// =====================================================
// TYPES
// =====================================================

interface PaymentPage {
id: number;
title: string;
slug: string;
description?: string | null;
active: boolean;
createdAt?: string;
}

interface Product {
id: number;
name: string;
subtitle?: string | null;
description?: string | null;
type: string;
price: number;
currency: string;
imageUrl?: string | null;
status: string;
createdAt?: string;

paymentPage?: PaymentPage | null;
paymentUrl?: string | null;
}

interface ApiResponse {
success?: boolean;
message?: string;
products?: Product[];
total?: number;
}

// =====================================================
// API
// =====================================================

/*

* Ton backend utilise :
*
* app.use("/api/product", productRoutes);
*
* Donc :
*
* GET    /api/product
* POST   /api/product
* GET    /api/product/:id
* PUT    /api/product/:id
* DELETE /api/product/:id
*

*/
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://paylink.coderise-solution.com/api";


// =====================================================
// API URL HELPER
// =====================================================

function getProductsUrl(): string {
  const base = API_BASE.replace(/\/+$/, "");

  // Si l'URL contient déjà /api
  if (base.endsWith("/api")) {
    return `${base}/product`;
  }

  // Sinon, ajouter /api/product
  return `${base}/api/product`;
}


export default function MarketingProductsPage() {
// ===================================================
// STATE
// ===================================================

const [products, setProducts] =
useState<Product[]>([]);

const [
selectedProductIds,
setSelectedProductIds,
] = useState<number[]>([]);

const [loading, setLoading] =
useState(true);

const [error, setError] =
useState("");

// ===================================================
// TOKEN
// ===================================================

const getToken = (): string | null => {
if (typeof window === "undefined") {
return null;
}


return (
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken")
);


};

// ===================================================
// CHARGER LES PRODUITS
// ===================================================

const loadProducts = useCallback(
async () => {
try {
setLoading(true);
setError("");


    const token = getToken();

    if (!token) {
      throw new Error(
        "Votre session a expiré. Veuillez vous reconnecter."
      );
    }

    const productsUrl =
      getProductsUrl();

    console.log(
      "========================================"
    );

    console.log(
      "GET PRODUCTS"
    );

    console.log(
      "URL :",
      productsUrl
    );

    console.log(
      "========================================"
    );

    const response =
      await fetch(
        productsUrl,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },

          cache: "no-store",
        }
      );

    // =================================================
    // LIRE LA RÉPONSE
    // =================================================

    let data: ApiResponse;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        "Le serveur a retourné une réponse invalide."
      );
    }

    console.log(
      "GET PRODUCTS RESPONSE:",
      data
    );

    // =================================================
    // 401
    // =================================================

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
        "Votre session n'est plus valide. Veuillez vous reconnecter."
      );
    }

    // =================================================
    // ERREUR HTTP
    // =================================================

    if (!response.ok) {
      throw new Error(
        data?.message ||
          `Impossible de récupérer les produits. Code HTTP : ${response.status}`
      );
    }

    // =================================================
    // VÉRIFICATION SUCCESS
    // =================================================

    if (
      data.success === false
    ) {
      throw new Error(
        data.message ||
          "Impossible de récupérer les produits."
      );
    }

    // =================================================
    // PRODUITS
    // =================================================

    const receivedProducts =
      Array.isArray(
        data.products
      )
        ? data.products
        : [];

    console.log(
      "PRODUITS REÇUS :",
      receivedProducts
    );

    // =================================================
    // FILTRAGE
    // =================================================

    /*
     * Pour le marketing, on ne conserve que les
     * produits publiés.
     *
     * Le contrôle de propriété du produit doit
     * impérativement être effectué côté backend.
     */

    const publishedProducts =
      receivedProducts.filter(
        (product) => {
          if (!product) {
            return false;
          }

          return (
            String(
              product.status
            ).toUpperCase() ===
            "PUBLISHED"
          );
        }
      );

    setProducts(
      publishedProducts
    );

    // =================================================
    // RESTAURER LA SÉLECTION
    // =================================================

    try {
      const stored =
        sessionStorage.getItem(
          "marketing_selected_products"
        );

      if (stored) {
        const storedIds =
          JSON.parse(
            stored
          );

        if (
          Array.isArray(
            storedIds
          )
        ) {
          const validIds =
            storedIds
              .map(Number)
              .filter(
                (id) =>
                  publishedProducts.some(
                    (product) =>
                      product.id ===
                      id
                  )
              );

          setSelectedProductIds(
            validIds
          );
        }
      }
    } catch (
      storageError
    ) {
      console.warn(
        "Impossible de restaurer la sélection :",
        storageError
      );
    }
  } catch (err) {
    console.error(
      "GET PRODUCTS ERROR:",
      err
    );

    setProducts([]);

    setSelectedProductIds([]);

    setError(
      err instanceof Error
        ? err.message
        : "Une erreur est survenue lors de la récupération des produits."
    );
  } finally {
    setLoading(false);
  }
},
[]


);

// ===================================================
// CHARGEMENT INITIAL
// ===================================================

useEffect(() => {
loadProducts();
}, [loadProducts]);

// ===================================================
// FORMAT PRICE
// ===================================================

const formatPrice = (
price: number,
currency: string
) => {
return `${Number(
      price || 0
    ).toLocaleString(
      "fr-FR"
    )} ${currency}`;
};

// ===================================================
// SÉLECTIONNER / DÉSÉLECTIONNER
// ===================================================

const toggleProduct = (
productId: number
) => {
setSelectedProductIds(
(current) => {
if (
current.includes(
productId
)
) {
return current.filter(
(id) =>
id !== productId
);
}


    return [
      ...current,
      productId,
    ];
  }
);


};

// ===================================================
// TOUT SÉLECTIONNER
// ===================================================

const selectAllProducts = () => {
setSelectedProductIds(
products.map(
(product) =>
product.id
)
);
};

// ===================================================
// EFFACER
// ===================================================

const clearSelection = () => {
setSelectedProductIds([]);
};

// ===================================================
// PRODUITS SÉLECTIONNÉS
// ===================================================

const selectedProducts =
useMemo(
() =>
products.filter(
(product) =>
selectedProductIds.includes(
product.id
)
),
[
products,
selectedProductIds,
]
);

// ===================================================
// CONTINUER
// ===================================================

const continueToChannels =
() => {
setError("");


  if (
    selectedProductIds.length ===
    0
  ) {
    setError(
      "Veuillez sélectionner au moins un produit."
    );

    return;
  }

  // =================================================
  // SÉCURITÉ
  // =================================================

  const validIds =
    selectedProductIds.filter(
      (id) =>
        products.some(
          (product) =>
            product.id ===
            id
        )
    );

  if (
    validIds.length ===
    0
  ) {
    setError(
      "La sélection des produits est invalide."
    );

    return;
  }

  // =================================================
  // SESSION STORAGE
  // =================================================

  sessionStorage.setItem(
    "marketing_selected_products",
    JSON.stringify(
      validIds
    )
  );

  // =================================================
  // REDIRECTION
  // =================================================

  const productsParam =
    validIds.join(",");

  window.location.href =
    `/marketing/channels?products=${encodeURIComponent(
      productsParam
    )}`;
};


// ===================================================
// LOADING
// ===================================================

if (loading) {
return ( <main className="min-h-screen bg-slate-50"> <div className="flex min-h-screen items-center justify-center px-6"> <div className="flex flex-col items-center gap-5">


        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Loader2
            size={32}
            className="animate-spin text-[#08192D]"
          />
        </div>

        <div className="text-center">
          <p className="font-semibold text-[#08192D]">
            Chargement de vos produits...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Nous récupérons vos produits.
          </p>
        </div>

      </div>
    </div>
  </main>
);


}

// ===================================================
// ERROR
// ===================================================

if (
error &&
products.length === 0
) {
return ( <main className="min-h-screen bg-slate-50">


    <section className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#08192D]"
        >
          <Megaphone
            size={17}
          />

          Marketing
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
          Impossible de charger vos produits
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          {error}
        </p>

        <button
          type="button"
          onClick={
            loadProducts
          }
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
        >
          <Loader2
            size={17}
          />

          Réessayer
        </button>

      </div>

    </section>
  </main>
);


}

// ===================================================
// PAGE
// ===================================================

return ( <main className="min-h-screen bg-slate-50">

```
  {/* =================================================
      HEADER
  ================================================= */}

  <section className="border-b bg-white">

    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-[#08192D]">
        <Megaphone
          size={17}
        />

        Marketing
      </div>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div className="max-w-3xl">

          <h1 className="text-4xl font-bold tracking-tight text-[#08192D] md:text-5xl">
            Promouvoir mes produits
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-500">
            Sélectionnez les produits et
            services que vous souhaitez
            promouvoir sur vos différents
            canaux de communication.
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 px-6 py-5">

          <p className="text-sm font-medium text-slate-500">
            Produits sélectionnés
          </p>

          <p className="mt-1 text-3xl font-bold text-[#08192D]">
            {
              selectedProductIds.length
            }
          </p>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="mt-10 flex items-center gap-3">

        <Step
          number="1"
          title="Produits"
          active
        />

        <div className="h-px flex-1 bg-slate-200" />

        <Step
          number="2"
          title="Canaux"
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
      <div className="mb-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

        <AlertCircle
          size={21}
          className="mt-0.5 shrink-0"
        />

        <p className="text-sm font-medium">
          {error}
        </p>

      </div>
    )}

    {/* =================================================
        EMPTY
    ================================================= */}

    {products.length === 0 ? (

      <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <PackageOpen
            size={40}
            className="text-slate-400"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#08192D]">
          Aucun produit publié
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          Vous devez avoir au moins un
          produit publié pour pouvoir
          créer une publicité.
        </p>

        <Link
          href="/dashboard/products"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#08192D] px-6 py-3 font-semibold text-white transition hover:bg-[#102c4e]"
        >
          Gérer mes produits

          <ArrowRight
            size={18}
          />
        </Link>

      </div>

    ) : (

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-[#08192D]">
                Mes produits publiés
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sélectionnez un ou plusieurs
                produits pour votre publicité.
              </p>

            </div>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={
                  selectAllProducts
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#08192D] transition hover:bg-slate-50"
              >
                Tout sélectionner
              </button>

              <button
                type="button"
                onClick={
                  clearSelection
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
              >
                Effacer
              </button>

            </div>

          </div>

          {/* =================================================
              GRID
          ================================================= */}

          <div className="grid gap-6 sm:grid-cols-2">

            {products.map(
              (product) => {

                const selected =
                  selectedProductIds.includes(
                    product.id
                  );

                return (
                  <div
                    key={
                      product.id
                    }
                    className={`group relative overflow-hidden rounded-3xl bg-white text-left transition duration-300 ${
                      selected
                        ? "ring-2 ring-[#08192D] shadow-xl"
                        : "ring-1 ring-slate-100 hover:-translate-y-1 hover:shadow-lg"
                    }`}
                  >

                    {/* SELECT */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleProduct(
                          product.id
                        )
                      }
                      className="absolute inset-0 z-[1]"
                      aria-label={`Sélectionner ${product.name}`}
                    />

                    {/* SELECTED */}

                    {selected && (
                      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-[#08192D] px-3 py-2 text-xs font-bold text-white shadow-lg">
                        <CheckCircle2
                          size={15}
                        />

                        Sélectionné
                      </div>
                    )}

                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden bg-slate-100">

                      {product.imageUrl ? (
                        <img
                          src={
                            product.imageUrl
                          }
                          alt={
                            product.name
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(
                            event
                          ) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag
                            size={60}
                            className="text-slate-300"
                          />
                        </div>
                      )}

                      {/* PRICE */}

                      <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#08192D] shadow-md">
                        {formatPrice(
                          product.price,
                          product.currency
                        )}
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="relative z-[2] p-6">

                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {product.type ||
                          "Produit"}
                      </span>

                      <h3 className="mt-4 text-xl font-bold text-[#08192D]">
                        {
                          product.name
                        }
                      </h3>

                      {product.subtitle && (
                        <p className="mt-2 text-sm font-medium text-slate-600">
                          {
                            product.subtitle
                          }
                        </p>
                      )}

                      {product.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                          {
                            product.description
                          }
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

                        <div>

                          <p className="text-xs text-slate-400">
                            Statut
                          </p>

                          <p className="mt-1 text-sm font-semibold text-green-600">
                            Publié
                          </p>

                        </div>

                        {product.paymentUrl && (
                          <Link
                            href={
                              product.paymentUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(
                              event
                            ) =>
                              event.stopPropagation()
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#08192D] to-[#1264A3] px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                          >
                            Voir la page

                            <ExternalLink
                              size={
                                13
                              }
                            />
                          </Link>
                        )}

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <aside className="lg:sticky lg:top-6 lg:h-fit">

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#08192D] text-white">
              <Megaphone
                size={23}
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#08192D]">
              Votre sélection
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sélectionnez les produits que
              vous souhaitez promouvoir.
            </p>

            {/* COUNT */}

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Produits sélectionnés
              </p>

              <p className="mt-1 text-3xl font-bold text-[#08192D]">
                {
                  selectedProductIds.length
                }
              </p>

            </div>

            {/* SELECTED */}

            {selectedProducts.length >
              0 && (
              <div className="mt-5 space-y-3">

                {selectedProducts.map(
                  (
                    product
                  ) => (
                    <div
                      key={
                        product.id
                      }
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
                    >

                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white">

                        {product.imageUrl ? (
                          <img
                            src={
                              product.imageUrl
                            }
                            alt={
                              product.name
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag
                              size={
                                20
                              }
                              className="text-slate-300"
                            />
                          </div>
                        )}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-[#08192D]">
                          {
                            product.name
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatPrice(
                            product.price,
                            product.currency
                          )}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

            {/* CTA */}

            <button
              type="button"
              onClick={
                continueToChannels
              }
              disabled={
                selectedProductIds.length ===
                0
              }
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-5 py-4 font-semibold text-white transition hover:bg-[#102c4e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Choisir les canaux

              <ArrowRight
                size={19}
              />
            </button>

            {selectedProductIds.length ===
              0 && (
              <p className="mt-3 text-center text-xs text-slate-400">
                Sélectionnez au moins un
                produit pour continuer.
              </p>
            )}

          </div>

        </aside>

      </div>
    )}

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
return ( <div className="flex items-center gap-2">


  <div
    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
      active ||
      completed
        ? "bg-[#08192D] text-white"
        : "bg-slate-100 text-slate-400"
    }`}
  >
    {completed ? (
      <CheckCircle2
        size={17}
      />
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
