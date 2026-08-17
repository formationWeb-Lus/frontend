import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Lightbulb,
  Megaphone,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services de Marketing Digital | PayLink",
  description:
    "Découvrez les services PayLink pour améliorer votre visibilité, attirer de nouveaux clients et développer votre entreprise grâce au marketing digital.",
  keywords: [
    "marketing digital",
    "services marketing digital",
    "acquisition clients",
    "publicité digitale",
    "visibilité entreprise",
    "marketing PME",
    "marketing digital RDC",
    "trouver des clients",
    "communication digitale",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services de Marketing Digital | PayLink",
    description:
      "Développez votre visibilité, attirez plus de clients et faites grandir votre entreprise grâce aux solutions marketing de PayLink.",
    type: "website",
  },
};

const services = [
  {
    icon: Megaphone,
    title: "Publicité digitale",
    description:
      "Faites connaître vos produits et services auprès d'une audience ciblée grâce à des campagnes publicitaires pensées pour générer de l'intérêt et des prospects.",
    features: [
      "Campagnes publicitaires ciblées",
      "Création de messages publicitaires",
      "Optimisation des campagnes",
      "Suivi des performances",
    ],
  },
  {
    icon: Target,
    title: "Acquisition de clients",
    description:
      "Mettez en place une stratégie pour atteindre les bonnes personnes, attirer leur attention et transformer leur intérêt en opportunités commerciales.",
    features: [
      "Identification de votre audience",
      "Stratégie d'acquisition",
      "Génération de prospects",
      "Optimisation du parcours client",
    ],
  },
  {
    icon: Eye,
    title: "Visibilité en ligne",
    description:
      "Augmentez la présence de votre entreprise sur Internet afin que davantage de personnes puissent découvrir vos produits, vos services et votre marque.",
    features: [
      "Présence digitale",
      "Optimisation de votre visibilité",
      "Contenu orienté audience",
      "Développement de votre image",
    ],
  },
  {
    icon: Search,
    title: "Marketing de contenu",
    description:
      "Créez du contenu utile et pertinent pour attirer votre audience, construire votre crédibilité et rester présent dans l'esprit de vos prospects.",
    features: [
      "Idées de contenus",
      "Stratégie éditoriale",
      "Contenu pour réseaux sociaux",
      "Contenu orienté conversion",
    ],
  },
  {
    icon: TrendingUp,
    title: "Stratégie de croissance",
    description:
      "Construisez une stratégie digitale cohérente pour développer progressivement votre audience, vos prospects et vos opportunités commerciales.",
    features: [
      "Analyse de votre activité",
      "Objectifs marketing",
      "Plan d'action digital",
      "Suivi et amélioration",
    ],
  },
  {
    icon: Users,
    title: "Fidélisation et relation client",
    description:
      "Ne vous contentez pas de trouver de nouveaux clients. Développez également une relation durable avec les personnes qui connaissent déjà votre entreprise.",
    features: [
      "Communication avec les clients",
      "Suivi des prospects",
      "Actions de fidélisation",
      "Développement de la relation client",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Nous comprenons votre activité",
    description:
      "Nous commençons par comprendre votre entreprise, vos produits, vos services, votre marché et vos objectifs.",
  },
  {
    number: "02",
    title: "Nous identifions votre audience",
    description:
      "Nous cherchons à comprendre les personnes que vous souhaitez atteindre et leurs besoins.",
  },
  {
    number: "03",
    title: "Nous construisons votre stratégie",
    description:
      "Nous sélectionnons les actions marketing les plus adaptées à votre situation et à vos objectifs.",
  },
  {
    number: "04",
    title: "Nous mesurons les résultats",
    description:
      "Nous analysons les performances afin d'identifier ce qui fonctionne et d'améliorer progressivement les actions.",
  },
];

const benefits = [
  "Une meilleure visibilité de votre entreprise",
  "Une audience mieux ciblée",
  "Davantage d'opportunités commerciales",
  "Une stratégie marketing plus claire",
  "Une présence digitale plus professionnelle",
  "Des actions orientées vers la croissance",
];

export default function ServicesPage() {
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
              <Megaphone size={16} />
              Services de marketing digital
            </div>

            {/* Hook */}
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Votre entreprise est-elle
              <br />

              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                suffisamment visible ?
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Avoir un bon produit ou un excellent service ne suffit pas si
              vos clients potentiels ne vous trouvent pas. PayLink vous aide
              à développer votre visibilité, attirer les bonnes personnes et
              créer davantage d'opportunités commerciales.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition hover:scale-[1.02]"
              >
                Développer mon activité

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/acquisition-clients"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 font-semibold text-white transition hover:border-yellow-400/50"
              >
                Comment attirer des clients ?
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROBLEME
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Le vrai problème
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Vous avez une activité, mais vos clients ne vous trouvent
                peut-être pas.
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                Beaucoup d'entrepreneurs comptent uniquement sur le bouche-à-
                oreille ou attendent que les clients viennent naturellement.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                Pourtant, vos futurs clients passent déjà du temps sur
                Internet. Ils recherchent des produits, comparent des
                entreprises, regardent des publications et découvrent de
                nouvelles marques chaque jour.
              </p>

              <p className="mt-4 font-semibold leading-relaxed text-white">
                La question n'est donc pas seulement : « Est-ce que mon
                entreprise est bonne ? »
              </p>

              <p className="mt-2 font-semibold leading-relaxed text-yellow-400">
                La vraie question est : « Est-ce que les bonnes personnes
                peuvent me trouver ? »
              </p>

            </div>


            {/* Visual */}
            <div className="relative">

              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                    <Eye size={30} />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Objectif
                    </p>

                    <h3 className="text-xl font-bold">
                      Être trouvé par les bonnes personnes
                    </h3>

                  </div>

                </div>

                <div className="mt-8 space-y-3">

                  {[
                    "Votre entreprise est visible",
                    "Votre message attire l'attention",
                    "Votre audience comprend votre offre",
                    "Le prospect passe à l'action",
                  ].map((item, index) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >

                      <CheckCircle2
                        size={19}
                        className="shrink-0 text-yellow-400"
                      />

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
          SERVICES
      ====================================================== */}
      <section
        id="services"
        className="py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Nos services
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Tout ce qu'il faut pour développer votre présence digitale.
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Des solutions pensées autour d'un objectif : vous aider à
              atteindre votre marché et créer davantage d'opportunités.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-slate-900"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400/15">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-3">

                    {service.features.map((feature) => (

                      <div
                        key={feature}
                        className="flex items-start gap-2"
                      >

                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-yellow-400"
                        />

                        <span className="text-sm text-slate-300">
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>
              );

            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          ACQUISITION
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Texte */}
            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Acquisition de clients
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Ne cherchez pas seulement des vues. Cherchez des clients.
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                Une bonne stratégie marketing ne consiste pas simplement à
                obtenir beaucoup de likes ou de vues.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                L'objectif est d'attirer l'attention des bonnes personnes et
                de les guider vers une action utile pour votre entreprise.
              </p>


              <div className="mt-8 space-y-4">

                {benefits.map((benefit) => (

                  <div
                    key={benefit}
                    className="flex items-center gap-3"
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


              <Link
                href="/acquisition-clients"
                className="group mt-8 inline-flex items-center gap-2 font-bold text-yellow-400"
              >
                Découvrir notre approche d'acquisition

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>


            {/* Process visual */}
            <div className="space-y-4">

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Search size={24} />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Étape 1
                    </p>

                    <h3 className="font-bold">
                      Identifier votre audience
                    </h3>

                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Megaphone size={24} />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Étape 2
                    </p>

                    <h3 className="font-bold">
                      Attirer son attention
                    </h3>

                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Target size={24} />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Étape 3
                    </p>

                    <h3 className="font-bold">
                      Transformer l'intérêt en action
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROCESS
      ====================================================== */}
      <section className="py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Notre méthode
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une stratégie simple, étape par étape.
            </h2>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {process.map((step) => (

              <div
                key={step.number}
                className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-7"
              >

                <span className="text-4xl font-black text-yellow-400/30">
                  {step.number}
                </span>

                <h3 className="mt-5 text-lg font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          CTA FINAL
      ====================================================== */}
      <section className="border-t border-white/5 py-20">

        <div className="mx-auto max-w-5xl px-6">

          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 p-8 text-center sm:p-12">

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-[80px]" />

            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px]" />

            <div className="relative">

              <Lightbulb
                size={40}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">
                Et si vos prochains clients vous découvraient aujourd'hui ?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Commencez à construire une présence digitale qui attire
                l'attention et crée de nouvelles opportunités pour votre
                entreprise.
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
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-4 font-semibold text-white transition hover:border-yellow-400/50"
                >
                  Lire nos conseils marketing
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}