"use client";

import { useEffect, useMemo, useState } from "react";
import StoreHeader from "@/components/store/StoreHeader";
import StoreFilters from "@/components/store/StoreFilters";
import ProductCard from "@/components/store/ProductCard";
import StoreEmpty from "@/components/store/StoreEmpty";
import StoreFooter from "@/components/store/StoreFooter";

/* ======================================================
   TYPES
====================================================== */

export interface Product {
  id: number;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  type: string;
  price: number;
  currency: string;
  imageUrl?: string | null;
  status: string;
  createdAt: string;
  paymentPageProducts?: {
    paymentPage: {
      slug: string;
    };
  }[];
}

/* ======================================================
   CONFIGURATION & CATÉGORIES
====================================================== */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://paylink.coderise-solution.com/api";

const categories = [
  { label: "Tous", value: "ALL" },
  { label: "Formations", value: "COURSE" },
  { label: "Services", value: "SERVICE" },
  { label: "Produits", value: "PHYSICAL" },
  { label: "Abonnements", value: "SUBSCRIPTION" },
];

/* ======================================================
   PAGE COMPONENT
====================================================== */

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("new");

  /* ====================================================
     CHARGEMENT DES PRODUITS
  ==================================================== */

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        const response = await fetch(`${API_URL}/my-store`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Impossible de charger la boutique."
          );
        }

        if (data.success) {
          setProducts(Array.isArray(data.products) ? data.products : []);
        }
      } catch (error) {
        console.error("STORE LOAD ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* ====================================================
     FILTRAGE + RECHERCHE + TRI
  ==================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Recherche
    if (search.trim()) {
      const searchValue = search.trim().toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue) ||
          product.subtitle?.toLowerCase().includes(searchValue) ||
          product.description?.toLowerCase().includes(searchValue)
      );
    }

    // Catégorie
    if (category !== "ALL") {
      result = result.filter((product) => product.type === category);
    }

    // Tri
    if (sort === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "new") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [products, search, category, sort]);

  /* ====================================================
     CHARGEMENT (SKELETON)
  ==================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <StoreHeader search={search} onSearchChange={setSearch} />

        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-72 rounded-xl bg-slate-200" />
            <div className="h-16 w-full rounded-2xl bg-slate-200" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
              <div className="h-[480px] rounded-3xl bg-slate-200" />
              <div className="h-[480px] rounded-3xl bg-slate-200" />
              <div className="h-[480px] rounded-3xl bg-slate-200" />
              <div className="h-[480px] rounded-3xl bg-slate-200" />
            </div>
          </div>
        </div>

        <StoreFooter />
      </main>
    );
  }

  /* ====================================================
     RENDU PRINCIPAL
  ==================================================== */

  return (
    <main className="min-h-screen bg-slate-50">
      <StoreHeader search={search} onSearchChange={setSearch} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <StoreFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
        />

        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#08192D] sm:text-3xl">
              Produits et services
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Découvrez les offres disponibles.
            </p>
          </div>

          <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm sm:block">
            {filteredProducts.length} résultat
            {filteredProducts.length > 1 ? "s" : ""}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <StoreEmpty
            search={search}
            category={category}
            onReset={() => {
              setSearch("");
              setCategory("ALL");
              setSort("new");
            }}
          />
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <StoreFooter />
    </main>
  );
}