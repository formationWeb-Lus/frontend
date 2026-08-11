import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Megaphone,
  Rocket,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#061221] py-12 lg:py-20">
      {/* Background Glows */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-yellow-500/15 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* CÔTÉ GAUCHE : Textes & Appel à l'action */}
          <div className="lg:col-span-7">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-yellow-300 backdrop-blur-md">
              <Rocket size={16} className="text-yellow-400 animate-pulse" />
              <span>Plateforme Tout-en-Un : Vente • Paiement • Marketing</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Créez, encaissez en direct et{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                boostez vos ventes.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg sm:leading-relaxed">
              Mettez vos produits en ligne ou créez votre page de paiement d'entreprise en quelques clics. 
              Recevez l'argent <strong>directement sur votre compte Mobile Money ou Visa</strong>, pendant que notre système propulse votre visibilité grâce au marketing intégré.
            </p>

            {/* Feature Highlights Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5 border border-white/5 backdrop-blur-sm">
                <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                <span>Page de paiement</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5 border border-white/5 backdrop-blur-sm">
                <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                <span>Paiement Direct</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5 border border-white/5 backdrop-blur-sm col-span-2 sm:col-span-1">
                <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                <span>Marketing Automatique</span>
              </div>
            </div>

            {/* Payment Methods Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-xs text-slate-400 font-medium mr-2">Moyens de paiement supportés :</span>
              {["M-Pesa", "Orange Money", "Airtel Money", "Afrimoney", "Visa", "Mastercard"].map((method) => (
                <span key={method} className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-slate-300 border border-slate-700/50">
                  {method}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 text-base font-bold text-[#061221] shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30"
              >
                Lancer mon activité
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
               href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:border-yellow-400/50 hover:bg-slate-800"
              >
                Créer une page Entreprise
              </Link>
            </div>
          </div>

          {/* CÔTÉ DROIT : Visuels interactifs / Dashboard */}
          <div className="relative lg:col-span-5">
            {/* Main Card */}
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Solde direct reçu</p>
                  <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
                    2 450,00 <span className="text-yellow-400 text-2xl">USD</span>
                  </h2>
                </div>
                <div className="rounded-2xl bg-yellow-400/10 p-3 border border-yellow-400/20 text-yellow-400">
                  <Wallet size={32} />
                </div>
              </div>

              {/* Realtime Transaction Notification */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-400">Nouveau Paiement Reçu !</p>
                      <p className="text-sm font-bold text-white">+ 45,00 USD (M-Pesa)</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    Direct
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-blue-400">
                    <CreditCard size={18} />
                    <span className="text-xs text-slate-300">Ventes Visa & Mobile</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white">142</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Transférées sur votre compte</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Megaphone size={18} />
                    <span className="text-xs text-slate-300">Campagne Marketing</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white">Active</h3>
                  <p className="text-xs text-slate-400 mt-0.5">+1.2k Vues générées</p>
                </div>
              </div>
            </div>

            {/* Floating Badge 1: Marketing Boost */}
            <div className="absolute -top-6 -left-6 hidden rounded-2xl border border-yellow-400/30 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex items-center gap-3 animate-pulse">
              <div className="rounded-xl bg-yellow-400/20 p-2.5 text-yellow-400">
                <TrendingUp size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Boost Marketing Inclus</h4>
                <p className="text-xs text-slate-300">Vos produits propulsés</p>
              </div>
            </div>

            {/* Floating Badge 2: Security */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-white/10 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/20 p-2.5 text-emerald-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Encaissement Instantané</h4>
                <p className="text-xs text-slate-300">Directement dans votre portefeuille</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}