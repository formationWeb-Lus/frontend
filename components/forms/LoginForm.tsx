
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setMessage("");
      setMessageType("");

      // =====================================================
      // API URL
      // =====================================================

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://paylink.coderise-solution.com/api";

      const loginUrl = `${API_URL.replace(/\/+$/, "")}/auth/login`;

      console.log("====================================");
      console.log("LOGIN");
      console.log("API_URL :", API_URL);
      console.log("LOGIN URL :", loginUrl);
      console.log("EMAIL :", data.email);
      console.log("====================================");

      // =====================================================
      // REQUÊTE LOGIN
      // =====================================================

      const response = await fetch(loginUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      // =====================================================
      // LECTURE DE LA RÉPONSE
      // =====================================================

      let result: any = {};

      const contentType =
        response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "Réponse serveur non JSON :",
          text
        );

        result = {
          message:
            text ||
            "Réponse invalide du serveur.",
        };
      }

      console.log(
        "HTTP STATUS :",
        response.status
      );

      console.log(
        "LOGIN RESPONSE :",
        result
      );

      // =====================================================
      // ERREUR HTTP
      // =====================================================

      if (!response.ok) {
        setMessage(
          result?.message ||
            result?.error ||
            result?.data?.message ||
            `Erreur serveur (${response.status}).`
        );

        setMessageType("error");

        return;
      }

      // =====================================================
      // VALIDATION DE LA RÉPONSE
      // =====================================================

      if (!result?.success) {
        setMessage(
          result?.message ||
            "Connexion impossible."
        );

        setMessageType("error");

        return;
      }

      if (!result?.token) {
        console.error(
          "Token absent de la réponse :",
          result
        );

        setMessage(
          "Le serveur n'a pas retourné de token."
        );

        setMessageType("error");

        return;
      }

      // =====================================================
      // SAUVEGARDE DU TOKEN
      // =====================================================

      localStorage.setItem(
        "token",
        result.token
      );

      // =====================================================
      // SAUVEGARDE DE L'UTILISATEUR
      // =====================================================

      if (result.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(result.user)
        );
      }

      // =====================================================
      // COOKIE
      // =====================================================

      document.cookie =
        `token=${encodeURIComponent(result.token)}; ` +
        `path=/; ` +
        `max-age=604800; ` +
        `SameSite=Lax`;

      console.log(
        "TOKEN ENREGISTRÉ :",
        localStorage.getItem("token")
      );

      // =====================================================
      // SUCCÈS
      // =====================================================

      setMessage("Connexion réussie.");
      setMessageType("success");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);

    } catch (error) {
      console.error(
        "===================================="
      );

      console.error(
        "LOGIN ERROR :",
        error
      );

      console.error(
        "===================================="
      );

      setMessage(
        "Impossible de contacter le serveur. Vérifiez la connexion à l'API."
      );

      setMessageType("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* =====================================================
          MESSAGE
      ===================================================== */}

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

      {/* =====================================================
          EMAIL
      ===================================================== */}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-700
          "
        >
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
            placeholder="nom@email.com"
            autoComplete="email"
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
          <p
            className="
              mt-1
              text-sm
              text-red-500
            "
          >
            {errors.email.message}
          </p>
        )}

      </div>

      {/* =====================================================
          PASSWORD
      ===================================================== */}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-700
          "
        >
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
            placeholder="********"
            autoComplete="current-password"
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
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>

        </div>

        {errors.password && (
          <p
            className="
              mt-1
              text-sm
              text-red-500
            "
          >
            {errors.password.message}
          </p>
        )}

      </div>

      {/* =====================================================
          MOT DE PASSE OUBLIÉ
      ===================================================== */}

      <div className="flex justify-end">

        <Link
          href="/forgot-password"
          className="
            text-sm
            font-semibold
            text-yellow-600
            hover:text-yellow-500
          "
        >
          Mot de passe oublié ?
        </Link>

      </div>

      {/* =====================================================
          BOUTON
      ===================================================== */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          flex
          w-full
          items-center
          justify-center
          rounded-xl
          bg-[#08192D]
          py-3
          font-bold
          text-white
          transition
          hover:bg-[#102c4e]
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >

        {isSubmitting ? (
          <Loader2
            className="
              h-5
              w-5
              animate-spin
            "
          />
        ) : (
          "Se connecter"
        )}

      </button>

    </form>
  );
}
