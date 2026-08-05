"use client";

import {
  Package,
  Truck,
  DollarSign,
  ImagePlus,
} from "lucide-react";

import PaymentReceiverFields from "@/components/payment-pages/forms/PaymentReceiverFields";


export default function PhysicalProductForm() {


  return (

    <div className="space-y-6">


      {/* NOM PRODUIT */}

      <div>

        <label className="
          mb-2
          block
          font-semibold
          text-slate-700
        ">
          Nom du produit
        </label>


        <input
          type="text"
          placeholder="Ex: Chaussures Nike"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-yellow-500
          "
        />

      </div>





      {/* DESCRIPTION */}

      <div>

        <label className="
          mb-2
          block
          font-semibold
          text-slate-700
        ">
          Description
        </label>


        <textarea

          placeholder="Décrivez votre produit..."

          rows={5}

          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-yellow-500
          "

        />


      </div>







      {/* IMAGE */}

      <div>

        <label className="
          mb-2
          block
          font-semibold
          text-slate-700
        ">
          Image du produit
        </label>


        <div
          className="
            flex
            cursor-pointer
            items-center
            justify-center
            gap-3
            rounded-xl
            border-2
            border-dashed
            border-slate-300
            p-8
            text-slate-500
            hover:border-yellow-400
          "
        >

          <ImagePlus size={28}/>

          Ajouter une image


        </div>


      </div>







      {/* PRIX + STOCK */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >



        <div>


          <label className="
            mb-2
            block
            font-semibold
            text-slate-700
          ">
            Prix
          </label>


          <div className="
            relative
          ">


            <DollarSign
              className="
                absolute
                left-3
                top-3
                text-slate-400
              "
              size={20}
            />


            <input

              type="number"

              placeholder="120"

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-10
                pr-4
                outline-none
                focus:border-yellow-500
              "

            />


          </div>


        </div>







        <div>


          <label className="
            mb-2
            block
            font-semibold
            text-slate-700
          ">
            Stock disponible
          </label>


          <div className="
            relative
          ">


            <Package

              className="
                absolute
                left-3
                top-3
                text-slate-400
              "

              size={20}

            />


            <input

              type="number"

              placeholder="100"

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-10
                pr-4
                outline-none
                focus:border-yellow-500
              "

            />


          </div>


        </div>



      </div>








      {/* LIVRAISON */}


      <div>


        <label className="
          mb-2
          block
          font-semibold
          text-slate-700
        ">
          Livraison
        </label>


        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-300
            p-4
          "
        >

          <Truck
            className="text-yellow-500"
          />


          <input

            type="checkbox"

            className="
              h-5
              w-5
            "

          />


          <span>
            Activer la livraison
          </span>


        </div>


      </div>

      <PaymentReceiverFields />








      {/* BOUTON */}

      <button

        type="submit"

        className="
          w-full
          rounded-xl
          bg-[#08192D]
          py-4
          font-bold
          text-white
          transition
          hover:bg-[#102c4e]
        "

      >

        Créer le produit physique


      </button>



    </div>

  );

}