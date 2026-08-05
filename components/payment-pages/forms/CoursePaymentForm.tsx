"use client";

import {
  BookOpen,
  Clock,
  GraduationCap,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import PaymentReceiverFields from "@/components/payment-pages/forms/PaymentReceiverFields";


export default function CoursePaymentForm() {


  return (

    <div className="space-y-6">





      {/* TITRE FORMATION */}


      <div>

        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Nom de la formation
        </label>


        <input

          type="text"

          placeholder="Ex: Formation complète Next.js"

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
          Description de la formation
        </label>


        <textarea

          rows={5}

          placeholder="Expliquez ce que l'étudiant va apprendre..."

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









      {/* INFORMATIONS COURS */}



      <div
        className="
          grid
          gap-5
          md:grid-cols-3
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
            Niveau
          </label>


          <select

            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
            "

          >

            <option>
              Débutant
            </option>

            <option>
              Intermédiaire
            </option>

            <option>
              Avancé
            </option>


          </select>


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
            Durée
          </label>


          <div className="relative">


            <Clock

              size={20}

              className="
                absolute
                left-3
                top-3
                text-slate-400
              "

            />


            <input

              type="text"

              placeholder="20 heures"

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-10
                pr-4
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
            Modules
          </label>


          <input

            type="number"

            placeholder="12"

            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
            "

          />


        </div>


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
            Prix de la formation
          </label>


          <div className="relative">


            <DollarSign

              size={20}

              className="
                absolute
                left-3
                top-3
                text-slate-400
              "

            />


            <input

              type="number"

              placeholder="49"

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-10
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









      {/* OPTIONS FORMATION */}



      <div
        className="
          rounded-2xl
          bg-slate-50
          p-6
        "
      >


        <h3
          className="
            mb-4
            flex
            items-center
            gap-2
            font-bold
            text-[#08192D]
          "
        >

          <GraduationCap
            className="text-yellow-500"
          />

          Options de formation

        </h3>





        <div
          className="
            space-y-4
          "
        >


          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input
              type="checkbox"
            />

            Accès immédiat après paiement


          </label>





          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input
              type="checkbox"
            />

            Certificat de réussite


          </label>






          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input
              type="checkbox"
            />

            Ajouter un espace étudiant


          </label>



        </div>


      </div>









      {/* APERCU */}



      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-green-200
          bg-green-50
          p-4
        "
      >

        <BookOpen
          className="text-green-600"
        />


        <p
          className="
            text-sm
            text-green-700
          "
        >
          Après paiement, l'étudiant pourra accéder automatiquement à la formation.
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
          hover:bg-[#102c4e]
        "

      >

        Créer la formation


      </button>





    </div>

  );

}