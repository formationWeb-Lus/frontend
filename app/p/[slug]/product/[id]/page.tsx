"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
ArrowLeft,
CheckCircle2,
Loader2,
ShoppingBag,
WalletCards,
} from "lucide-react";

const API_URL =
process.env.NEXT_PUBLIC_API_URL ||
"http://localhost:5000/api";

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
}

interface ApiResponse {
success: boolean;
message?: string;
product?: Product;
}

export default function PublicProductPage() {
const params = useParams();

const slug =
typeof params?.slug === "string"
? params.slug
: "";

const id =
typeof params?.id === "string"
? params.id
: "";

const [product, setProduct] =
useState<Product | null>(null);

const [loading, setLoading] =
useState(true);

const [error, setError] =
useState<string | null>(null);

useEffect(() => {
async function loadProduct() {
try {
setLoading(true);
setError(null);


    if (!slug || !id) {
      throw new Error(
        "Produit invalide."
      );
    }

    const response = await fetch(
      `${API_URL}/public/products/${encodeURIComponent(
        slug
      )}/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
        cache: "no-store",
      }
    );

    let data: ApiResponse | null =
      null;

    try {
      data =
        (await response.json()) as ApiResponse;
    } catch {
      data = null;
    }

    console.log(
      "GET PUBLIC PRODUCT:",
      {
        status: response.status,
        data,
      }
    );

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Impossible de charger ce produit."
      );
    }

    if (!data?.success || !data.product) {
      throw new Error(
        data?.message ||
          "Produit introuvable."
      );
    }

    setProduct(data.product);
  } catch (err) {
    console.error(
      "GET PUBLIC PRODUCT ERROR:",
      err
    );

    setError(
      err instanceof Error
        ? err.message
        : "Une erreur est survenue."
    );
  } finally {
    setLoading(false);
  }
}

loadProduct();


}, [slug, id]);

if (loading) {
return ( <main className="min-h-screen bg-slate-50"> <div className="flex min-h-screen items-center justify-center"> <div className="flex items-center gap-3 text-slate-600"> <Loader2
           size={25}
           className="animate-spin"
         />


        <span className="font-medium">
          Chargement du produit...
        </span>
      </div>
    </div>
  </main>
);


}

if (error || !product) {
return ( <main className="min-h-screen bg-slate-50 px-6 py-12"> <div className="mx-auto max-w-3xl">
<Link
href={`/p/${slug}`}
className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#08192D]"
> <ArrowLeft size={18} />
Retour aux produits </Link>


      <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-xl font-bold text-red-800">
          Produit introuvable
        </h1>

        <p className="mt-2 text-sm text-red-700">
          {error ||
            "Ce produit ou service n'est plus disponible."}
        </p>
      </div>
    </div>
  </main>
);


}

return ( <main className="min-h-screen bg-slate-50"> <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">


    {/* RETOUR */}
    <Link
      href={`/p/${slug}`}
      className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#08192D]"
    >
      <ArrowLeft size={18} />
      Retour à la boutique
    </Link>

    {/* PRODUIT */}
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

      <div className="grid lg:grid-cols-2">

        {/* IMAGE */}
        <div className="flex min-h-[350px] items-center justify-center bg-slate-100 lg:min-h-[550px]">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full max-h-[550px] w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <WalletCards size={70} />
              <p className="mt-3 text-sm font-medium">
                Aucune image disponible
              </p>
            </div>
          )}

        </div>

        {/* INFORMATIONS */}
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">

          {/* TYPE */}
          <div className="mb-5 flex items-center gap-2">

            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">
              <ShoppingBag size={14} />
              {product.type}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
              <CheckCircle2 size={14} />
              Disponible
            </span>

          </div>

          {/* TITRE */}
          <h1 className="text-3xl font-bold tracking-tight text-[#08192D] sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          {/* SOUS-TITRE */}
          {product.subtitle && (
            <p className="mt-4 text-lg leading-7 text-slate-500">
              {product.subtitle}
            </p>
          )}

          {/* PRIX */}
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prix
            </p>

            <p className="mt-1 text-3xl font-bold text-[#08192D]">
              {product.price}{" "}
              {product.currency}
            </p>
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-[#08192D]">
                Description
              </h2>

              <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600">
                {product.description}
              </p>
            </div>
          )}

          {/* ACTION */}
          <div className="mt-10">

           <Link
  href={`/pay/${slug}`}
  className="flex w-full items-center justify-center rounded-2xl bg-[#08192D] px-6 py-4 text-base font-bold text-white transition hover:bg-[#102c4e]"
>
  Acheter maintenant
</Link>

            <p className="mt-3 text-center text-xs text-slate-400">
              Paiement sécurisé et traitement rapide
            </p>

          </div>

        </div>
      </div>
    </section>

    {/* FOOTER */}
    <div className="py-8 text-center">
      <Link
        href={`/p/${slug}`}
        className="text-sm font-semibold text-slate-500 hover:text-[#08192D]"
      >
        Voir tous les produits et services
      </Link>
    </div>

  </div>
</main>


);
}
