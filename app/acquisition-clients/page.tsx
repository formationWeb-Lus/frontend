import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Megaphone,
  MousePointerClick,
  Rocket,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Acquisition de clients | Trouvez plus de clients | PayLink",
  description:
    "Découvrez comment PayLink aide les entreprises à attirer de nouveaux clients grâce au marketing digital, à la publicité et à une stratégie d'acquisition adaptée.",

  keywords: [
    "acquisition clients",
    "acquisition de clients",
    "trouver des clients",
    "trouver de nouveaux clients",
    "attirer des clients",
    "acquisition clients RDC",
    "trouver clients RDC",
    "marketing digital RDC",
    "publicité pour entreprise",
    "générer des prospects",
    "prospection digitale",
  ],

  alternates: {
    canonical: "/acquisition-clients",
  },

  openGraph: {
    title: "Comment trouver plus de clients pour votre entreprise ? | PayLink",
    description:
      "Attirez davantage de prospects et développez votre clientèle grâce à une stratégie d'acquisition digitale adaptée à votre entreprise.",
    type: "website",
  },
};

const acquisitionMethods = [
  {
    icon: Megaphone,
    title: "Publicité digitale",
    description:
      "Utilisez Facebook, Instagram et d'autres canaux digitaux pour présenter votre entreprise à de nouvelles personnes.",
  },
  {
    icon: Target,
    title: "Ciblage de votre audience",
    description:
      "Concentrez vos efforts sur les personnes les plus susceptibles d'être intéressées par vos produits ou services.",
  },
  {
    icon: Search,
    title: "Visibilité en ligne",
    description:
      "Développez votre présence digitale pour permettre à de nouveaux clients de découvrir votre entreprise.",
  },
  {
    icon: MousePointerClick,
    title: "Conversion",
    description:
      "Donnez à vos prospects un chemin simple pour vous contacter, demander des informations ou acheter.",
  },
];

const problems = [
  {
    title: "Vous dépendez uniquement du bouche-à-oreille",
    description:
      "Le bouche-à-oreille est précieux, mais il peut être difficile de construire une croissance régulière en dépendant uniquement de vos recommandations.",
  },
  {
    title: "Vous publiez mais vous n'attirez pas assez de clients",
    description:
      "Publier sur les réseaux sociaux ne garantit pas que votre contenu atteindra les bonnes personnes.",
  },
  {
    title: "Vous ne savez pas où trouver vos clients",
    description:
      "Sans stratégie, vous risquez de dépenser du temps et de l'argent sur des actions qui ne correspondent pas à votre audience.",
  },
];

const steps = [
  {
    number: "01",
    title: "Définir votre client idéal",
    description:
      "Nous identifions les personnes qui ont le plus de chances d'avoir besoin de votre produit ou service.",
  },
  {
    number: "02",
    title: "Construire votre message",
    description:
      "Votre offre doit être comprise rapidement et répondre à une vraie préoccupation de votre audience.",
  },
  {
    number: "03",
    title: "Attirer l'attention",
    description:
      "Nous utilisons les bons canaux et les bonnes actions pour mettre votre entreprise devant votre audience.",
  },
  {
    number: "04",
    title: "Transformer l'intérêt en opportunité",
    description:
      "Votre prospect doit pouvoir facilement passer de la découverte à la prise de contact ou à l'achat.",
  },
];

