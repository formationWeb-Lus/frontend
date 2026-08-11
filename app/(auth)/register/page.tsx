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
    <main className="min-h-screen bg-slate-900 lg:bg-slate-100 selection:bg-amber-400 selection:text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-12">

        {/* ================= SECTION GAUCHE (Desktop / Hero) ================= */}
        <section className="relative hidden overflow-hidden bg-[#08192D] lg:col-span-6 lg:flex xl:col-span-7">
          {/* Cercles décoratifs lumineux en arrière-plan */}
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-12 xl:px-20">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="p-2 rounded-2xl bg-white/5 border border-white/10 group-hover:border-amber-400/50 transition">
                <Image
                  src="/logo.png"
                  alt="PayLink"
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Pay<span className="text-amber-400">Link</span>
              </span>
            </Link>

            {/* CONTENU RHÉTORIQUE */}
            <div className="my-auto py-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md mb-6">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                Plateforme de paiement sécurisée
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white xl:text-5xl leading-[1.15]">
                Développez votre business avec des <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">paiements simples.</span>
              </h1>

              <p className="mt-6 text-base text-slate-300 leading-relaxed max-w-xl">
                Créez votre entreprise, générez des pages de paiement, acceptez Mobile Money et Visa, puis gérez vos transactions en temps réel.
              </p>

              {/* AVANTAGES */}
              <div className="mt-8 grid grid-cols-1 gap-4 text-sm font-medium text-slate-200 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/5">
                  <div className="rounded-xl bg-amber-400/10 p-2 text-amber-400">
                    <Smartphone size={20} />
                  </div>
                  <span>Mobile Money</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/5">
                  <div className="rounded-xl bg-amber-400/10 p-2 text-amber-400">
                    <CreditCard size={20} />
                  </div>
                  <span>Visa & Mastercard</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/5">
                  <div className="rounded-xl bg-amber-400/10 p-2 text-amber-400">
                    <Zap size={20} />
                  </div>
                  <span>Dashboards 24/7</span>
                </div>
              </div>

              {/* APERÇU DASHBOARD */}
              <div className="mt-10 relative group">
                <div className="absolute inset-0 bg-amber-400/10 blur-xl rounded-3xl" />
                <Image
                  src="/heror.png"
                  alt="Dashboard PayLink"
                  width={620}
                  height={450}
                  priority
                  className="relative rounded-2xl border border-white/10 shadow-2xl transition duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} PayLink Inc. Tous droits réservés.
            </p>
          </div>
        </section>

        {/* ================= SECTION DROITE (Formulaire Mobile-First) ================= */}
        <section className="relative flex min-h-screen flex-col justify-center bg-[#08192D] px-4 py-8 sm:px-6 lg:col-span-6 lg:bg-white lg:px-12 xl:col-span-5">

          {/* En-tête Mobile uniquement */}
          <div className="mb-6 flex flex-col items-center text-center lg:hidden">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="PayLink" width={40} height={40} />
              <span className="text-2xl font-black text-white">
                Pay<span className="text-amber-400">Link</span>
              </span>
            </Link>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Inscription 100% sécurisée
            </div>
          </div>

          {/* Carte du formulaire */}
          <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8 lg:shadow-none lg:p-0">
            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-black text-[#08192D] sm:text-3xl tracking-tight">
                Créer un compte
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                Rejoignez PayLink gratuitement et commencez à encaisser vos paiements.
              </p>
            </div>

            {/* FORMULAIRE */}
            <RegisterForm />

            {/* REDIRECTION CONNEXION */}
            <p className="mt-6 text-center text-xs sm:text-sm text-slate-600">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-bold text-amber-600 transition hover:text-amber-500 underline decoration-amber-300 underline-offset-4"
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