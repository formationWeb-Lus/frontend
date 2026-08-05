"use client";

import {
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";


interface Props {

  title?: string;

  description?: string;

  price?: string | number;

  currency?: string;

  type?: string;

  image?: string;

}




export default function PaymentPreview({

  title = "Nom du produit",

  description = "Description du produit ou service.",

  price = "0",

  currency = "USD",

  type = "Produit numérique",

  image,

}: Props) {



  return (

    <div className="space-y-6">





      {/* TITRE */}


      <div>

        <h2
          className="
            text-2xl
            font-bold
            text-[#08192D]
          "
        >
          Aperçu de paiement
        </h2>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Voici ce que vos clients verront.
        </p>


      </div>









      {/* CARD PAIEMENT */}



      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-lg
        "
      >





        {/* IMAGE */}


        {

          image ? (

            <img

              src={image}

              alt={title}

              className="
                h-56
                w-full
                object-cover
              "

            />

          )

          :

          (

            <div
              className="
                flex
                h-56
                items-center
                justify-center
                bg-slate-100
              "
            >

              <ShoppingBag

                size={60}

                className="text-slate-400"

              />


            </div>

          )

        }









        <div
          className="
            space-y-5
            p-8
          "
        >





          {/* TYPE */}


          <span

            className="
              inline-flex
              rounded-full
              bg-yellow-100
              px-4
              py-1
              text-sm
              font-semibold
              text-yellow-700
            "

          >

            {type}

          </span>








          {/* NOM */}


          <h3

            className="
              text-3xl
              font-extrabold
              text-[#08192D]
            "

          >

            {title}


          </h3>








          {/* DESCRIPTION */}


          <p

            className="
              leading-relaxed
              text-slate-500
            "

          >

            {description}


          </p>









          {/* PRIX */}



          <div

            className="
              rounded-2xl
              bg-slate-50
              p-5
            "

          >


            <p

              className="
                text-sm
                text-slate-500
              "

            >

              Montant à payer


            </p>



            <h4

              className="
                mt-2
                text-4xl
                font-extrabold
                text-[#08192D]
              "

            >

              {price}

              <span

                className="
                  ml-2
                  text-xl
                  text-yellow-500
                "

              >

                {currency}

              </span>


            </h4>



          </div>









          {/* PAIEMENT */}



          <button

            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-[#08192D]
              py-4
              font-bold
              text-white
              transition
              hover:bg-[#102c4e]
            "

          >

            <CreditCard size={20}/>


            Payer maintenant


          </button>









          {/* SECURITE */}



          <div

            className="
              space-y-3
              border-t
              pt-5
            "

          >



            <div

              className="
                flex
                items-center
                gap-3
                text-sm
                text-slate-600
              "

            >

              <ShieldCheck

                size={18}

                className="text-green-600"

              />

              Paiement sécurisé


            </div>






            <div

              className="
                flex
                items-center
                gap-3
                text-sm
                text-slate-600
              "

            >

              <CheckCircle

                size={18}

                className="text-green-600"

              />

              Confirmation instantanée


            </div>




          </div>







        </div>




      </div>






    </div>

  );

}