export default function AcquisitionClientsPage() {
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
              <Target size={16} />
              Acquisition de clients
            </div>

            {/* Main hook */}
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Vous avez une entreprise.
              <br />

              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Maintenant, trouvez vos clients.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Ne dépendez pas uniquement du hasard ou du bouche-à-oreille.
              Développez une stratégie digitale capable de mettre votre
              entreprise devant les bonnes personnes et de créer davantage
              d'opportunités commerciales.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
              >
                <Rocket size={20} />

                Trouver plus de clients

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
              Le vrai problème
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Avoir une entreprise ne signifie pas automatiquement avoir des
              clients.
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Vous pouvez avoir un excellent produit, un bon service et une
              vraie expertise. Mais si votre marché ne vous connaît pas,
              votre entreprise reste difficile à développer.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {problems.map((problem) => (

              <div
                key={problem.title}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-7"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                  <Target size={22} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {problem.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {problem.description}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          BIG STATEMENT
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-5xl px-6">

          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 p-8 text-center sm:p-12">

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-[80px]" />

            <div className="relative">

              <TrendingUp
                size={38}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Le but n'est pas seulement d'être visible.
                <br />

                <span className="text-yellow-400">
                  Le but est d'être choisi.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Votre marketing doit créer un lien entre votre entreprise et
                les personnes qui ont réellement besoin de ce que vous
                proposez.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          METHODS
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Comment attirer des clients
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Construisez un système d'acquisition autour de votre entreprise.
            </h2>

            <p className="mt-5 text-slate-400">
              Plusieurs éléments doivent fonctionner ensemble pour transformer
              une personne qui ne vous connaît pas en client potentiel.
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {acquisitionMethods.map((method) => {

              const Icon = method.icon;

              return (
                <div
                  key={method.title}
                  className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {method.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {method.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          CUSTOMER JOURNEY
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Text */}
            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Le parcours de votre futur client
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Un inconnu peut devenir votre prochain client.
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                L'acquisition ne se limite pas à trouver quelqu'un qui achète
                immédiatement. Il faut d'abord attirer son attention, créer de
                l'intérêt et lui donner une bonne raison d'aller plus loin.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Votre entreprise est découverte.",
                  "Votre offre attire l'attention.",
                  "Le prospect découvre votre valeur.",
                  "Il prend contact ou demande plus d'informations.",
                  "Il devient progressivement un client.",
                ].map((item, index) => (

                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-xs font-black text-yellow-400">
                      {index + 1}
                    </div>

                    <span className="text-sm text-slate-300">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Visual */}
            <div className="relative">

              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-2xl">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Parcours d'acquisition
                    </p>

                    <p className="mt-1 font-bold">
                      Visibilité → Client
                    </p>

                  </div>

                  <div className="rounded-xl bg-yellow-400/10 p-3 text-yellow-400">
                    <TrendingUp size={24} />
                  </div>

                </div>


                <div className="mt-8 space-y-3">

                  {[
                    {
                      icon: Eye,
                      title: "Visibilité",
                      text: "Votre entreprise est découverte.",
                    },
                    {
                      icon: Users,
                      title: "Audience",
                      text: "Une personne s'intéresse à votre offre.",
                    },
                    {
                      icon: MousePointerClick,
                      title: "Interaction",
                      text: "Elle clique, contacte ou demande.",
                    },
                    {
                      icon: Target,
                      title: "Prospect",
                      text: "Une opportunité commerciale est créée.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Client",
                      text: "L'opportunité devient une vente.",
                    },
                  ].map((step, index) => {

                    const Icon = step.icon;

                    return (
                      <div
                        key={step.title}
                        className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                          <Icon size={19} />
                        </div>

                        <div className="flex-1">

                          <p className="text-sm font-bold">
                            {step.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {step.text}
                          </p>

                        </div>

                        {index < 4 && (
                          <ArrowRight
                            size={16}
                            className="text-slate-600"
                          />
                        )}

                      </div>
                    );

                  })}

                </div>

              </div>

            </div>

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
              Notre méthode
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une stratégie construite autour de votre entreprise.
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
          BENEFITS
      ====================================================== */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Ce que vous construisez
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une entreprise plus facile à découvrir et à choisir.
            </h2>

          </div>


          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">

            {[
              "Une meilleure visibilité auprès de votre marché",
              "Une audience mieux ciblée",
              "Davantage de personnes découvrent votre entreprise",
              "Plus d'opportunités de contact",
              "Un parcours client plus clair",
              "Une stratégie marketing qui peut évoluer avec votre entreprise",
            ].map((benefit) => (

              <div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/50 p-4"
              >

                <CheckCircle2
                  size={20}
                  className="shrink-0 text-yellow-400"
                />

                <span className="text-sm text-slate-300">
                  {benefit}
                </span>

              </div>

            ))}

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

              <Target
                size={38}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">
                Arrêtez d'attendre que les clients viennent à vous.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Commencez à construire une stratégie qui met votre entreprise
                devant les bonnes personnes et crée davantage d'opportunités.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
                >
                  Trouver mes clients

                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-4 font-semibold text-white transition hover:border-yellow-400/50"
                >
                  Parler à PayLink
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}