"use client";

import {
  ArrowRight,
  Megaphone,
  X,
} from "lucide-react";

interface MarketingSelectionBarProps {
  count: number;
  onContinue: () => void;
  onClear: () => void;
}

export default function MarketingSelectionBar({
  count,
  onContinue,
  onClear,
}: MarketingSelectionBarProps) {
  if (count === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-5">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-3xl bg-[#08192D] p-5 text-white shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <Megaphone size={23} />
          </div>

          <div>
            <p className="font-bold">
              {count} produit{count > 1 ? "s" : ""} sélectionné
              {count > 1 ? "s" : ""}
            </p>

            <p className="text-sm text-slate-300">
              Prêt à créer votre publicité.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            <X size={17} />
            Annuler
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#08192D] transition hover:bg-slate-100"
          >
            Choisir les canaux

            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}