"use client";

import {
  SearchX,
} from "lucide-react";


interface StoreEmptyProps {

  search: string;

  category: string;

  onReset: () => void;

}



export default function StoreEmpty({

  search,

  category,

  onReset,

}: StoreEmptyProps) {


  return (

    <div className="
      mt-10
      flex
      flex-col
      items-center
      justify-center
      rounded-3xl
      bg-white
      px-6
      py-16
      text-center
      shadow-sm
    ">


      <div className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-slate-100
      ">

        <SearchX
          size={32}
          className="text-slate-400"
        />

      </div>



      <h2 className="
        mt-5
        text-xl
        font-black
        text-[#08192D]
      ">

        Aucun résultat trouvé

      </h2>



      <p className="
        mt-2
        max-w-md
        text-sm
        text-slate-500
      ">

        {search
          ? `Aucun produit ne correspond à "${search}".`
          : category !== "ALL"
          ? "Aucun produit disponible dans cette catégorie."
          : "Cette boutique ne contient encore aucun produit."
        }

      </p>




      <button

        type="button"

        onClick={onReset}

        className="
          mt-6
          rounded-xl
          bg-[#08192D]
          px-5
          py-3
          text-sm
          font-bold
          text-white
          transition
          hover:opacity-90
        "

      >

        Réinitialiser les filtres

      </button>


    </div>

  );

}