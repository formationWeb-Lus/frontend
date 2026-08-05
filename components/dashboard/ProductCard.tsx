
"use client";

import {
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { useState } from "react";

import Link from "next/link";

// =====================================================
// TYPES
// =====================================================

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  type: string;
  status: string;

  // Statut réel venant de la base de données
  originalStatus: string;

  // Publication
  onPublish?: () => Promise<void>;
  onUnpublish?: () => Promise<void>;

  publishing?: boolean;
  unpublishing?: boolean;
}

// =====================================================
// COMPONENT
// =====================================================

export default function ProductCard({
  id,
  name,
  price,
  type,
  status,
  originalStatus,
  onPublish,
  onUnpublish,
  publishing = false,
  unpublishing = false,
}: ProductCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isPublished =
    originalStatus === "PUBLISHED";

  const isDisabled =
    originalStatus === "DISABLED";

  const isProcessing =
    publishing || unpublishing;

  // ===================================================
  // PUBLICATION
  // ===================================================

  async function handlePublish() {
    if (!onPublish || isProcessing) {
      return;
    }

    try {
      await onPublish();
    } catch (error) {
      console.error(
        "PUBLISH PRODUCT CARD ERROR:",
        error
      );
    }
  }

  // ===================================================
  // DÉSACTIVATION
  // ===================================================

  async function handleUnpublish() {
    if (!onUnpublish || isProcessing) {
      return;
    }

    try {
      await onUnpublish();
    } catch (error) {
      console.error(
        "UNPUBLISH PRODUCT CARD ERROR:",
        error
      );
    }
  }

  // ===================================================
  // COULEUR STATUT
  // ===================================================

  function getStatusClass() {
    switch (originalStatus) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700";

      case "DISABLED":
        return "bg-red-100 text-red-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "DRAFT":
      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          border-b
          border-slate-100
          p-6
        "
      >
        <div className="min-w-0 flex-1">

          <span
            className="
              inline-flex
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-slate-600
            "
          >
            {type}
          </span>

          <h2
            className="
              mt-4
              truncate
              text-xl
              font-bold
              text-[#08192D]
            "
          >
            {name}
          </h2>

        </div>

        {/* MENU */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-[#08192D]
            "
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                z-20
                w-48
                overflow-hidden
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-2
                shadow-xl
              "
            >

              <Link
                href={`/dashboard/products/${id}`}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-700
                  hover:bg-slate-50
                "
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                <Eye size={17} />
                Voir le produit
              </Link>

              <Link
                href={`/dashboard/products/${id}/edit`}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-700
                  hover:bg-slate-50
                "
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                <Pencil size={17} />
                Modifier
              </Link>

            </div>
          )}

        </div>

      </div>

      {/* =================================================
          BODY
      ================================================= */}

      <div className="p-6">

        {/* PRIX */}

        <div>

          <p className="text-sm text-slate-500">
            Prix
          </p>

          <p
            className="
              mt-1
              text-3xl
              font-bold
              text-[#08192D]
            "
          >
            {price}
          </p>

        </div>

        {/* STATUT */}

        <div className="mt-5">

          <span
            className={`
              inline-flex
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${getStatusClass()}
            `}
          >
            {status}
          </span>

        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-6 space-y-3">

          {/* -----------------------------------------------
              PUBLIER
          ----------------------------------------------- */}

          {!isPublished &&
            !isDisabled &&
            onPublish && (

              <button
                type="button"
                onClick={handlePublish}
                disabled={isProcessing}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-green-600
                  px-5
                  py-3.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-green-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {publishing ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Publication...
                  </>
                ) : (
                  <>
                    <ExternalLink size={19} />

                    Publier le produit
                  </>
                )}

              </button>

            )}

          {/* -----------------------------------------------
              DÉPUBLIER
          ----------------------------------------------- */}

          {isPublished &&
            onUnpublish && (

              <button
                type="button"
                onClick={handleUnpublish}
                disabled={isProcessing}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  px-5
                  py-3.5
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-100
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {unpublishing ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Désactivation...
                  </>
                ) : (
                  <>
                    <EyeOff size={19} />

                    Désactiver
                  </>
                )}

              </button>

            )}

          {/* -----------------------------------------------
              PRODUIT PUBLIÉ
          ----------------------------------------------- */}

          {isPublished && (
            <Link
              href={`/dashboard/payment-config/${id}`}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-3.5
                font-semibold
                text-[#08192D]
                transition
                hover:bg-slate-50
              "
            >
              <Eye size={19} />

               Configurer le paiement de ce produit
            </Link>
          )}

        </div>

      </div>

    </article>
  );
}

