
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
  title: "Publicité Facebook et Instagram en RDC | PayLink",
  description:
    "Publicité Facebook et Instagram en RDC pour attirer plus de clients. PayLink crée des campagnes ciblées, adaptées à votre entreprise et orientées vers l'acquisition de prospects.",
  keywords: [
    "publicité Facebook",
    "publicité Facebook RDC",
    "publicité Instagram",
    "publicité Instagram RDC",
    "Facebook Ads RDC",
    "Facebook Ads Congo",
    "Instagram Ads RDC",
    "publicité digitale RDC",
    "campagne publicitaire Facebook",
    "acquisition clients",
    "marketing digital RDC",
    "agence publicité Facebook RDC",
  ],
  alternates: {
    canonical: "/publicite-facebook",
  },
  openGraph: {
    title: "Publicité Facebook et Instagram en RDC | PayLink",
    description:
      "Attirez de nouveaux clients grâce à des campagnes Facebook et Instagram ciblées. Développez votre visibilité et vos opportunités commerciales avec PayLink.",
    type: "website",
  },
};

const campaignBenefits = [
  {
    icon: Target,
    title: "Ciblage précis",
    description:
      "Présentez votre offre à une audience correspondant réellement à votre activité, votre zone géographique et vos objectifs commerciaux.",
  },
  {
    icon: Eye,
    title: "Plus de visibilité",
    description:
      "Faites découvrir votre entreprise à des personnes qui ne vous connaissent pas encore et développez votre présence en ligne.",
  },
  {
    icon: Users,
    title: "Plus de prospects",
    description:
      "Transformez l'attention générée par vos campagnes en personnes réellement intéressées par vos produits ou services.",
  },
  {
    icon: TrendingUp,
    title: "Développez vos ventes",
    description:
      "Construisez un parcours qui accompagne votre audience de la découverte de votre entreprise jusqu'à l'action.",
  },
];

const steps = [
  {
    number: "01",
    title: "Nous comprenons votre activité",
    description:
      "Votre produit, votre service, votre marché, votre audience et votre objectif sont analysés avant de lancer une campagne.",
  },
  {
    number: "02",
    title: "Nous définissons votre audience",
    description:
      "Nous identifions les personnes que votre entreprise cherche réellement à atteindre afin d'éviter une communication trop générale.",
  },
  {
    number: "03",
    title: "Nous construisons votre campagne",
    description:
      "Votre message, votre offre et votre contenu publicitaire sont préparés pour attirer l'attention et encourager une action.",
  },
  {
    number: "04",
    title: "Nous suivons les performances",
    description:
      "Les résultats de la campagne sont analysés afin d'identifier les éléments à améliorer et d'optimiser progressivement les actions.",
  },
];

