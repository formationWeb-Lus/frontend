import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Smartphone,
  CreditCard,
  Zap,
} from "lucide-react";


export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* ================= PARTIE GAUCHE ================= */}


        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#08192D]
            lg:flex
          "
        >

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#08192D]
              via-[#102c4e]
              to-[#08192D]
            "
          />


          <div
            className="
              relative
              z-10
              flex
              w-full
              flex-col
              justify-center
              px-16
              py-10
            "
          >


            {/* LOGO */}


            <Link
              href="/"
              className="
                mb-10
                flex
                items-center
                gap-3
              "
            >

              <Image
                src="/logo.png"
                alt="PayLink"
                width={55}
                height={55}
              />


              <span
                className="
                  text-3xl
                  font-extrabold
                  text-white
                "
              >
                PayLink
              </span>

            </Link>



            {/* BADGE */}


            <div
              className="
                mb-6
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                bg-yellow-400/20
                px-4
                py-2
                text-sm
                font-semibold
                text-yellow-300
              "
            >

              <ShieldCheck size={18}/>

              Plateforme de paiement sécurisée

            </div>





            <h1
              className="
                text-5xl
                font-extrabold
                leading-tight
                text-white
              "
            >

              Développez votre business
              avec des paiements simples.


            </h1>





            <p
              className="
                mt-6
                max-w-xl
                text-lg
                leading-8
                text-slate-300
              "
            >

              Créez votre entreprise,
              générez des pages de paiement,
              acceptez Mobile Money et Visa,
              puis gérez toutes vos transactions
              depuis un seul tableau de bord.


            </p>





            {/* AVANTAGES */}


            <div
              className="
                mt-8
                space-y-4
                text-white
              "
            >

              <div className="flex items-center gap-3">

                <Smartphone
                  className="text-yellow-300"
                />

                Paiements Mobile Money instantanés

              </div>


              <div className="flex items-center gap-3">

                <CreditCard
                  className="text-yellow-300"
                />

                Paiements Visa et Mastercard

              </div>


              <div className="flex items-center gap-3">

                <Zap
                  className="text-yellow-300"
                />

                Tableau de bord professionnel

              </div>


            </div>






            {/* IMAGE DASHBOARD */}


            <div className="mt-12">

              <Image

                src="/heror.png"

                alt="Dashboard PayLink"

                width={620}

                height={450}

                priority

                className="
                  drop-shadow-2xl
                "

              />

            </div>



          </div>



        </section>






        {/* ================= PARTIE DROITE ================= */}



        <section
          className="
            flex
            items-center
            justify-center
            bg-white
            px-6
            py-12
          "
        >



          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              bg-white
              p-8
              shadow-xl
              shadow-slate-200/60
            "
          >



            <div
              className="
                mb-8
                text-center
              "
            >


              <h2
                className="
                  text-4xl
                  font-extrabold
                  text-[#08192D]
                "
              >

                Créer un compte


              </h2>




              <p
                className="
                  mt-3
                  text-slate-500
                "
              >

                Rejoignez PayLink gratuitement
                et commencez à recevoir vos paiements.


              </p>


            </div>





            <RegisterForm />





            <p
              className="
                mt-8
                text-center
                text-sm
                text-slate-500
              "
            >

              Vous avez déjà un compte ?


              <Link

                href="/login"

                className="
                  ml-2
                  font-bold
                  text-yellow-600
                  hover:text-yellow-500
                "

              >

                Se connecter

              </Link>


            </p>




          </div>



        </section>




      </div>


    </main>
  );
}