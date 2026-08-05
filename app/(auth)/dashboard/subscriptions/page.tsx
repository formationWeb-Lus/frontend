
"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Crown,
  CreditCard,
  Zap,
  Loader2,
} from "lucide-react";
import Link from "next/link";


// =====================================================
// TYPES
// =====================================================

type Currency = "USD" | "CDF";

interface Plan {
  id: number;
  name: string;
  description: string | null;
  priceUSD: number;
  priceCDF: number;
  maxProducts: number | null;
  features: string[] | null;
}

interface Subscription {
  id: number;
  status: string;
  startDate: string | null;
  endDate: string | null;
  autoRenew: boolean;
  plan: Plan;
}


// =====================================================
// CONFIGURATION
// =====================================================

const API_URL = "http://localhost:5000";


// =====================================================
// PAGE
// =====================================================

export default function SubscriptionPage() {

  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [plans, setPlans] =
    useState<Plan[]>([]);

  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  // ===================================================
  // CHARGER LES DONNÉES
  // ===================================================

  useEffect(() => {

    async function loadSubscriptionData() {

      try {

        setLoading(true);
        setError(null);


        const token =
          localStorage.getItem("token");


        if (!token) {

          setError(
            "Votre session a expiré. Veuillez vous reconnecter."
          );

          return;

        }


        // ===============================================
        // RÉCUPÉRER LES PLANS
        // ===============================================

        const plansResponse =
          await fetch(
            `${API_URL}/api/subscriptions/plans`,
            {
              method: "GET",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              cache: "no-store",
            }
          );


        const plansContentType =
          plansResponse.headers.get(
            "content-type"
          );


        if (
          !plansContentType?.includes(
            "application/json"
          )
        ) {

          const text =
            await plansResponse.text();

          console.error(
            "Réponse non JSON pour /plans:",
            text
          );

          throw new Error(
            "Le serveur n'a pas renvoyé une réponse JSON pour les plans."
          );

        }


        const plansResult =
          await plansResponse.json();


        if (!plansResponse.ok) {

          throw new Error(
            plansResult.message ||
            "Impossible de récupérer les plans."
          );

        }


        setPlans(
          plansResult.plans || []
        );


        // ===============================================
        // RÉCUPÉRER MON ABONNEMENT
        // ===============================================

        const subscriptionResponse =
          await fetch(
            `${API_URL}/api/subscriptions/my`,
            {
              method: "GET",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              cache: "no-store",
            }
          );


        const subscriptionContentType =
          subscriptionResponse.headers.get(
            "content-type"
          );


        if (
          !subscriptionContentType?.includes(
            "application/json"
          )
        ) {

          const text =
            await subscriptionResponse.text();

          console.error(
            "Réponse non JSON pour /my:",
            text
          );

          throw new Error(
            "Le serveur n'a pas renvoyé une réponse JSON pour l'abonnement."
          );

        }


        const subscriptionResult =
          await subscriptionResponse.json();


        if (!subscriptionResponse.ok) {

          throw new Error(
            subscriptionResult.message ||
            "Impossible de récupérer votre abonnement."
          );

        }


        setSubscription(
          subscriptionResult.subscription ||
          null
        );


      } catch (error) {

        console.error(
          "SUBSCRIPTION PAGE ERROR:",
          error
        );


        setError(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue."
        );


      } finally {

        setLoading(false);

      }

    }


    loadSubscriptionData();

  }, []);


  // ===================================================
  // FORMAT PRIX
  // ===================================================

  function formatPrice(plan: Plan) {

    if (currency === "USD") {

      return `$${plan.priceUSD}`;

    }


    return `${plan.priceCDF.toLocaleString()} FC`;

  }


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (

      <div className="
        flex
        min-h-[400px]
        items-center
        justify-center
      ">

        <div className="
          flex
          items-center
          gap-3
          text-slate-500
        ">

          <Loader2
            size={24}
            className="animate-spin"
          />

          Chargement des abonnements...

        </div>

      </div>

    );

  }


  // ===================================================
  // ERREUR
  // ===================================================

  if (error) {

    return (

      <div className="
        rounded-3xl
        border
        border-red-200
        bg-red-50
        p-8
      ">

        <h2 className="
          text-xl
          font-bold
          text-red-700
        ">

          Impossible de charger les abonnements

        </h2>


        <p className="
          mt-3
          text-red-600
        ">

          {error}

        </p>


        <button
          onClick={() =>
            window.location.reload()
          }
          className="
            mt-6
            rounded-xl
            bg-[#08192D]
            px-5
            py-3
            font-semibold
            text-white
          "
        >

          Réessayer

        </button>

      </div>

    );

  }


  // ===================================================
  // PAGE
  // ===================================================

  return (

    <div className="space-y-8">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="
        flex
        flex-col
        gap-5
        md:flex-row
        md:items-center
        md:justify-between
      ">

        <div>

          <h1 className="
            text-4xl
            font-bold
            text-[#08192D]
          ">

            Choisir un abonnement

          </h1>


          <p className="
            mt-2
            text-slate-500
          ">

            Sélectionnez le plan adapté à votre activité.

          </p>

        </div>


        {/* DEVISE */}

        <div className="
          flex
          rounded-xl
          bg-white
          p-1
          shadow-sm
        ">

          <button
            type="button"
            onClick={() =>
              setCurrency("USD")
            }
            className={`
              rounded-lg
              px-5
              py-2
              font-semibold
              transition

              ${
                currency === "USD"
                  ? "bg-[#08192D] text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            `}
          >

            USD $

          </button>


          <button
            type="button"
            onClick={() =>
              setCurrency("CDF")
            }
            className={`
              rounded-lg
              px-5
              py-2
              font-semibold
              transition

              ${
                currency === "CDF"
                  ? "bg-[#08192D] text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            `}
          >

            CDF FC

          </button>

        </div>

      </div>


      {/* =================================================
          ABONNEMENT ACTUEL
      ================================================= */}

      <section className="
        rounded-3xl
        bg-[#08192D]
        p-8
        text-white
      ">

        <div className="
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-center
          md:justify-between
        ">

          <div>

            <div className="
              flex
              items-center
              gap-3
            ">

              <Crown
                className="text-yellow-400"
                size={30}
              />


              <h2 className="
                text-2xl
                font-bold
              ">

                {subscription
                  ? subscription.plan.name
                  : "Aucun abonnement actif"}

              </h2>

            </div>


            <p className="
              mt-3
              text-slate-300
            ">

              {subscription
                ? `Statut : ${subscription.status}`
                : "Choisissez un abonnement pour débloquer toutes les fonctionnalités."}

            </p>

          </div>


          {subscription && (

            <div className="
              rounded-full
              bg-white/10
              px-5
              py-2
              text-sm
              font-semibold
            ">

              {subscription.status}

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          PLANS
      ================================================= */}

      {plans.length === 0 ? (

        <section className="
          rounded-3xl
          bg-white
          p-10
          text-center
          shadow-sm
        ">

          <h2 className="
            text-xl
            font-bold
            text-[#08192D]
          ">

            Aucun plan disponible

          </h2>


          <p className="
            mt-2
            text-slate-500
          ">

            Les plans d'abonnement seront bientôt disponibles.

          </p>

        </section>

      ) : (

        <section className="
          grid
          gap-6
          lg:grid-cols-3
        ">

          {plans.map((plan, index) => (

            <div
              key={plan.id}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              {/* PLAN POPULAIRE */}

              {index === 1 && (

                <span className="
                  inline-block
                  rounded-full
                  bg-yellow-400
                  px-4
                  py-1
                  text-sm
                  font-bold
                  text-[#08192D]
                ">

                  Le plus choisi

                </span>

              )}


              <h3 className="
                mt-5
                text-2xl
                font-bold
                text-[#08192D]
              ">

                {plan.name}

              </h3>


              <p className="
                mt-2
                min-h-[48px]
                text-slate-500
              ">

                {plan.description ||
                  "Plan adapté à votre activité."}

              </p>


              {/* PRIX */}

              <div className="mt-6">

                <span className="
                  text-4xl
                  font-extrabold
                  text-[#08192D]
                ">

                  {formatPrice(plan)}

                </span>


                <span className="
                  ml-1
                  text-slate-500
                ">

                  /mois

                </span>

              </div>


              {/* LIMITE PRODUITS */}

              {plan.maxProducts !== null && (

                <p className="
                  mt-3
                  text-sm
                  font-medium
                  text-slate-500
                ">

                  Jusqu'à {plan.maxProducts} produits

                </p>

              )}


              {/* FEATURES */}

              <ul className="
                mt-8
                space-y-4
              ">

                {(plan.features || []).map(
                  (feature, featureIndex) => (

                    <li
                      key={`${plan.id}-${featureIndex}`}
                      className="
                        flex
                        items-start
                        gap-3
                        text-slate-600
                      "
                    >

                      <Check
                        size={18}
                        className="
                          mt-0.5
                          shrink-0
                          text-green-600
                        "
                      />

                      {feature}

                    </li>

                  )
                )}

              </ul>


              {/* BOUTON */}

              <Link
                href={`/dashboard/subscriptions/payment?plan=${plan.id}&currency=${currency}`}
                className={`
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  py-3
                  font-bold
                  transition

                  ${
                    index === 1
                      ? "bg-[#08192D] text-white hover:bg-[#102c4e]"
                      : "bg-yellow-400 text-[#08192D] hover:bg-yellow-300"
                  }
                `}
              >

                <Zap size={18} />

                S'abonner maintenant

              </Link>

            </div>

          ))}

        </section>

      )}


      {/* =================================================
          MOYENS DE PAIEMENT
      ================================================= */}

      <section className="
        rounded-3xl
        bg-white
        p-8
        shadow-sm
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <CreditCard
            className="text-yellow-500"
          />

          <h2 className="
            text-2xl
            font-bold
            text-[#08192D]
          ">

            Moyens de paiement

          </h2>

        </div>


        <p className="
          mt-3
          text-slate-500
        ">

          Vous pourrez payer votre abonnement
          avec Mobile Money ou Visa.

        </p>

      </section>

    </div>

  );

}

