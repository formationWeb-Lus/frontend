import {
  Check,
  CreditCard,
  Crown,
  Smartphone,
} from "lucide-react";

import Link from "next/link";


const plans = {
  starter: {
    name: "Starter",
    price: "5 USD",
    description: "Pour les entrepreneurs qui commencent.",
    features: [
      "5 produits maximum",
      "Pages de paiement simples",
      "Suivi des transactions",
      "Support standard",
    ],
  },

  business: {
    name: "Business",
    price: "10 USD",
    description: "Pour les entreprises en croissance.",
    features: [
      "Produits illimités",
      "Pages de paiement avancées",
      "Statistiques complètes",
      "API paiement",
      "Support prioritaire",
    ],
  },

  premium: {
    name: "Premium",
    price: "25 USD",
    description: "Pour les grandes entreprises.",
    features: [
      "Toutes les fonctionnalités",
      "Multi-utilisateurs",
      "API avancée",
      "Webhooks",
      "Support VIP",
    ],
  },
};



interface Props {
  searchParams: Promise<{
    plan?: string;
  }>;
}



export default async function CreateSubscriptionPage({
  searchParams,
}: Props) {


  const params = await searchParams;


  const selectedPlan =
    plans[
      params.plan as keyof typeof plans
    ] || plans.business;



  return (

    <div className="space-y-8">


      {/* HEADER */}

      <div>

        <h1
          className="
          text-4xl
          font-bold
          text-[#08192D]
          "
        >
          Finaliser votre abonnement
        </h1>


        <p
          className="
          mt-2
          text-slate-500
          "
        >
          Choisissez votre moyen de paiement pour activer votre compte.
        </p>


      </div>





      <div
        className="
        grid
        gap-8
        lg:grid-cols-3
        "
      >




        {/* RESUME PLAN */}


        <section
          className="
          rounded-3xl
          bg-[#08192D]
          p-8
          text-white
          lg:col-span-1
          "
        >


          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <Crown
              className="text-yellow-400"
            />


            <h2
              className="
              text-2xl
              font-bold
              "
            >
              {selectedPlan.name}
            </h2>


          </div>



          <h3
            className="
            mt-6
            text-4xl
            font-extrabold
            "
          >
            {selectedPlan.price}

            <span
              className="
              text-sm
              text-slate-300
              "
            >
              /mois
            </span>

          </h3>



          <p
            className="
            mt-3
            text-slate-300
            "
          >
            {selectedPlan.description}
          </p>




          <ul
            className="
            mt-8
            space-y-4
            "
          >

            {
              selectedPlan.features.map((feature)=>(

                <li
                  key={feature}
                  className="
                  flex
                  gap-3
                  items-center
                  "
                >

                  <Check
                    size={18}
                    className="text-green-400"
                  />

                  {feature}

                </li>

              ))
            }

          </ul>


        </section>







        {/* PAIEMENT */}



        <section
          className="
          rounded-3xl
          bg-white
          p-8
          shadow-sm
          lg:col-span-2
          "
        >



          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <CreditCard
              className="text-yellow-500"
            />


            <h2
              className="
              text-2xl
              font-bold
              text-[#08192D]
              "
            >
              Moyen de paiement
            </h2>


          </div>





          <div
            className="
            mt-8
            grid
            gap-4
            md:grid-cols-2
            "
          >


            <button
              className="
              rounded-2xl
              border
              border-slate-200
              p-5
              text-left
              hover:border-yellow-400
              "
            >

              <Smartphone
                className="text-orange-500"
              />

              <h3
                className="
                mt-3
                font-bold
                "
              >
                Orange Money
              </h3>

              <p
                className="
                text-sm
                text-slate-500
                "
              >
                Paiement Mobile Money
              </p>

            </button>





            <button
              className="
              rounded-2xl
              border
              border-slate-200
              p-5
              text-left
              hover:border-yellow-400
              "
            >

              <Smartphone
                className="text-red-500"
              />

              <h3
                className="
                mt-3
                font-bold
                "
              >
                Airtel Money
              </h3>

            </button>





            <button
              className="
              rounded-2xl
              border
              border-slate-200
              p-5
              text-left
              hover:border-yellow-400
              "
            >

              <Smartphone
                className="text-blue-500"
              />

              <h3
                className="
                mt-3
                font-bold
                "
              >
                M-Pesa
              </h3>

            </button>





            <button
              className="
              rounded-2xl
              border
              border-slate-200
              p-5
              text-left
              hover:border-yellow-400
              "
            >

              <CreditCard
                className="text-slate-700"
              />

              <h3
                className="
                mt-3
                font-bold
                "
              >
                Visa
              </h3>


            </button>



          </div>






          <div
            className="
            mt-8
            "
          >

            <label
              className="
              font-semibold
              text-slate-700
              "
            >
              Numéro de téléphone
            </label>


            <input
              placeholder="+243 970 000 000"
              className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-yellow-400
              "
            />


          </div>






          <button
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
            Payer {selectedPlan.price}
          </button>




          <Link
            href="/dashboard/subscriptions"
            className="
            mt-4
            block
            text-center
            text-sm
            text-slate-500
            "
          >
            Retour aux abonnements
          </Link>



        </section>


      </div>


    </div>

  );
}