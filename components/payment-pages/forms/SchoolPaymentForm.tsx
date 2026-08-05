"use client";

import {
  User,
  Calendar,
  Phone,
  GraduationCap,
  Users,
} from "lucide-react";

import PaymentReceiverFields from "@/components/payment-pages/forms/PaymentReceiverFields";


export default function SchoolPaymentForm() {


  return (

    <div className="space-y-6">


      <div>

        <h2 className="
          text-2xl
          font-bold
          text-[#08192D]
        ">
          Informations d'inscription scolaire
        </h2>


        <p className="
          mt-2
          text-slate-500
        ">
          Configurez les informations que l'élève devra fournir
          avant le paiement.
        </p>

      </div>





      {/* IDENTITE ELEVE */}


      <div className="
        rounded-2xl
        bg-slate-50
        p-6
        space-y-5
      ">


        <h3 className="
          flex
          items-center
          gap-2
          font-bold
          text-[#08192D]
        ">

          <User size={20}/>

          Informations de l'élève

        </h3>




        <div className="
          grid
          gap-4
          md:grid-cols-2
        ">


          <input
            placeholder="Nom"
            className="
              rounded-xl
              border
              bg-white
              px-4
              py-3
              outline-none
              focus:border-yellow-500
            "
          />



          <input
            placeholder="Post-nom"
            className="
              rounded-xl
              border
              bg-white
              px-4
              py-3
              outline-none
              focus:border-yellow-500
            "
          />



          <input
            placeholder="Prénom"
            className="
              rounded-xl
              border
              bg-white
              px-4
              py-3
              outline-none
              focus:border-yellow-500
            "
          />



          <div className="relative">


            <Calendar
              className="
                absolute
                left-3
                top-3.5
                text-slate-400
              "
              size={18}
            />


            <input
              type="date"
              className="
                w-full
                rounded-xl
                border
                bg-white
                px-10
                py-3
                outline-none
                focus:border-yellow-500
              "
            />


          </div>




        </div>






        <select
          className="
            w-full
            rounded-xl
            border
            bg-white
            px-4
            py-3
            outline-none
          "
        >

          <option>
            Sexe
          </option>

          <option>
            Masculin
          </option>

          <option>
            Féminin
          </option>


        </select>



      </div>









      {/* SCOLARITE */}



      <div className="
        rounded-2xl
        bg-slate-50
        p-6
        space-y-5
      ">


        <h3 className="
          flex
          items-center
          gap-2
          font-bold
          text-[#08192D]
        ">

          <GraduationCap size={20}/>

          Informations scolaires

        </h3>




        <select
          className="
            w-full
            rounded-xl
            border
            bg-white
            px-4
            py-3
          "
        >

          <option>
            Choisir le niveau
          </option>


          <option>
            Maternelle
          </option>


          <option>
            Primaire
          </option>


          <option>
            Secondaire
          </option>


          <option>
            Université
          </option>


        </select>






        <input
          placeholder="Classe ou promotion"
          className="
            w-full
            rounded-xl
            border
            bg-white
            px-4
            py-3
          "
        />




      </div>









      {/* PARENT */}



      <div className="
        rounded-2xl
        bg-slate-50
        p-6
        space-y-5
      ">


        <h3 className="
          flex
          items-center
          gap-2
          font-bold
          text-[#08192D]
        ">

          <Users size={20}/>

          Parent ou responsable

        </h3>





        <input
          placeholder="Nom complet du parent"
          className="
            w-full
            rounded-xl
            border
            bg-white
            px-4
            py-3
          "
        />





        <div className="relative">


          <Phone
            className="
              absolute
              left-3
              top-3.5
              text-slate-400
            "
            size={18}
          />


          <input
            placeholder="Téléphone parent (+243...)"
            className="
              w-full
              rounded-xl
              border
              bg-white
              px-10
              py-3
            "
          />



        </div>





      </div>







      {/* PAIEMENT */}



      <div className="
        rounded-2xl
        bg-slate-50
        p-6
      ">


        <h3 className="
          font-bold
          text-[#08192D]
          mb-4
        ">
          Frais d'inscription
        </h3>



        <div className="
          grid
          gap-4
          md:grid-cols-2
        ">


          <input
            type="number"
            placeholder="Montant"
            className="
              rounded-xl
              border
              bg-white
              px-4
              py-3
            "
          />



          <select
            className="
              rounded-xl
              border
              bg-white
              px-4
              py-3
            "
          >

            <option>
              USD
            </option>


            <option>
              CDF
            </option>


          </select>


        </div>



      </div>

      <PaymentReceiverFields />

      <button

type="submit"

className="
mt-8
w-full
rounded-xl
bg-[#08192D]
py-4
font-bold
text-white
hover:bg-[#102c4e]
"

>

Créer la page de d'inscription

</button>





    </div>

  );

}