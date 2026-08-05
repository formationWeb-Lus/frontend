"use client";

import {
  FileText,
  Video,
  Link,
  DollarSign,
  UploadCloud,
  LockKeyhole,
} from "lucide-react";
import PaymentReceiverFields from "@/components/payment-pages/forms/PaymentReceiverFields";


export default function DigitalProductForm() {


  return (

    <div className="space-y-6">



      {/* NOM DU PRODUIT */}

      <div>

        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Nom du produit numérique
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
          Description
        </label>


        <textarea

          rows={5}

          placeholder="Décrivez votre formation, ebook ou fichier..."

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









      {/* TYPE CONTENU */}


      <div>


        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Type de contenu
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

            <FileText
              className="text-yellow-500"
            />

            Ebook / PDF


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

            <Video
              className="text-blue-500"
            />

            Vidéo


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

            <Link
              className="text-green-600"
            />

            Lien privé


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

            placeholder="49"

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









      {/* FICHIER NUMERIQUE */}



      <div>


        <label
          className="
            mb-2
            block
            font-semibold
            text-slate-700
          "
        >
          Fichier numérique
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

          <UploadCloud size={30}/>


          Télécharger le fichier


        </div>



      </div>









      {/* ACCES APRES PAIEMENT */}



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

          <LockKeyhole
            className="text-yellow-500"
          />


          <h3
            className="
              font-bold
              text-[#08192D]
            "
          >
            Accès automatique
          </h3>


        </div>



        <p
          className="
            mt-3
            text-sm
            text-slate-500
          "
        >

          Après le paiement, le client recevra
          automatiquement l'accès au contenu.

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

        Créer le produit numérique


      </button>




    </div>

  );

}