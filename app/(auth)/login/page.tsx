import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";
import {
  ShieldCheck,
  Smartphone,
  CreditCard,
} from "lucide-react";


export default function LoginPage() {

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
            "
          >



            {/* LOGO */}


            <Link
              href="/"
              className="
                mb-12
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
                text-yellow-300
              "
            >

              <ShieldCheck size={18}/>

              Paiements sécurisés


            </div>







            <h1
              className="
                text-5xl
                font-extrabold
                leading-tight
                text-white
              "
            >

              Gérez votre activité
              depuis une seule plateforme.


            </h1>





            <p
              className="
                mt-6
                max-w-lg
                text-lg
                leading-8
                text-slate-300
              "
            >

              Connectez-vous à votre espace PayLink
              pour suivre vos paiements,
              gérer vos clients et développer
              votre entreprise.


            </p>





            <div
              className="
                mt-10
                space-y-5
                text-white
              "
            >


              <div className="flex items-center gap-3">

                <Smartphone
                  className="text-yellow-300"
                />

                Paiements Mobile Money


              </div>




              <div className="flex items-center gap-3">

                <CreditCard
                  className="text-yellow-300"
                />

                Paiements par carte bancaire


              </div>



            </div>






            <div className="mt-12">


              <Image

                src="/heror.png"

                alt="Dashboard"

                width={620}

                height={450}

                className="drop-shadow-2xl"

                priority

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
              max-w-md
              rounded-3xl
              bg-white
              p-8
              shadow-xl
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

                Connexion


              </h2>



              <p
                className="
                  mt-3
                  text-slate-500
                "
              >

                Accédez à votre tableau de bord PayLink.


              </p>


            </div>





            <LoginForm />






            <p
              className="
                mt-8
                text-center
                text-sm
                text-slate-500
              "
            >

              Vous n'avez pas encore de compte ?


              <Link

                href="/register"

                className="
                  ml-2
                  font-bold
                  text-yellow-600
                "

              >

                Créer un compte


              </Link>


            </p>




          </div>



        </section>



      </div>



    </main>

  );
}