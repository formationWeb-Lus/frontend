import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Megaphone,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de PayLink | Marketing digital pour entreprises",
  description:
    "Découvrez PayLink, une plateforme conçue pour aider les entreprises à développer leur visibilité, attirer de nouveaux clients et développer leurs ventes grâce au digital.",

  keywords: [
    "PayLink",
    "à propos PayLink",
    "marketing digital RDC",
    "plateforme marketing digital",
    "entreprise digitale RDC",
    "acquisition clients",
    "vente en ligne",
    "marketing pour entreprise",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "À propos de PayLink | Donnez plus de visibilité à votre entreprise",
    description:
      "PayLink aide les entreprises à développer leur présence digitale, attirer de nouveaux clients et transformer leur visibilité en opportunités commerciales.",
    type: "website",
  },
};

const values = [
  {
    icon: Target,
    title: "Orientation résultats",
    description:
      "Nous pensons le marketing autour d'un objectif concret : aider les entreprises à créer davantage d'opportunités commerciales.",
  },
  {
    icon: Users,
    title: "Centré sur le client",
    description:
      "Une bonne stratégie commence par comprendre les besoins, les problèmes et les attentes de votre audience.",
  },
  {
    icon: Lightbulb,
    title: "Simplicité",
    description:
      "Le digital ne devrait pas être compliqué. Nous cherchons à rendre les outils et les actions marketing accessibles.",
  },
  {
    icon: TrendingUp,
    title: "Croissance",
    description:
      "Notre objectif est de permettre aux entreprises de construire une présence digitale capable d'évoluer avec leur activité.",
  },
];

const journey = [
  {
    number: "01",
    title: "Être visible",
    description:
      "Permettre aux entreprises d'être découvertes par les personnes qui recherchent leurs produits ou services.",
  },
  {
    number: "02",
    title: "Attirer",
    description:
      "Utiliser le marketing digital pour capter l'attention d'une audience pertinente.",
  },
  {
    number: "03",
    title: "Convertir",
    description:
      "Créer un parcours simple qui permet au prospect de passer de l'intérêt à l'action.",
  },
  {
    number: "04",
    title: "Grandir",
    description:
      "Construire progressivement une stratégie digitale qui accompagne la croissance de l'entreprise.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#061221] text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">

        {/* Background */}
        <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/15 blur-[140px]" />

        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
              <Rocket size={16} />
              À propos de PayLink
            </div>

            {/* Hook */}
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Nous voulons aider les entreprises à{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                être vues, choisies et développées.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              PayLink est une plateforme pensée pour accompagner les
              entreprises dans leur développement digital : améliorer leur
              visibilité, attirer de nouveaux clients et transformer leur
              présence en ligne en opportunités commerciales.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
              >
                Découvrir nos services

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 font-semibold text-white transition hover:border-yellow-400/50"
              >
                Nous contacter
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

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Text */}
            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Pourquoi PayLink ?
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Avoir un bon produit ne suffit pas si personne ne le connaît.
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                Beaucoup d'entreprises ont de bons produits, de bons services
                et de vraies compétences, mais rencontrent une difficulté :
                atteindre suffisamment de personnes.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                Aujourd'hui, la présence digitale joue un rôle important dans
                la manière dont les clients découvrent, évaluent et choisissent
                une entreprise.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                PayLink a donc été pensé autour d'une idée simple :
                <span className="font-semibold text-white">
                  {" "}aider les entreprises à transformer leur présence
                  digitale en opportunités.
                </span>
              </p>

            </div>


            {/* Visual */}
            <div className="relative">

              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-2xl">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                    <Megaphone size={28} />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Le principe
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Visibilité → Opportunité
                    </h3>

                  </div>

                </div>


                <div className="mt-8 space-y-3">

                  {[
                    "Faire connaître votre entreprise",
                    "Atteindre les bonnes personnes",
                    "Créer de l'intérêt",
                    "Générer des prospects",
                    "Développer les ventes",
                  ].map((item, index) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/10 text-xs font-bold text-yellow-400">
                        {index + 1}
                      </div>

                      <span className="text-sm text-slate-300">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-5xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Notre mission
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Donner aux entreprises les moyens de mieux se développer grâce
              au digital.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              Nous voulons rendre le marketing digital plus accessible aux
              entrepreneurs et aux entreprises qui souhaitent trouver de
              nouveaux clients, développer leur visibilité et faire grandir
              leur activité.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <EyeIcon />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Plus de visibilité
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Aider les entreprises à être découvertes par leur marché.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Users size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Plus de prospects
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Aider les entreprises à atteindre des personnes réellement
                intéressées par leurs offres.
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <TrendingUp size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Plus d'opportunités
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Transformer la visibilité et l'intérêt en opportunités
                commerciales.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          VALUES
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Nos valeurs
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Ce qui guide notre façon de travailler.
            </h2>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value) => {

              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 transition hover:-translate-y-1 hover:border-yellow-400/30"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {value.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          OUR APPROACH
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Notre approche
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Nous ne voulons pas simplement vous aider à publier.
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                Une publication, une publicité ou un site web ne sont que des
                outils. Ce qui compte réellement, c'est la stratégie derrière
                ces outils.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                Nous cherchons donc à construire un parcours cohérent :
                attirer l'attention, créer de l'intérêt, générer une action et
                développer progressivement votre clientèle.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Comprendre votre marché",
                  "Identifier votre audience",
                  "Créer un message clair",
                  "Choisir les bons canaux",
                  "Mesurer et améliorer",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
                      size={20}
                      className="text-yellow-400"
                    />

                    <span className="text-sm text-slate-300">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Journey */}
            <div className="space-y-4">

              {journey.map((step) => (

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

        </div>
      </section>


      {/* =====================================================
          WHO WE HELP
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
            Pour qui ?
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            PayLink est pensé pour les entreprises qui veulent avancer.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-slate-400">
            Que vous soyez entrepreneur, commerçant, prestataire de services,
            professionnel indépendant ou entreprise en développement, notre
            objectif est de vous aider à mieux utiliser le digital pour
            atteindre votre marché.
          </p>


          <div className="mt-10 flex flex-wrap justify-center gap-3">

            {[
              "Entrepreneurs",
              "Commerçants",
              "Prestataires de services",
              "Professionnels",
              "PME",
              "Entreprises en croissance",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300"
              >
                {item}
              </span>

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

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-[80px]" />

            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px]" />

            <div className="relative">

              <Rocket
                size={38}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">
                Votre entreprise mérite d'être connue.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Commencez à développer votre visibilité et construisez une
                présence digitale capable de vous rapprocher de vos futurs
                clients.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
                >
                  Commencer maintenant

                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-4 font-semibold text-white transition hover:border-yellow-400/50"
                >
                  Voir nos services
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

/**
 * Petite icône locale pour éviter d'ajouter une dépendance supplémentaire.
 */
function EyeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}