"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const registerSchema = z
  .object({

    fullName: z
      .string()
      .min(3, "Le nom complet est requis"),


    companyName: z
      .string()
      .min(2, "Le nom de l'entreprise est requis"),


    email: z
      .string()
      .email("Adresse email invalide"),


    phone: z
      .string()
      .min(9, "Numéro de téléphone invalide"),


    password: z
      .string()
      .min(
        8,
        "Le mot de passe doit contenir au moins 8 caractères"
      ),


    confirmPassword: z.string(),


    acceptTerms: z.boolean().refine(Boolean, {

      message:
        "Vous devez accepter les conditions d'utilisation",

    }),


  })

  .refine(

    (data) =>
      data.password === data.confirmPassword,

    {

      path: ["confirmPassword"],

      message:
        "Les mots de passe ne correspondent pas",

    }

  );



type RegisterFormData =
  z.infer<typeof registerSchema>;




export default function RegisterForm() {


  const router = useRouter();



  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirm, setShowConfirm] =
    useState(false);



  const [message, setMessage] =
    useState("");


  const [messageType, setMessageType] =
    useState<
      "success" | "error" | ""
    >("");




  const {

    register,

    handleSubmit,

    reset,

    formState: {
      errors,
      isSubmitting,
    },

  } = useForm<RegisterFormData>({

    resolver:
      zodResolver(registerSchema),


    defaultValues: {

      fullName: "",

      companyName: "",

      email: "",

      phone: "",

      password: "",

      confirmPassword: "",

      acceptTerms: false,

    },

  });






  async function onSubmit(
    data: RegisterFormData
  ) {


    try {


      const response =
        await fetch(
          "http://localhost:5000/api/auth/register",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },


            body: JSON.stringify({

              fullName:
                data.fullName,


              companyName:
                data.companyName,


              email:
                data.email,


              phone:
                data.phone,


              password:
                data.password,

            }),

          }

        );




      const result =
        await response.json();




      if (!response.ok) {


        setMessage(
          result.message ||
          "Une erreur est survenue."
        );


        setMessageType("error");


        return;

      }





      // Création session utilisateur

      if (result.token) {


        document.cookie =
          `token=${result.token}; path=/; max-age=1800; samesite=lax`;


      }




      setMessage(
        "Compte créé avec succès."
      );


      setMessageType(
        "success"
      );




      reset();




      setTimeout(() => {


        router.push("/dashboard");


      }, 1500);




    } catch (error) {


      console.error(error);



      setMessage(
        "Impossible de joindre le serveur."
      );



      setMessageType(
        "error"
      );


    }


  }

    return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >


      {/* NOM COMPLET */}
      <div>

        <label className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        ">

          Nom complet

        </label>


        <div className="relative">

          <User
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />


          <input
            {...register("fullName")}
            placeholder="Jean Dupont"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-slate-900
              outline-none
              transition
              focus:border-yellow-400
              focus:bg-white
              focus:ring-4
              focus:ring-yellow-100
            "
          />

        </div>


        {errors.fullName && (

          <p className="mt-1 text-sm text-red-500">

            {errors.fullName.message}

          </p>

        )}

      </div>





      {/* ENTREPRISE */}

      <div>

        <label className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        ">

          Nom de l'entreprise

        </label>


        <div className="relative">


          <Building2
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />


          <input

            {...register("companyName")}

            placeholder="Mon entreprise"

            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-slate-900
              outline-none
              transition
              focus:border-yellow-400
              focus:bg-white
              focus:ring-4
              focus:ring-yellow-100
            "

          />


        </div>



        {errors.companyName && (

          <p className="mt-1 text-sm text-red-500">

            {errors.companyName.message}

          </p>

        )}


      </div>





      {/* MESSAGE FLASH */}

      {message && (

        <div
          className={`
            rounded-xl
            p-3
            text-sm
            font-medium

            ${
              messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }
          `}
        >

          {message}

        </div>

      )}






      {/* EMAIL */}

      <div>


        <label className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        ">

          Adresse email

        </label>



        <div className="relative">


          <Mail

            size={19}

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "

          />



          <input

            type="email"

            {...register("email")}

            placeholder="contact@entreprise.com"


            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-slate-900
              outline-none
              transition
              focus:border-yellow-400
              focus:bg-white
              focus:ring-4
              focus:ring-yellow-100
            "

          />

        </div>



        {errors.email && (

          <p className="mt-1 text-sm text-red-500">

            {errors.email.message}

          </p>

        )}


      </div>





      {/* TELEPHONE */}

      <div>


        <label className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        ">

          Téléphone

        </label>



        <div className="relative">


          <Phone

            size={19}

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "

          />



          <input

            {...register("phone")}

            placeholder="+243 970 000 000"


            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-slate-900
              outline-none
              transition
              focus:border-yellow-400
              focus:bg-white
              focus:ring-4
              focus:ring-yellow-100
            "

          />


        </div>



        {errors.phone && (

          <p className="mt-1 text-sm text-red-500">

            {errors.phone.message}

          </p>

        )}


      </div>

            {/* MOT DE PASSE */}

      <div>


        <label className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        ">

          Mot de passe

        </label>




        <div className="relative">


          <Lock

            size={19}

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "

          />



          <input

            type={
              showPassword
              ? "text"
              : "password"
            }


            {...register("password")}


            placeholder="Minimum 8 caractères"



            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-12
              text-slate-900
              outline-none
              transition
              focus:border-yellow-400
              focus:bg-white
              focus:ring-4
              focus:ring-yellow-100
            "

          />



          <button

            type="button"

            onClick={() =>
              setShowPassword(!showPassword)
            }


            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-slate-700
            "

          >

            {
              showPassword

              ?

              <EyeOff size={19}/>

              :

              <Eye size={19}/>

            }


          </button>


        </div>




        {
          errors.password && (

            <p className="
              mt-1
              text-sm
              text-red-500
            ">

              {errors.password.message}

            </p>

          )
        }





        <div className="
          mt-3
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
        ">


          <ShieldCheck
            size={16}
            className="text-green-500"
          />


          Mot de passe sécurisé avec chiffrement.


        </div>


      </div>








      {/* CONFIRMATION MOT DE PASSE */}


      <div>


        <label className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        ">


          Confirmer le mot de passe


        </label>




        <div className="relative">


          <Lock

            size={19}

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "

          />



          <input


            type={
              showConfirm
              ? "text"
              : "password"
            }


            {...register("confirmPassword")}



            placeholder="Répétez votre mot de passe"



            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-12
              text-slate-900
              outline-none
              transition
              focus:border-yellow-400
              focus:bg-white
              focus:ring-4
              focus:ring-yellow-100
            "


          />





          <button


            type="button"


            onClick={() =>
              setShowConfirm(!showConfirm)
            }


            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-slate-700
            "


          >

            {
              showConfirm

              ?

              <EyeOff size={19}/>

              :

              <Eye size={19}/>

            }


          </button>


        </div>




        {
          errors.confirmPassword && (

            <p className="
              mt-1
              text-sm
              text-red-500
            ">


              {errors.confirmPassword.message}


            </p>

          )
        }


      </div>








      {/* CONDITIONS */}


      <div>


        <label className="
          flex
          items-start
          gap-3
          cursor-pointer
        ">



          <input

            type="checkbox"

            {...register("acceptTerms")}


            className="
              mt-1
              h-4
              w-4
              rounded
              border-slate-300
              text-yellow-500
              focus:ring-yellow-400
            "

          />




          <span className="
            text-sm
            leading-6
            text-slate-600
          ">


            J'accepte les{" "}


            <Link

              href="/terms"

              className="
                font-semibold
                text-yellow-600
                hover:text-yellow-500
              "

            >

              conditions d'utilisation

            </Link>


            {" "}et la politique de confidentialité.


          </span>



        </label>





        {
          errors.acceptTerms && (

            <p className="
              mt-2
              text-sm
              text-red-500
            ">


              {errors.acceptTerms.message}


            </p>


          )
        }



      </div>








      {/* BOUTON CREATION */}



      <button


        type="submit"


        disabled={isSubmitting}



        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#08192D]
          py-4
          font-bold
          text-white
          shadow-lg
          transition
          hover:bg-[#102c4e]
          hover:shadow-xl
          disabled:opacity-70
        "



      >


        {
          isSubmitting

          ?

          <Loader2
            className="
              h-5
              w-5
              animate-spin
            "
          />

          :

          <>

            Créer mon compte gratuitement


            <span className="
              transition
              group-hover:translate-x-1
            ">

              →

            </span>


          </>

        }



      </button>







      {/* SEPARATEUR */}


      <div className="
        flex
        items-center
        gap-4
        py-2
      ">


        <div className="
          h-px
          flex-1
          bg-slate-200
        " />


        <span className="
          text-xs
          text-slate-400
        ">

          OU

        </span>


        <div className="
          h-px
          flex-1
          bg-slate-200
        " />


      </div>








      {/* GOOGLE */}


      <button

        type="button"


        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          py-3
          font-semibold
          text-slate-700
          transition
          hover:bg-slate-50
        "

      >

        Continuer avec Google


      </button>








      {/* SECURITE */}


      <div className="
        rounded-xl
        bg-slate-50
        p-4
        text-center
      ">


        <p className="
          text-xs
          leading-5
          text-slate-500
        ">


          🔒 Vos informations sont protégées.
          PayLink utilise des mesures de sécurité
          modernes pour protéger vos données.


        </p>


      </div>




    </form>

  );

}