const faqs = [
  {
    question: "Qu'est-ce que la publicité Facebook ?",
    answer:
      "La publicité Facebook consiste à diffuser des annonces auprès d'une audience sélectionnée selon différents critères afin de présenter une entreprise, un produit ou un service à des clients potentiels.",
  },
  {
    question: "Proposez-vous la publicité Facebook en RDC ?",
    answer:
      "Oui. PayLink accompagne les entreprises et entrepreneurs qui souhaitent développer leur visibilité et attirer de nouveaux clients grâce à la publicité Facebook en République démocratique du Congo.",
  },
  {
    question: "Faites-vous également de la publicité Instagram ?",
    answer:
      "Oui. Nous proposons également des campagnes Instagram Ads. Facebook et Instagram peuvent être utilisés ensemble selon votre audience, votre offre et vos objectifs marketing.",
  },
  {
    question: "Combien faut-il investir dans une publicité Facebook ?",
    answer:
      "Le budget dépend de votre objectif, de votre audience, de votre secteur et de la campagne souhaitée. Il n'existe pas un budget unique adapté à toutes les entreprises. L'approche consiste à définir un budget cohérent avec votre objectif commercial.",
  },
  {
    question: "La publicité Facebook peut-elle m'aider à trouver des clients ?",
    answer:
      "Oui, une campagne correctement ciblée peut contribuer à attirer des personnes intéressées par votre offre. Cependant, les résultats dépendent également de votre produit, de votre offre, de votre message, de votre audience et du parcours proposé au prospect.",
  },
  {
    question: "Quelle est la différence entre publier sur Facebook et faire de la publicité ?",
    answer:
      "Une publication organique dépend principalement de la portée naturelle de votre page et de votre communauté. Une publicité Facebook permet de diffuser une annonce auprès d'une audience sélectionnée et de suivre différentes performances de la campagne.",
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

export default function PubliciteFacebookPage() {
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
                Publicité Facebook et Instagram
                <br />

                <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  pour attirer plus de clients
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
                Développez votre visibilité grâce à la publicité Facebook et
                Instagram. PayLink vous aide à créer des campagnes digitales
                ciblées pour présenter votre entreprise aux bonnes personnes,
                attirer des prospects et créer davantage d'opportunités
                commerciales.
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

                    <Target size={24} className="text-yellow-400" />
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
          INTRO RDC
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-sm font-bold uppercase tracking-wider text-yellow-400">
              Publicité Facebook en RDC
            </p>

            <h2 className="mt-3 text-center text-3xl font-black sm:text-4xl">
              Faites connaître votre entreprise auprès d'une audience ciblée
            </h2>

            <div className="mt-6 space-y-4 text-left leading-relaxed text-slate-300">
              <p>
                La publicité Facebook est devenue un moyen important pour les
                entreprises qui souhaitent développer leur visibilité sur
                Internet. Au lieu de compter uniquement sur la portée naturelle
                des publications, une campagne publicitaire permet de présenter
                une offre à une audience définie selon les objectifs de
                l'entreprise.
              </p>

              <p>
                En RDC, les entrepreneurs et les entreprises peuvent utiliser
                Facebook et Instagram pour faire connaître leurs produits,
                promouvoir leurs services, générer des prospects ou encourager
                les clients à prendre contact avec eux.
              </p>

              <p>
                Une campagne efficace ne repose toutefois pas uniquement sur
                le budget publicitaire. Le ciblage, le message, l'offre, le
                contenu et le parcours proposé au prospect jouent également un
                rôle important.
              </p>
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
                meilleure stratégie. Le ciblage permet de concentrer votre
                communication sur une audience pertinente.
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
              Une publicité pensée pour votre objectif
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
          FACEBOOK / INSTAGRAM
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Facebook Ads et Instagram Ads
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Utilisez Facebook et Instagram pour développer votre
                acquisition
              </h2>

              <p className="mt-6 leading-relaxed text-slate-300">
                Facebook et Instagram permettent aux entreprises de présenter
                leurs offres à des personnes susceptibles de s'y intéresser.
                Selon votre activité, les campagnes peuvent servir à
                développer la notoriété, générer des prospects, recevoir des
                demandes de contact ou promouvoir une offre.
              </p>

              <p className="mt-4 leading-relaxed text-slate-400">
                Notre objectif est de relier la publicité à votre stratégie
                globale de marketing digital afin que les visiteurs attirés par
                vos annonces puissent facilement comprendre votre offre et
                passer à l'action.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Facebook Ads pour développer votre visibilité",
                  "Instagram Ads pour présenter vos produits et services",
                  "Campagnes orientées acquisition clients",
                  "Messages publicitaires adaptés à votre audience",
                  "Suivi des performances des campagnes",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-yellow-400"
                    />

                    <span className="text-sm text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-yellow-400/10 p-4 text-yellow-400">
                  <Megaphone size={30} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Objectif
                  </p>

                  <h3 className="text-2xl font-black">
                    De l'attention à l'action
                  </h3>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Votre annonce attire l'attention",
                  "Votre audience découvre votre offre",
                  "Le prospect comprend votre proposition",
                  "Le prospect prend contact ou passe à l'action",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-xs font-bold text-yellow-400">
                      {index + 1}
                    </span>

                    <span className="text-sm text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
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
              Comment ça fonctionne
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              De votre entreprise à vos futurs clients
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Chaque campagne commence par la compréhension de votre activité
              et se poursuit par le ciblage, la création et l'optimisation.
            </p>
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
                  <h3 className="text-lg font-bold">{step.title}</h3>

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
          FAQ
      ====================================================== */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Questions fréquentes
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Tout savoir sur la publicité Facebook et Instagram
            </h2>

            <p className="mt-5 leading-relaxed text-slate-400">
              Voici les principales questions que se posent les entreprises
              avant de lancer une campagne publicitaire.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6"
              >
                <summary className="cursor-pointer list-none pr-8 font-bold text-white">
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
              href="/services"
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
            >
              <h3 className="text-xl font-bold">
                Tous nos services
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Découvrez nos services de marketing digital pour développer
                votre visibilité et votre acquisition clients.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                Voir les services
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              href="/marketing-digital"
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30"
            >
              <h3 className="text-xl font-bold">
                Marketing digital
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Découvrez comment construire une stratégie digitale complète
                autour de votre entreprise.
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
                Découvrez comment transformer votre visibilité en véritables
                opportunités commerciales.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                Découvrir
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
                Votre prochain client peut déjà être sur Facebook
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Donnez à votre entreprise la visibilité nécessaire pour être
                découverte par davantage de personnes grâce à une campagne
                publicitaire adaptée à votre objectif.
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
