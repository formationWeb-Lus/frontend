"use client";

import {
  Check,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Wrench,
  Package,
} from "lucide-react";

interface StoreFiltersProps {
  // Recherche
  search?: string;

  setSearch?: (
    value: string
  ) => void;

  // Catégorie
  category?: string;

  onCategoryChange?: (
    value: string
  ) => void;

  // Compatibilité ancienne page
  setCategory?: (
    value: string
  ) => void;

  // Tri
  sort?: string;

  onSortChange?: (
    value: string
  ) => void;

  // Compatibilité ancienne page
  setSort?: (
    value: string
  ) => void;

  // Nombre de résultats
  resultCount?: number;

  // Catégories dynamiques
  categories?: {
    label: string;
    value: string;
  }[];
}


/**
 * Catégories par défaut
 * utilisées si aucune catégorie n'est envoyée
 */
const defaultCategories = [
  {
    label: "Tous",
    value: "ALL",
    icon: Sparkles,
  },
  {
    label: "Formations",
    value: "COURSE",
    icon: GraduationCap,
  },
  {
    label: "Services",
    value: "SERVICE",
    icon: Wrench,
  },
  {
    label: "Produits",
    value: "PHYSICAL",
    icon: Package,
  },
];


export default function StoreFilters({
  search = "",
  setSearch,

  category = "ALL",
  onCategoryChange,
  setCategory,

  sort = "NEWEST",
  onSortChange,
  setSort,

  resultCount = 0,

  categories,

}: StoreFiltersProps) {


  /**
   * ==================================================
   * CHANGEMENT CATÉGORIE
   * ==================================================
   */
  function handleCategoryChange(
    value: string
  ) {

    if (
      typeof onCategoryChange === "function"
    ) {
      onCategoryChange(value);
      return;
    }


    if (
      typeof setCategory === "function"
    ) {
      setCategory(value);
    }

  }



  /**
   * ==================================================
   * CHANGEMENT TRI
   * ==================================================
   */
  function handleSortChange(
    value: string
  ) {

    if (
      typeof onSortChange === "function"
    ) {
      onSortChange(value);
      return;
    }


    if (
      typeof setSort === "function"
    ) {
      setSort(value);
    }

  }



  const categoryList =
    categories?.map((item) => ({
      ...item,
      icon:
        item.value === "ALL"
          ? Sparkles
          : item.value === "COURSE"
          ? GraduationCap
          : item.value === "SERVICE"
          ? Wrench
          : Package,
    })) ??
    defaultCategories;



  return (

    <section className="rounded-2xl bg-white p-5 shadow-sm">


      {/* ============================================
          RECHERCHE
      ============================================ */}

      <div>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch?.(
              e.target.value
            )
          }
          placeholder="Rechercher un produit ou service..."
          className="
            w-full rounded-xl
            border border-slate-200
            px-4 py-3
            text-sm
            outline-none
            transition
            focus:border-[#08192D]
            focus:ring-4
            focus:ring-[#08192D]/10
          "
        />

      </div>



      {/* ============================================
          FILTRES CATÉGORIES
      ============================================ */}

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">


        {categoryList.map(
          (item) => {

            const Icon =
              item.icon;


            const active =
              category === item.value;



            return (

              <button

                key={item.value}

                type="button"

                onClick={() =>
                  handleCategoryChange(
                    item.value
                  )
                }


                className={`
                  flex shrink-0 items-center gap-2
                  rounded-xl px-4 py-2.5
                  text-sm font-semibold
                  transition

                  ${
                    active
                      ? "bg-[#08192D] text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }
                `}

              >

                <Icon size={16} />


                <span>
                  {item.label}
                </span>


                {active && (
                  <Check
                    size={14}
                  />
                )}


              </button>

            );

          }

        )}

      </div>




      {/* ============================================
          BAS DE LA BARRE
      ============================================ */}

      <div className="
        mt-5 flex flex-col gap-3
        border-t border-slate-100
        pt-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">



        {/* RESULTATS */}

        <p className="
          text-sm
          font-medium
          text-slate-500
        ">

          <span className="
            font-bold
            text-[#08192D]
          ">
            {resultCount}
          </span>

          {" "}

          résultat
          {
            resultCount !== 1
              ? "s"
              : ""
          }

        </p>





        {/* TRI */}

        <div className="relative">


          <select

            value={sort}

            onChange={(event) =>
              handleSortChange(
                event.target.value
              )
            }


            className="
              w-full appearance-none
              rounded-xl
              border border-slate-200
              bg-white
              py-2.5
              pl-4
              pr-10
              text-sm
              font-semibold
              text-slate-700
              outline-none
              transition

              focus:border-[#08192D]
              focus:ring-4
              focus:ring-[#08192D]/10

              sm:w-auto
            "

          >

            <option value="NEWEST">
              Plus récents
            </option>


            <option value="PRICE_ASC">
              Prix croissant
            </option>


            <option value="PRICE_DESC">
              Prix décroissant
            </option>


          </select>



          <ChevronDown

            size={16}

            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "

          />


        </div>


      </div>


    </section>

  );

}