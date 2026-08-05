
"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Smartphone,
  CreditCard,
} from "lucide-react";
import Link from "next/link";


// =====================================================
// TYPES
// =====================================================

type Currency = "USD" | "CDF";

type Telecom =
  | "AM"
  | "OM"
  | "MP"
  | "AF";


// =====================================================
// PROPS
// =====================================================

interface SubscriptionPaymentFormProps {

  plan: string;

  amount: number;

  currency: Currency;

  exchangeRate: number;

  originalPriceUSD: number;

}


// =====================================================
// API
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


// =====================================================
// NORMALISATION TELEPHONE
// =====================================================
//
// Accepte :
//
// 0994972450
// 994972450
// 243994972450
//
// Retourne :
//
// 243994972450
//
// =====================================================

function normalizePhone(
  value: string
): string {

  let cleaned =
    value.replace(
      /\D/g,
      ""
    );


  // -----------------------------------------------
  // Déjà au format international
  // -----------------------------------------------

  if (
    cleaned.startsWith("243")
  ) {

    return cleaned;

  }


  // -----------------------------------------------
  // Format local : 0XXXXXXXXX
  // -----------------------------------------------

  if (
    cleaned.startsWith("0")
  ) {

    cleaned =
      cleaned.substring(1);

  }


  // -----------------------------------------------
  // Ajouter indicatif RDC
  // -----------------------------------------------

  return `243${cleaned}`;

}


// =====================================================
// VALIDATION TELEPHONE
// =====================================================

function isValidPhone(
  phone: string
): boolean {

  return /^243\d{9}$/.test(
    phone
  );

}


// =====================================================
// COMPONENT
// =====================================================

