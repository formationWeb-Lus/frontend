import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Partie gauche */}

        <section className="relative hidden overflow-hidden bg-[#08192D] lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[#08192D] via-[#0f2745] to-[#08192D]" />

          <div className="relative z-10 flex w-full flex-col justify-center px-16">
            {/* Logo */}

            <Link href="/" className="mb-12 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="PayLink"
                width={48}
                height={48}
                priority
              />

              <span className="text-3xl font-bold text-white">
                PayLink
              </span>
            </Link>

            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Choisissez un nouveau mot de passe.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Votre nouveau mot de passe protégera l'accès à votre entreprise,
              vos paiements et toutes vos transactions.
            </p>

            <div className="mt-14">
              <Image
                src="/images/reset-password.png"
                alt="Reset Password"
                width={650}
                height={500}
                priority
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Partie droite */}

        <section className="flex items-center justify-center bg-white px-8 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <Lock className="h-8 w-8 text-yellow-600" />
              </div>

              <h2 className="text-4xl font-bold text-slate-900">
                Nouveau mot de passe
              </h2>

              <p className="mt-3 text-slate-500">
                Choisissez un mot de passe sécurisé pour votre compte.
              </p>
            </div>

            <form className="space-y-5">
              {/* Nouveau mot de passe */}

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Nouveau mot de passe
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-yellow-500"
                />
              </div>

              {/* Confirmation */}

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Confirmer le mot de passe
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#08192D] py-3 font-semibold text-white transition hover:bg-[#102a49]"
              >
                Réinitialiser le mot de passe
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 font-semibold text-yellow-600 hover:text-yellow-500"
              >
                <ArrowLeft size={18} />
                Retour à la connexion
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}