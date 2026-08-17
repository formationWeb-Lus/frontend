
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  Megaphone,
  MousePointerClick,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Publicité Facebook et Instagram pour entreprises | PayLink",
  description:
    "Attirez de nouveaux clients grâce à la publicité Facebook et Instagram. PayLink aide les entreprises à créer des campagnes digitales ciblées et orientées vers les résultats.",

  keywords: [
    "publicité Facebook",
    "publicité Facebook RDC",
    "publicité Instagram",
    "publicité Instagram RDC",
    "Facebook Ads RDC",
    "Facebook Ads Congo",
    "publicité digitale",
    "campagne publicitaire",
    "acquisition clients",
    "marketing digital RDC",
    "agence publicité Facebook",
  ],

  alternates: {
    canonical: "/publicite-facebook",
  },

  openGraph: {
    title: "Publicité Facebook et Instagram pour attirer plus de clients | PayLink",
    description:
      "Faites connaître votre entreprise auprès des bonnes personnes grâce à des campagnes Facebook et Instagram pensées pour générer de l'intérêt, des prospects et des ventes.",
    type: "website",
  },
};

const campaignBenefits = [
  {
    icon: Target,
    title: "Ciblage précis",
    description:
      "Présentez votre offre à une audience correspondant réellement à votre activité, votre zone et vos objectifs.",
  },
  {
    icon: Eye,
    title: "Plus de visibilité",
    description:
      "Faites découvrir votre entreprise à des personnes qui ne vous connaissent pas encore.",
  },
  {
    icon: Users,
    title: "Plus de prospects",
    description:
      "Transformez l'attention générée par vos campagnes en personnes réellement intéressées par votre offre.",
  },
  {
    icon: TrendingUp,
    title: "Développez vos ventes",
    description:
      "Construisez un parcours qui accompagne votre audience de la découverte jusqu'à l'achat.",
  },
];

const steps = [
  {
    number: "01",
    title: "Nous comprenons votre activité",
    description:
      "Votre produit, votre service, votre marché et votre objectif sont analysés avant de lancer une campagne.",
  },
  {
    number: "02",
    title: "Nous définissons votre audience",
    description:
      "Nous identifions les personnes que votre entreprise cherche réellement à atteindre.",
  },
  {
    number: "03",
    title: "Nous construisons votre campagne",
    description:
      "Votre message, votre offre et votre contenu sont préparés pour attirer l'attention.",
  },
  {
    number: "04",
    title: "Nous optimisons les résultats",
    description:
      "Les performances sont suivies afin d'améliorer progressivement les campagnes.",
  },
];

