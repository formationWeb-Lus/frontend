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
  title: "Services Marketing Digital en RDC | PayLink",
  description:
    "Découvrez nos services de marketing digital en RDC : publicité Facebook et Instagram, acquisition clients, réseaux sociaux, création de contenu et stratégie digitale pour développer votre entreprise.",
  keywords: [
    "services marketing digital",
    "marketing digital RDC",
    "agence marketing digital RDC",
    "marketing digital Congo",
    "publicité Facebook",
    "publicité Instagram",
    "acquisition clients",
    "réseaux sociaux",
    "création de contenu",
    "stratégie marketing digital",
    "visibilité entreprise",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services Marketing Digital en RDC | PayLink",
    description:
      "Publicité digitale, acquisition clients, réseaux sociaux, création de contenu et stratégie marketing pour développer votre entreprise en RDC.",
    type: "website",
  },
};

const services = [
  {
    icon: Megaphone,
    title: "Publicité Facebook et Instagram",
    description:
      "Développez votre visibilité grâce à des campagnes publicitaires ciblées sur Facebook et Instagram. Nous vous aidons à présenter vos produits et services aux personnes les plus susceptibles de devenir vos clients.",
    features: [
      "Campagnes Facebook et Instagram",
      "Ciblage de votre audience",
      "Création de messages publicitaires",
      "Optimisation des campagnes",
      "Suivi des performances",
    ],
  },
  {
    icon: Target,
    title: "Acquisition de clients",
    description:
      "Transformez votre présence en ligne en opportunités commerciales grâce à une stratégie d'acquisition de clients adaptée à votre activité, votre marché et vos objectifs.",
    features: [
      "Identification de votre audience",
      "Stratégie d'acquisition",
      "Génération de prospects",
      "Parcours client",
      "Optimisation des conversions",
    ],
  },
  {
    icon: Users,
    title: "Gestion des réseaux sociaux",
    description:
      "Développez une présence régulière et professionnelle sur les réseaux sociaux pour rester visible, communiquer avec votre audience et renforcer la confiance envers votre entreprise.",
    features: [
      "Stratégie réseaux sociaux",
      "Planification des publications",
      "Communication avec l'audience",
      "Développement de votre communauté",
      "Suivi de l'engagement",
    ],
  },
  {
    icon: Search,
    title: "Création de contenu",
    description:
      "Publiez du contenu utile, pertinent et adapté à votre audience pour attirer l'attention, expliquer votre offre et construire progressivement la crédibilité de votre entreprise.",
    features: [
      "Idées de contenus",
      "Stratégie éditoriale",
      "Contenu pour réseaux sociaux",
      "Messages orientés conversion",
      "Contenu adapté à votre audience",
    ],
  },
  {
    icon: Eye,
    title: "Visibilité en ligne",
    description:
      "Améliorez la présence de votre entreprise sur Internet afin que davantage de clients potentiels puissent découvrir votre marque, vos produits et vos services.",
    features: [
      "Développement de votre présence digitale",
      "Optimisation de votre visibilité",
      "Positionnement de votre marque",
      "Communication digitale",
      "Contenu orienté audience",
    ],
  },
  {
    icon: TrendingUp,
    title: "Stratégie marketing digital",
    description:
      "Construisez une stratégie marketing cohérente pour développer votre audience, attirer des prospects et créer de nouvelles opportunités commerciales sur le long terme.",
    features: [
      "Analyse de votre activité",
      "Définition des objectifs marketing",
      "Plan d'action digital",
      "Suivi des performances",
      "Amélioration continue",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Nous comprenons votre activité",
    description:
      "Nous commençons par comprendre votre entreprise, vos produits, vos services, votre marché, vos concurrents et vos objectifs commerciaux.",
  },
  {
    number: "02",
    title: "Nous identifions votre audience",
    description:
      "Nous cherchons à comprendre les personnes que vous souhaitez atteindre, leurs besoins, leurs problèmes et les raisons qui peuvent les pousser à choisir votre entreprise.",
  },
  {
    number: "03",
    title: "Nous construisons votre stratégie",
    description:
      "Nous sélectionnons les actions de marketing digital les plus adaptées à votre situation : publicité, contenu, réseaux sociaux, acquisition et optimisation.",
  },
  {
    number: "04",
    title: "Nous mesurons les résultats",
    description:
      "Nous analysons les performances pour identifier ce qui fonctionne, améliorer les campagnes et concentrer les efforts sur les actions qui créent le plus d'opportunités.",
  },
];

const benefits = [
  "Une meilleure visibilité de votre entreprise",
  "Une audience mieux ciblée",
  "Davantage d'opportunités commerciales",
  "Une stratégie marketing plus claire",
  "Une présence professionnelle sur les réseaux sociaux",
  "Des campagnes publicitaires mieux structurées",
  "Une approche orientée vers l'acquisition de clients",
  "Des actions pensées pour soutenir votre croissance",
];

const faqs = [
  {
    question: "Quels services de marketing digital proposez-vous ?",
    answer:
      "PayLink propose plusieurs services de marketing digital : publicité Facebook et Instagram, acquisition de clients, gestion des réseaux sociaux, création de contenu, amélioration de la visibilité en ligne et stratégie marketing digital.",
  },
  {
    question: "Proposez-vous des services de marketing digital en RDC ?",
    answer:
      "Oui. Nos services de marketing digital sont pensés pour accompagner les entreprises, entrepreneurs et professionnels qui souhaitent développer leur visibilité et attirer davantage de clients en République démocratique du Congo.",
  },
  {
    question: "Pouvez-vous m'aider à trouver plus de clients ?",
    answer:
      "Oui. Notre approche d'acquisition clients consiste à identifier votre audience, construire un message adapté, attirer les bonnes personnes et les guider vers une action utile pour votre entreprise.",
  },
  {
    question: "Faites-vous de la publicité Facebook et Instagram ?",
    answer:
      "Oui. Nous proposons des campagnes publicitaires sur Facebook et Instagram avec un travail sur le ciblage, les messages, la structure des campagnes et le suivi des performances.",
  },
  {
    question: "Le marketing digital est-il adapté aux petites entreprises ?",
    answer:
      "Oui. Une stratégie de marketing digital peut être adaptée à la taille, au budget et aux objectifs d'une petite entreprise. L'objectif est de commencer par les actions qui peuvent réellement contribuer à sa visibilité et à son acquisition de clients.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#061221] text-white">
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/15 blur-[140px]" />

        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
              <Megaphone size={16} />
              Services marketing digital en RDC
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Des services de marketing digital
              <br />

              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                pour attirer plus de clients
              </span>
            </h1>

              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              marketin digital en RDC || republic de mocratique du congo
              <br />

              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Digitalisation en RDC || republic de mocratique du congo
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              PayLink accompagne les entreprises et entrepreneurs en RDC dans
              leur développement digital. Publicité Facebook et Instagram,
              acquisition clients, réseaux sociaux, création de contenu et
              stratégie marketing : nous vous aidons à être visible auprès
              des bonnes personnes et à créer davantage d'opportunités
              commerciales.
            </p>

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
                Découvrir l'acquisition clients
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO SEO
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Marketing digital en RDC
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une stratégie digitale adaptée aux entreprises congolaises
            </h2>

            <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-slate-300">
              <p>
                Le marketing digital permet aujourd'hui à une entreprise de
                développer sa visibilité, de communiquer directement avec son
                audience et de rechercher de nouveaux clients sur Internet.
                En République démocratique du Congo, les réseaux sociaux et la
                publicité digitale représentent également des opportunités
                importantes pour les entrepreneurs et les PME.
              </p>

              <p>
                Mais être présent sur Internet ne suffit pas. Il faut savoir
                quoi publier, à qui s'adresser, quel message utiliser et
                comment transformer l'attention obtenue en véritable
                opportunité commerciale.
              </p>

              <p>
                C'est pourquoi nos services de marketing digital combinent
                visibilité, contenu, publicité et acquisition clients afin de
                construire une présence digitale cohérente autour de vos
                objectifs.
              </p>
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
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >
                      <CheckCircle2
                        size={19}
                        className="shrink-0 text-yellow-400"
                      />

                      <span className="text-sm text-slate-300">{item}</span>
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
      <section id="services" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Nos services marketing digital
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Des solutions digitales pour développer votre entreprise
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Découvrez nos principaux services de marketing digital pour
              améliorer votre visibilité, atteindre votre audience et
              développer votre acquisition de clients.
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

                  <h3 className="mt-6 text-xl font-bold">{service.title}</h3>

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
                L'objectif est d'attirer l'attention des bonnes personnes,
                leur présenter une offre claire et les guider vers une action
                utile pour votre entreprise.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-yellow-400"
                    />

                    <span className="text-sm text-slate-300">{benefit}</span>
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

            <div className="space-y-4">
              {[
                {
                  icon: Search,
                  number: "01",
                  title: "Identifier votre audience",
                },
                {
                  icon: Megaphone,
                  number: "02",
                  title: "Attirer son attention",
                },
                {
                  icon: Target,
                  number: "03",
                  title: "Transformer l'intérêt en action",
                },
              ].map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                        <Icon size={24} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Étape {step.number}
                        </p>

                        <h3 className="font-bold">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESEAUX SOCIAUX / RDC
      ====================================================== */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Marketing digital Congo
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Développez votre présence là où vos clients passent leur temps
            </h2>

            <div className="mt-6 space-y-4 leading-relaxed text-slate-300">
              <p>
                Les réseaux sociaux sont devenus un canal important pour
                présenter une entreprise, communiquer avec ses clients et
                développer sa notoriété. Mais publier régulièrement ne garantit
                pas automatiquement de meilleurs résultats.
              </p>

              <p>
                Une stratégie efficace doit associer le bon contenu, le bon
                message, la bonne audience et, lorsque cela est pertinent, des
                campagnes publicitaires capables d'amplifier votre portée.
              </p>

              <p>
                Notre approche du marketing digital en RDC vise donc à créer
                une présence cohérente autour de votre activité et à relier
                visibilité, engagement et acquisition de clients.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Facebook",
                "Instagram",
                "Réseaux sociaux",
                "Publicité digitale",
                "Création de contenu",
                "Acquisition clients",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-sm text-yellow-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Notre méthode
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une stratégie de marketing digital simple, étape par étape
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Nous construisons notre approche à partir de votre activité,
              votre audience et vos objectifs plutôt que d'appliquer une
              stratégie identique à toutes les entreprises.
            </p>
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

                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ SEO
      ====================================================== */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Questions fréquentes
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Tout savoir sur nos services marketing digital
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Quelques réponses aux questions fréquentes des entrepreneurs et
              entreprises qui souhaitent développer leur présence digitale.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6"
              >
                <summary className="cursor-pointer list-none pr-8 font-bold text-white marker:hidden">
                  {faq.question}
                </summary>

                <p className="mt-4 leading-relaxed text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          INTERNAL LINKS
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/marketing-digital"
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
            >
              <h3 className="text-xl font-bold">
                Marketing digital
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Découvrez notre approche du marketing digital et les
                stratégies permettant de développer votre présence en ligne.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                En savoir plus
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              href="/acquisition-clients"
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
            >
              <h3 className="text-xl font-bold">
                Acquisition clients
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Apprenez comment construire une stratégie pour attirer les
                bonnes personnes et transformer leur intérêt en opportunités.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                Découvrir
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              href="/contact"
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
            >
              <h3 className="text-xl font-bold">
                Parlons de votre projet
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Vous souhaitez développer votre visibilité ou attirer plus de
                clients ? Contactez-nous pour discuter de votre activité.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                Nous contacter
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
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
                l'attention, renforce votre visibilité et crée de nouvelles
                opportunités pour votre entreprise.
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