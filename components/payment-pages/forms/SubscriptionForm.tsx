"use client";

import {
  Repeat,
  DollarSign,
  Check,
  CalendarDays,
  Crown,
} from "lucide-react";

import PaymentReceiverFields from "@/components/payment-pages/forms/PaymentReceiverFields";


export default function SubscriptionForm() {


  return (

    <div className="space-y-6">



      {/* NOM ABONNEMENT */}

      <div>

        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Nom de l'abonnement
        </label>


        <input

          type="text"

          placeholder="Ex: Premium Business"

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

        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Description
        </label>


        <textarea

          rows={5}

          placeholder="Décrivez les avantages de cet abonnement..."

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









      {/* PRIX */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >


        <div>


          <label
            className="
              mb-2
              block
              font-semibold
              text-slate-700
            "
          >
            Prix
          </label>


          <div
            className="
              relative
            "
          >


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

              placeholder="10"

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


          <label
            className="
              mb-2
              block
              font-semibold
              text-slate-700
            "
          >
            Devise
          </label>


          <select

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

          >

            <option>
              USD - Dollar
            </option>

            <option>
              CDF - Franc Congolais
            </option>


          </select>


        </div>



      </div>









      {/* PERIODE FACTURATION */}


      <div>


        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Cycle de facturation
        </label>



        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >


          <button

            type="button"

            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-300
              p-4
              hover:border-yellow-400
            "

          >

            <CalendarDays
              className="text-yellow-500"
            />

            Mensuel


          </button>





          <button

            type="button"

            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-300
              p-4
              hover:border-yellow-400
            "

          >

            <Repeat
              className="text-green-600"
            />

            Annuel


          </button>


        </div>


      </div>









      {/* AVANTAGES */}



      <div>


        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Avantages inclus
        </label>



        <div
          className="
            space-y-3
          "
        >


          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              p-3
            "
          >

            <Check
              className="text-green-600"
            />

            <input

              type="text"

              placeholder="Ex: Produits illimités"

              className="
                flex-1
                outline-none
              "

            />


          </div>





          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              p-3
            "
          >

            <Check
              className="text-green-600"
            />

            <input

              type="text"

              placeholder="Ex: Support prioritaire"

              className="
                flex-1
                outline-none
              "

            />


          </div>


        </div>


      </div>









      {/* ESSAI GRATUIT */}



      <div

        className="
          flex
          items-center
          gap-4
          rounded-xl
          bg-slate-50
          p-5
          border
          border-slate-200
        "

      >


        <Crown
          className="text-yellow-500"
        />


        <div>


          <h3
            className="
              font-bold
              text-[#08192D]
            "
          >
            Période d'essai gratuite
          </h3>


          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Autoriser les clients à tester avant paiement.
          </p>


        </div>


        <input
          type="checkbox"
          className="ml-auto h-5 w-5"
        />


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

        Créer l'abonnement


      </button>




    </div>

  );

}