export default function PubliciteFacebookPage() {
  return (
    <main className="min-h-screen bg-[#061221] text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">

        <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/15 blur-[140px]" />

        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.06),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
                <Megaphone size={16} />
                Facebook Ads • Instagram Ads
              </div>

              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Ne vous contentez pas de publier.
                <br />

                <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  Faites-vous remarquer.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
                Faites connaître votre entreprise auprès des bonnes personnes
                grâce à des campagnes publicitaires Facebook et Instagram
                pensées pour développer votre visibilité, attirer des prospects
                et générer davantage d'opportunités commerciales.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
                >
                  <Rocket size={20} />

                  Lancer ma campagne

                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 font-semibold text-white transition hover:border-yellow-400/50"
                >
                  Parler à un conseiller
                </Link>

              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-400">

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-yellow-400" />
                  Audience ciblée
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-yellow-400" />
                  Campagnes adaptées
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-yellow-400" />
                  Suivi des performances
                </div>

              </div>

            </div>


            {/* RIGHT VISUAL */}
            <div className="relative">

              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">

                <div className="flex items-center justify-between border-b border-white/10 pb-5">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-yellow-400/10 p-3 text-yellow-400">
                      <Megaphone size={25} />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Campagne digitale
                      </p>

                      <p className="font-bold text-white">
                        Votre entreprise
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                    Active
                  </span>

                </div>


                {/* Audience */}
                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-slate-500">
                        Audience ciblée
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        Clients potentiels
                      </p>
                    </div>

                    <Target
                      size={24}
                      className="text-yellow-400"
                    />

                  </div>


                  <div className="mt-6 flex items-center justify-center">

                    <div className="relative flex h-48 w-48 items-center justify-center">

                      <div className="absolute h-48 w-48 rounded-full border border-yellow-400/10" />

                      <div className="absolute h-36 w-36 rounded-full border border-yellow-400/15" />

                      <div className="absolute h-24 w-24 rounded-full border border-yellow-400/20" />

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400/15 text-yellow-400 shadow-lg shadow-yellow-400/10">
                        <Target size={26} />
                      </div>

                      <div className="absolute left-2 top-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-400/10 text-blue-400">
                        <Users size={18} />
                      </div>

                      <div className="absolute right-2 top-14 flex h-10 w-10 items-center justify-center rounded-full bg-purple-400/10 text-purple-400">
                        <Users size={18} />
                      </div>

                      <div className="absolute bottom-5 left-12 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                        <Users size={18} />
                      </div>

                    </div>

                  </div>

                </div>


                {/* Campaign metrics */}
                <div className="mt-5 grid grid-cols-2 gap-4">

                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">

                    <div className="flex items-center gap-2 text-blue-400">
                      <Eye size={17} />

                      <span className="text-xs text-slate-400">
                        Visibilité
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-white">
                      Audience élargie
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Votre entreprise est découverte
                    </p>

                  </div>


                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">

                    <div className="flex items-center gap-2 text-yellow-400">
                      <MousePointerClick size={17} />

                      <span className="text-xs text-slate-400">
                        Engagement
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-white">
                      Plus d'intérêt
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Votre offre attire l'attention
                    </p>

                  </div>

                </div>

              </div>


              {/* Floating badge */}
              <div className="absolute -left-6 -top-6 hidden items-center gap-3 rounded-2xl border border-yellow-400/30 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex">

                <div className="rounded-xl bg-yellow-400/10 p-2.5 text-yellow-400">
                  <Target size={22} />
                </div>

                <div>
                  <p className="text-xs font-bold text-white">
                    Bonne audience
                  </p>

                  <p className="text-xs text-slate-400">
                    Les bonnes personnes
                  </p>
                </div>

              </div>


              {/* Bottom badge */}
              <div className="absolute -bottom-6 -right-6 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex">

                <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                  <TrendingUp size={22} />
                </div>

                <div>
                  <p className="text-xs font-bold text-white">
                    Objectif : croissance
                  </p>

                  <p className="text-xs text-slate-400">
                    Pas seulement des impressions
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROBLEM
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Pourquoi faire de la publicité ?
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Publier ne garantit pas que vos clients verront votre offre.
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Sur les réseaux sociaux, publier du contenu ne suffit pas
              toujours. Une campagne publicitaire permet de donner davantage
              de visibilité à votre offre auprès d'une audience choisie.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">

              <Eye size={28} className="text-yellow-400" />

              <h3 className="mt-5 text-xl font-bold">
                Votre audience ne vous voit pas
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Même un excellent produit peut rester invisible si votre
                contenu n'atteint pas suffisamment de personnes.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">

              <Target size={28} className="text-blue-400" />

              <h3 className="mt-5 text-xl font-bold">
                Vous communiquez au hasard
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Montrer votre offre à tout le monde n'est pas forcément la
                meilleure stratégie.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">

              <BarChart3 size={28} className="text-emerald-400" />

              <h3 className="mt-5 text-xl font-bold">
                Vous ne savez pas quoi améliorer
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Une campagne doit être suivie afin d'identifier ce qui
                fonctionne et ce qui doit être amélioré.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          BENEFITS
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Notre approche
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une publicité pensée pour votre objectif.
            </h2>

            <p className="mt-5 text-slate-400">
              Nous ne cherchons pas simplement à générer des vues. Nous
              cherchons à créer des opportunités pour votre entreprise.
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {campaignBenefits.map((benefit) => {

              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
                >

                  <div className="inline-flex rounded-xl bg-yellow-400/10 p-3 text-yellow-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {benefit.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          PROCESS
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-6xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Comment ça fonctionne
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              De votre entreprise à vos futurs clients.
            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-2">

            {steps.map((step) => (

              <div
                key={step.number}
                className="flex gap-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-sm font-black text-yellow-400">
                  {step.number}
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="py-20">

        <div className="mx-auto max-w-5xl px-6">

          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 p-8 text-center sm:p-12">

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-[80px]" />

            <div className="relative">

              <Megaphone
                size={36}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                Votre prochain client peut déjà être sur Facebook.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Donnez à votre entreprise la visibilité nécessaire pour être
                découverte par davantage de personnes.
              </p>

              <Link
                href="/register"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
              >
                Commencer ma campagne

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
