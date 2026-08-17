
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Megaphone,
  MousePointerClick,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing digital pour entreprises | PayLink",
  description:
    "Développez votre visibilité, attirez de nouveaux clients et augmentez vos ventes grâce au marketing digital avec PayLink.",

  keywords: [
    "marketing digital",
    "marketing digital RDC",
    "marketing digital Congo",
    "agence marketing digital",
    "publicité Facebook",
    "publicité Instagram",
    "acquisition clients",
    "communication digitale",
    "attirer plus de clients",
    "marketing pour entreprises",
  ],

  alternates: {
    canonical: "/marketing-digital",
  },

  openGraph: {
    title: "Marketing digital pour attirer plus de clients | PayLink",
    description:
      "Faites connaître votre entreprise, atteignez les bonnes personnes et transformez votre audience en clients grâce au marketing digital.",
    type: "website",
  },
};

const services = [
  {
    icon: Megaphone,
    title: "Publicité digitale",
    description:
      "Faites connaître vos produits et services auprès des personnes susceptibles de devenir vos clients.",
  },
  {
    icon: Target,
    title: "Ciblage de votre audience",
    description:
      "Touchez les bonnes personnes au bon moment au lieu de communiquer au hasard.",
  },
  {
    icon: Users,
    title: "Acquisition de clients",
    description:
      "Transformez votre présence en ligne en véritable source de nouveaux prospects et clients.",
  },
  {
    icon: TrendingUp,
    title: "Développement des ventes",
    description:
      "Optimisez votre présence digitale pour transformer davantage de visiteurs en opportunités commerciales.",
  },
];

const benefits = [
  "Une présence professionnelle sur Internet",
  "Une stratégie adaptée à votre activité",
  "Une meilleure visibilité auprès de votre audience",
  "Des campagnes orientées vers l'acquisition de clients",
  "Des pages pensées pour présenter clairement vos offres",
  "Un parcours simple entre découverte et achat",
];

export default function MarketingDigitalPage() {
  return (
    <main className="min-h-screen bg-[#061221] text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">

        <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/15 blur-[140px]" />

        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
              <Megaphone size={16} />
              Marketing digital pour entreprises
            </div>

            {/* Title */}
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Votre entreprise mérite{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                d'être vue.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Faites connaître votre entreprise, attirez de nouveaux clients
              et développez vos ventes grâce à une stratégie de marketing
              digital adaptée à votre activité.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
              >
                <Rocket size={20} />
                Développer mon entreprise
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
              Le problème
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Avoir un bon produit ne suffit pas.
            </h2>

            <p className="mt-5 text-slate-300 leading-relaxed">
              Vous pouvez avoir d'excellents produits ou services, mais si les
              bonnes personnes ne vous trouvent pas, votre entreprise risque
              de rester invisible.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <Users className="text-yellow-400" size={28} />

              <h3 className="mt-5 text-xl font-bold">
                Peu de visibilité
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Votre entreprise existe, mais peu de personnes de votre marché
                cible la connaissent.
              </p>
            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <MousePointerClick className="text-blue-400" size={28} />

              <h3 className="mt-5 text-xl font-bold">
                Peu de prospects
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Votre présence sur les réseaux sociaux génère de l'attention,
                mais pas suffisamment de demandes ou de contacts.
              </p>
            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <TrendingUp className="text-emerald-400" size={28} />

              <h3 className="mt-5 text-xl font-bold">
                Croissance difficile
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Sans stratégie claire, il devient difficile de transformer
                votre visibilité en croissance réelle.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          SOLUTION
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Notre approche
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Nous ne cherchons pas seulement à vous donner des vues.
                <span className="text-yellow-400">
                  {" "}Nous cherchons des clients.
                </span>
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                Le marketing digital doit servir un objectif concret :
                développer votre activité.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                PayLink vous aide à construire un parcours qui commence par
                la visibilité, attire votre audience, présente votre offre
                clairement et facilite le passage à l'action.
              </p>

              <div className="mt-8 space-y-4">

                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-yellow-400"
                    />

                    <span className="text-sm text-slate-300">
                      {benefit}
                    </span>
                  </div>
                ))}

              </div>

            </div>


            {/* Visual */}
            <div className="relative">

              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-yellow-400/10 p-3 text-yellow-400">
                    <BarChart3 size={25} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Parcours client
                    </p>

                    <p className="font-bold text-white">
                      De la visibilité à la vente
                    </p>
                  </div>

                </div>


                <div className="mt-8 space-y-4">

                  {[
                    {
                      number: "01",
                      title: "Visibilité",
                      text: "Votre entreprise est découverte.",
                    },
                    {
                      number: "02",
                      title: "Intérêt",
                      text: "Votre audience découvre votre offre.",
                    },
                    {
                      number: "03",
                      title: "Action",
                      text: "Le prospect passe à l'étape suivante.",
                    },
                    {
                      number: "04",
                      title: "Client",
                      text: "Vous transformez l'opportunité en vente.",
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-xs font-black text-yellow-400">
                        {step.number}
                      </div>

                      <div>
                        <p className="font-bold text-white">
                          {step.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {step.text}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Ce que nous faisons
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une stratégie digitale pensée pour développer votre activité.
            </h2>

            <p className="mt-5 text-slate-400">
              Nous concentrons nos efforts sur ce qui compte réellement :
              votre visibilité, vos prospects et vos ventes.
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
                >

                  <div className="inline-flex rounded-xl bg-yellow-400/10 p-3 text-yellow-400 transition group-hover:bg-yellow-400/15">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Comment ça marche
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une approche simple pour développer votre entreprise.
            </h2>

          </div>


          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                <Target size={26} />
              </div>

              <h3 className="mt-5 font-bold">
                1. Définissez votre objectif
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Nous identifions votre activité, votre audience et ce que vous
                souhaitez obtenir.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-400">
                <Megaphone size={26} />
              </div>

              <h3 className="mt-5 font-bold">
                2. Faites connaître votre offre
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Votre entreprise est présentée aux personnes qui correspondent
                à votre marché.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                <TrendingUp size={26} />
              </div>

              <h3 className="mt-5 font-bold">
                3. Développez vos ventes
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Transformez progressivement votre visibilité et vos prospects
                en clients.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="border-t border-white/5 py-20">

        <div className="mx-auto max-w-5xl px-6">

          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 p-8 text-center sm:p-12">

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-[80px]" />

            <div className="relative">

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Prêt à passer à l'étape suivante ?
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
                Faites connaître votre entreprise.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-slate-300">
                Commencez à construire votre présence digitale et donnez à
                votre entreprise davantage d'opportunités de trouver de
                nouveaux clients.
              </p>

              <Link
                href="/register"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
              >
                Commencer maintenant

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