export default function SubscriptionPaymentForm({

  plan,

  amount,

  currency,

  exchangeRate,

  originalPriceUSD,

}: SubscriptionPaymentFormProps) {


  // ===================================================
  // STATES
  // ===================================================

  const [
    phone,
    setPhone
  ] = useState("");


  const [
    telecom,
    setTelecom
  ] = useState<Telecom | "">("");


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    success,
    setSuccess
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    sessionId,
    setSessionId
  ] = useState<string | null>(
    null
  );


  const [
    transactionId,
    setTransactionId
  ] = useState<string | null>(
    null
  );


  // ===================================================
  // PRIX
  // ===================================================

  const displayAmount =
    currency === "USD"
      ? `$${amount}`
      : `${amount.toLocaleString()} FC`;


  // ===================================================
  // PAIEMENT
  // ===================================================

  async function handlePayment() {

    // -----------------------------------------------
    // RESET
    // -----------------------------------------------

    setError("");

    setSuccess(false);

    setSessionId(null);

    setTransactionId(null);


    // -----------------------------------------------
    // VERIFIER TELEPHONE
    // -----------------------------------------------

    if (!phone.trim()) {

      setError(
        "Veuillez entrer votre numéro de téléphone."
      );

      return;

    }


    // -----------------------------------------------
    // NORMALISER TELEPHONE
    // -----------------------------------------------

    const normalizedPhone =
      normalizePhone(phone);


    // -----------------------------------------------
    // VERIFIER FORMAT
    // -----------------------------------------------

    if (
      !isValidPhone(
        normalizedPhone
      )
    ) {

      setError(
        "Veuillez entrer un numéro Mobile Money valide."
      );

      return;

    }


    // -----------------------------------------------
    // VERIFIER TELECOM
    // -----------------------------------------------

    if (!telecom) {

      setError(
        "Veuillez sélectionner votre réseau Mobile Money."
      );

      return;

    }


    // -----------------------------------------------
    // RECUPERER TOKEN
    // -----------------------------------------------

    let token: string | null = null;


    try {

      token =
        localStorage.getItem(
          "token"
        );


      // ---------------------------------------------
      // Autres noms possibles
      // ---------------------------------------------

      if (!token) {

        token =
          localStorage.getItem(
            "accessToken"
          );

      }


      if (!token) {

        token =
          localStorage.getItem(
            "access_token"
          );

      }

    } catch (storageError) {

      console.error(
        "TOKEN STORAGE ERROR:",
        storageError
      );

    }


    // -----------------------------------------------
    // TOKEN OBLIGATOIRE
    // -----------------------------------------------

    if (!token) {

      setError(
        "Votre session a expiré. Veuillez vous reconnecter."
      );

      return;

    }


    // -----------------------------------------------
    // PLAN ID
    // -----------------------------------------------
    //
    // IMPORTANT :
    // La page de paiement doit recevoir le planId
    // dans l'URL.
    //
    // Exemple :
    //
    // /dashboard/subscriptions/payment?plan=1&currency=USD
    //
    // -----------------------------------------------

    let selectedPlanId: number;


    try {

      const searchParams =
        new URLSearchParams(
          window.location.search
        );


      const planIdParam =
        searchParams.get(
          "plan"
        );


      selectedPlanId =
        Number(
          planIdParam
        );


      if (
        !Number.isInteger(
          selectedPlanId
        ) ||
        selectedPlanId <= 0
      ) {

        setError(
          "Plan d'abonnement invalide."
        );

        return;

      }

    } catch (planError) {

      console.error(
        "PLAN ID ERROR:",
        planError
      );

      setError(
        "Impossible de déterminer le plan sélectionné."
      );

      return;

    }


    // -----------------------------------------------
    // DONNEES ENVOYEES AU BACKEND
    // -----------------------------------------------

    const paymentAmount =
      Number(amount);


    const payload = {

      planId:
        selectedPlanId,

      clientPhone:
        normalizedPhone,

      amount:
        paymentAmount,

      currency,

      telecom,

    };


    // =================================================
    // DEBUG FRONTEND
    // =================================================

    console.log(
      "========================================"
    );

    console.log(
      "SUBSCRIPTION PAYMENT"
    );

    console.log(
      "PHONE ORIGINAL :",
      phone
    );

    console.log(
      "PHONE NORMALISÉ :",
      normalizedPhone
    );

    console.log(
      "PLAN ID :",
      selectedPlanId
    );

    console.log(
      "AMOUNT :",
      paymentAmount
    );

    console.log(
      "CURRENCY :",
      currency
    );

    console.log(
      "TELECOM :",
      telecom
    );

    console.log(
      "TOKEN :",
      token
        ? "PRÉSENT"
        : "ABSENT"
    );

    console.log(
      "SUBSCRIPTION PAYMENT PAYLOAD:",
      payload
    );

    console.log(
      "========================================"
    );


    // -----------------------------------------------
    // LOADING
    // -----------------------------------------------

    setLoading(true);


    try {

      // ---------------------------------------------
      // APPEL BACKEND
      // ---------------------------------------------

      const response =
        await fetch(

          `${API_URL}/api/subscriptions/payment`,

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            credentials:
              "include",

            body:
              JSON.stringify(
                payload
              ),

          }

        );


      // ---------------------------------------------
      // LIRE REPONSE
      // ---------------------------------------------

      const text =
        await response.text();


      console.log(
        "SUBSCRIPTION PAYMENT HTTP STATUS:",
        response.status
      );


      console.log(
        "SUBSCRIPTION PAYMENT RAW RESPONSE:",
        text
      );


      // ---------------------------------------------
      // PARSER JSON
      // ---------------------------------------------

      let result: any = null;


      try {

        result =
          text
            ? JSON.parse(text)
            : null;

      } catch (parseError) {

        console.error(
          "Réponse paiement non JSON:",
          text
        );

        throw new Error(
          `Le serveur n'a pas renvoyé une réponse JSON valide (${response.status}).`
        );

      }


      // ---------------------------------------------
      // LOG REPONSE
      // ---------------------------------------------

      console.log(
        "SUBSCRIPTION PAYMENT RESPONSE:",
        result
      );


      // ---------------------------------------------
      // ERREUR HTTP
      // ---------------------------------------------

      if (!response.ok) {

        throw new Error(

          result?.message ||

          result?.error ||

          `Le paiement a échoué (${response.status}).`

        );

      }


      // ---------------------------------------------
      // VERIFIER REPONSE
      // ---------------------------------------------

      if (
        result?.success === false
      ) {

        throw new Error(

          result?.message ||

          "Impossible de traiter le paiement."

        );

      }


      // ---------------------------------------------
      // RECUPERER SESSION
      // ---------------------------------------------

      if (
        result?.sessionId
      ) {

        setSessionId(
          String(
            result.sessionId
          )
        );

      }


      if (
        result?.payment?.sessionId
      ) {

        setSessionId(
          String(
            result.payment.sessionId
          )
        );

      }


      // ---------------------------------------------
      // RECUPERER TRANSACTION
      // ---------------------------------------------

      if (
        result?.transactionId
      ) {

        setTransactionId(
          String(
            result.transactionId
          )
        );

      }


      if (
        result?.payment?.transactionId
      ) {

        setTransactionId(
          String(
            result.payment.transactionId
          )
        );

      }


      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      setSuccess(true);


    } catch (paymentError: any) {

      console.error(
        "SUBSCRIPTION PAYMENT ERROR:",
        paymentError
      );


      setError(

        paymentError?.message ||

        "Une erreur est survenue pendant le paiement."

      );


    } finally {

      setLoading(false);

    }

  }


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div className="
      mx-auto
      max-w-3xl
      space-y-8
    ">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="
        flex
        items-center
        gap-4
      ">

        <Link
          href="/dashboard/subscriptions"
          className="
            rounded-xl
            bg-white
            p-3
            shadow-sm
            transition
            hover:bg-slate-50
          "
        >

          <ArrowLeft
            size={20}
          />

        </Link>


        <div>

          <h1 className="
            text-3xl
            font-bold
            text-[#08192D]
          ">

            Paiement de l'abonnement

          </h1>


          <p className="
            mt-1
            text-slate-500
          ">

            Finalisez votre abonnement.

          </p>

        </div>

      </div>


      {/* =================================================
          PLAN
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
          justify-between
          gap-4
        ">

          <div>

            <p className="
              text-sm
              font-semibold
              uppercase
              text-slate-400
            ">

              Plan sélectionné

            </p>


            <h2 className="
              mt-2
              text-3xl
              font-bold
              text-[#08192D]
            ">

              {plan}

            </h2>

          </div>


          <div className="
            text-right
          ">

            <p className="
              text-3xl
              font-extrabold
              text-[#08192D]
            ">

              {displayAmount}

            </p>


            <p className="
              text-sm
              text-slate-500
            ">

              par mois

            </p>

          </div>

        </div>


        {currency === "CDF" && (

          <p className="
            mt-4
            text-sm
            text-slate-500
          ">

            Prix USD :
            ${originalPriceUSD}
            {" • "}
            Taux :
            {exchangeRate.toLocaleString()}
            {" "}
            FC/USD

          </p>

        )}

      </section>


      {/* =================================================
          PAIEMENT
      ================================================= */}

      {!success && (

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

            <Smartphone
              className="text-yellow-500"
              size={24}
            />


            <h2 className="
              text-2xl
              font-bold
              text-[#08192D]
            ">

              Mobile Money

            </h2>

          </div>


          <p className="
            mt-2
            text-slate-500
          ">

            Entrez le numéro utilisé pour effectuer
            le paiement.

          </p>


          {/* ---------------------------------------------
              TELEPHONE
          --------------------------------------------- */}

          <div className="
            mt-6
          ">

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-[#08192D]
            ">

              Numéro de téléphone

            </label>


            <input

              type="tel"

              value={phone}

              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }

              placeholder="243XXXXXXXXX"

              disabled={loading}

              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-lg
                outline-none
                transition
                focus:border-[#08192D]
                focus:ring-2
                focus:ring-[#08192D]/10
              "

            />


            <p className="
              mt-2
              text-xs
              text-slate-400
            ">

              Exemple : 243994972450

            </p>

          </div>


          {/* ---------------------------------------------
              TELECOM
          --------------------------------------------- */}

          <div className="
            mt-6
          ">

            <label className="
              mb-3
              block
              text-sm
              font-semibold
              text-[#08192D]
            ">

              Choisissez votre réseau

            </label>


            <div className="
              grid
              grid-cols-2
              gap-3
              md:grid-cols-4
            ">


              {/* AIRTEL */}

              <button

                type="button"

                onClick={() =>
                  setTelecom("AM")
                }

                disabled={loading}

                className={`
                  rounded-xl
                  border
                  px-4
                  py-4
                  font-semibold
                  transition

                  ${
                    telecom === "AM"
                      ? "border-[#08192D] bg-[#08192D] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }
                `}

              >

                Airtel Money

              </button>


              {/* ORANGE */}

              <button

                type="button"

                onClick={() =>
                  setTelecom("OM")
                }

                disabled={loading}

                className={`
                  rounded-xl
                  border
                  px-4
                  py-4
                  font-semibold
                  transition

                  ${
                    telecom === "OM"
                      ? "border-[#08192D] bg-[#08192D] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }
                `}

              >

                Orange Money

              </button>


              {/* MPESA */}

              <button

                type="button"

                onClick={() =>
                  setTelecom("MP")
                }

                disabled={loading}

                className={`
                  rounded-xl
                  border
                  px-4
                  py-4
                  font-semibold
                  transition

                  ${
                    telecom === "MP"
                      ? "border-[#08192D] bg-[#08192D] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }
                `}

              >

                M-Pesa

              </button>


              {/* AFRIMONEY */}

              <button

                type="button"

                onClick={() =>
                  setTelecom("AF")
                }

                disabled={loading}

                className={`
                  rounded-xl
                  border
                  px-4
                  py-4
                  font-semibold
                  transition

                  ${
                    telecom === "AF"
                      ? "border-[#08192D] bg-[#08192D] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }
                `}

              >

                Afrimoney

              </button>


            </div>

          </div>


          {/* ---------------------------------------------
              ERROR
          --------------------------------------------- */}

          {error && (

            <div className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              font-medium
              text-red-700
            ">

              {error}

            </div>

          )}


          {/* ---------------------------------------------
              PAYER
          --------------------------------------------- */}

          <button

            type="button"

            onClick={
              handlePayment
            }

            disabled={
              loading
            }

            className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-[#08192D]
              px-6
              py-4
              font-bold
              text-white
              transition
              hover:bg-[#102c4e]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (

              <>

                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Traitement du paiement...

              </>

            ) : (

              <>

                <CreditCard
                  size={20}
                />

                Payer maintenant

              </>

            )}

          </button>


        </section>

      )}


      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (

        <section className="
          rounded-3xl
          bg-white
          p-8
          text-center
          shadow-sm
        ">

          <CheckCircle
            size={64}
            className="
              mx-auto
              text-green-500
            "
          />


          <h2 className="
            mt-5
            text-3xl
            font-bold
            text-[#08192D]
          ">

            Paiement envoyé

          </h2>


          <p className="
            mx-auto
            mt-3
            max-w-xl
            text-slate-500
          ">

            Votre demande de paiement a été envoyée
            à SerdiPay. La transaction peut prendre
            quelques instants avant sa confirmation.

          </p>


          {sessionId && (

            <div className="
              mt-6
              rounded-xl
              bg-slate-50
              p-4
              text-left
            ">

              <p className="
                text-xs
                font-semibold
                uppercase
                text-slate-400
              ">

                Session ID

              </p>


              <p className="
                mt-1
                break-all
                font-mono
                text-sm
                text-[#08192D]
              ">

                {sessionId}

              </p>

            </div>

          )}


          {transactionId && (

            <div className="
              mt-3
              rounded-xl
              bg-slate-50
              p-4
              text-left
            ">

              <p className="
                text-xs
                font-semibold
                uppercase
                text-slate-400
              ">

                Transaction ID

              </p>


              <p className="
                mt-1
                break-all
                font-mono
                text-sm
                text-[#08192D]
              ">

                {transactionId}

              </p>

            </div>

          )}


          <Link

            href="/dashboard/subscriptions"

            className="
              mt-8
              inline-flex
              rounded-xl
              bg-[#08192D]
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#102c4e]
            "
          >

            Retour aux abonnements

          </Link>


        </section>

      )}

    </div>

  );

}
