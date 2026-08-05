"use client";

import {
  BriefcaseBusiness,
  DollarSign,
  CalendarDays,
  Clock,
  UserRound,
  FileText,
} from "lucide-react";

import PaymentReceiverFields from "@/components/payment-pages/forms/PaymentReceiverFields";


export default function ServiceProductForm() {


  return (

    <div className="space-y-6">



      {/* NOM DU SERVICE */}

      <div>

        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Nom du service
        </label>


        <input

          type="text"

          placeholder="Ex: Création d'un site web professionnel"

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
          Description du service
        </label>



        <textarea

          rows={5}

          placeholder="Expliquez votre prestation..."

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








      {/* CATEGORIE SERVICE */}



      <div>


        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Catégorie du service
        </label>



        <div
          className="
            grid
            gap-4
            md:grid-cols-3
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

            <BriefcaseBusiness
              className="text-yellow-500"
            />

            Business


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

            <UserRound
              className="text-blue-500"
            />

            Coaching


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

            <FileText
              className="text-green-600"
            />

            Autre


          </button>



        </div>


      </div>









      {/* PRIX */}



      <div>


        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Prix du service
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

            placeholder="150"

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









      {/* DUREE SERVICE */}



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
            Durée estimée
          </label>



          <div
            className="
              relative
            "
          >


            <Clock

              className="
                absolute
                left-3
                top-3
                text-slate-400
              "

              size={20}

            />



            <input

              type="text"

              placeholder="Ex: 7 jours"

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
            Disponibilité
          </label>



          <div
            className="
              relative
            "
          >



            <CalendarDays

              className="
                absolute
                left-3
                top-3
                text-slate-400
              "

              size={20}

            />



            <input

              type="text"

              placeholder="Ex: Lun - Ven"

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








      {/* RENDEZ-VOUS */}



      <div

        className="
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          p-5
        "

      >


        <div
          className="
            flex
            items-center
            gap-3
          "
        >


          <CalendarDays
            className="text-yellow-500"
          />


          <h3
            className="
              font-bold
              text-[#08192D]
            "
          >
            Gestion des rendez-vous
          </h3>


        </div>



        <p
          className="
            mt-3
            text-sm
            text-slate-500
          "
        >

          Permettre aux clients de réserver
          un créneau après paiement.

        </p>


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

        Créer le service


      </button>





    </div>

  );

}