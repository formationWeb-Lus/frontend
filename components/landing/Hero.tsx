import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#08192D]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <span className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
            🚀 Paiements sécurisés pour votre entreprise
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
            Acceptez les paiements
            <span className="block text-yellow-400">
              partout en Afrique.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            PayLink permet aux entreprises de créer des pages de paiement,
            générer des liens de paiement et intégrer une API moderne pour
            recevoir des paiements Mobile Money et cartes bancaires en toute
            sécurité.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              Airtel Money
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              Orange Money
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              M-Pesa
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              Afrimoney
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              Visa
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              Mastercard
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-[#08192D] transition hover:bg-yellow-300"
            >
              Créer un compte
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/documentation"
              className="inline-flex items-center justify-center rounded-xl border border-yellow-400 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-[#08192D]"
            >
              Documentation API
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* Dashboard */}
          <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Revenus</p>
                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  12 540 $
                </h2>
              </div>

              <Wallet className="text-yellow-500" size={40} />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 p-5">
                <CreditCard className="text-blue-600" />
                <h3 className="mt-3 text-2xl font-bold">1 286</h3>
                <p className="text-sm text-gray-500">
                  Transactions
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <ShieldCheck className="text-green-600" />
                <h3 className="mt-3 text-2xl font-bold">99.99%</h3>
                <p className="text-sm text-gray-500">
                  Disponibilité
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#08192D] p-5 text-white">
              <div className="flex items-center justify-between">
                <span>Paiement reçu</span>

                <span className="rounded-full bg-green-500 px-3 py-1 text-sm">
                  Succès
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-bold">
                150 USD
              </h2>

              <p className="mt-2 text-gray-300">
                Orange Money • ********89
              </p>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-8 hidden rounded-2xl border border-white/10 bg-[#102540] p-5 shadow-xl md:block">
            <div className="flex items-center gap-3">
              <Smartphone className="text-yellow-400" />

              <div>
                <h3 className="font-semibold text-white">
                  Mobile Money
                </h3>

                <p className="text-sm text-slate-300">
                  Paiement instantané
                </p>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="absolute -right-12 top-10 hidden lg:block">
            <Image
              src="/hero.png"
              alt="PayLink Dashboard"
              width={220}
              height={220}
              className="animate-bounce"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}