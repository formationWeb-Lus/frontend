import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Megaphone,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Marketing Digital | Conseils pour attirer plus de clients | PayLink",
  description:
    "Découvrez les conseils PayLink pour développer votre entreprise grâce au marketing digital, attirer de nouveaux clients, améliorer votre visibilité et augmenter vos ventes.",

  keywords: [
    "blog marketing digital",
    "conseils marketing digital",
    "marketing digital RDC",
    "comment trouver des clients",
    "acquisition clients",
    "publicité Facebook",
    "marketing pour PME",
    "vente en ligne",
    "communication digitale",
    "entrepreneuriat RDC",
  ],

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "Blog PayLink | Marketing digital et acquisition de clients",
    description:
      "Conseils pratiques pour développer votre visibilité, attirer des clients et faire grandir votre entreprise grâce au digital.",
    type: "website",
  },
};

const categories = [
  {
    name: "Marketing digital",
    icon: TrendingUp,
  },
  {
    name: "Acquisition clients",
    icon: Target,
  },
  {
    name: "Publicité",
    icon: Megaphone,
  },
  {
    name: "Vente en ligne",
    icon: Search,
  },
];

const articles = [
  {
    category: "Acquisition clients",
    title: "Comment trouver de nouveaux clients grâce au marketing digital ?",
    description:
      "Découvrez les principales stratégies pour attirer de nouveaux clients et développer votre activité grâce aux canaux digitaux.",
    href: "/blog/comment-trouver-de-nouveaux-clients",
    readTime: "7 min",
    featured: true,
  },
  {
    category: "Marketing digital",
    title: "Pourquoi votre entreprise doit être visible sur Internet",
    description:
      "Comprenez pourquoi la présence digitale est devenue essentielle pour permettre à vos clients de découvrir votre entreprise.",
    href: "/blog/importance-visibilite-en-ligne",
    readTime: "5 min",
    featured: false,
  },
  {
    category: "Publicité",
    title: "Publicité Facebook : comment commencer quand on est entrepreneur ?",
    description:
      "Un guide simple pour comprendre les bases de la publicité Facebook et éviter de gaspiller son budget.",
    href: "/blog/publicite-facebook-pour-entrepreneurs",
    readTime: "8 min",
    featured: false,
  },
  {
    category: "Acquisition clients",
    title: "5 erreurs qui empêchent les entreprises de trouver des clients",
    description:
      "Découvrez les erreurs fréquentes qui peuvent limiter vos résultats marketing et comment les éviter.",
    href: "/blog/erreurs-acquisition-clients",
    readTime: "6 min",
    featured: false,
  },
  {
    category: "Vente en ligne",
    title: "Comment vendre ses produits sur Internet quand on débute ?",
    description:
      "Les étapes essentielles pour commencer à présenter et vendre vos produits en ligne.",
    href: "/blog/vendre-produits-internet",
    readTime: "7 min",
    featured: false,
  },
  {
    category: "Marketing digital",
    title: "Marketing digital pour PME : par où commencer ?",
    description:
      "Une méthode simple pour construire progressivement une stratégie digitale adaptée à une petite entreprise.",
    href: "/blog/marketing-digital-pme",
    readTime: "9 min",
    featured: false,
  },
];

export default function BlogPage() {
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

            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
              <BookOpen size={16} />
              Blog PayLink
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Des idées pour
              <br />

              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                trouver plus de clients.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Conseils pratiques, stratégies marketing et ressources pour
              aider les entrepreneurs et les entreprises à développer leur
              visibilité, attirer des clients et faire grandir leur activité.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-8">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-wrap justify-center gap-3">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={`/blog?category=${encodeURIComponent(category.name)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-yellow-400/30 hover:bg-yellow-400/5 hover:text-yellow-400"
                >
                  <Icon size={16} />
                  {category.name}
                </Link>
              );

            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURED ARTICLE
      ====================================================== */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              À la une
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Commencez par ici
            </h2>

          </div>


          {articles
            .filter((article) => article.featured)
            .map((article) => (

              <Link
                key={article.title}
                href={article.href}
                className="group block overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 transition hover:border-yellow-400/40"
              >

                <div className="grid lg:grid-cols-2">

                  {/* Visual */}
                  <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-400/10 to-blue-500/10">

                    <div className="absolute h-64 w-64 rounded-full bg-yellow-400/10 blur-[90px]" />

                    <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 shadow-2xl">
                      <Target size={52} />
                    </div>

                  </div>


                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 sm:p-12">

                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                      {article.category}
                    </span>

                    <h3 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
                      {article.title}
                    </h3>

                    <p className="mt-5 leading-relaxed text-slate-400">
                      {article.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-yellow-400">

                      Lire l'article

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />

                      <span className="ml-2 font-normal text-slate-500">
                        {article.readTime}
                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

        </div>
      </section>


      {/* =====================================================
          ARTICLES
      ====================================================== */}
      <section className="border-y border-white/5 bg-slate-900/30 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10">

            <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Nos conseils
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Apprenez à développer votre activité
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Des contenus conçus pour répondre aux vraies questions que se
              posent les entrepreneurs lorsqu'ils cherchent à développer leur
              activité.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {articles
              .filter((article) => !article.featured)
              .map((article) => (

                <Link
                  key={article.title}
                  href={article.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:-translate-y-1 hover:border-yellow-400/30"
                >

                  {/* Article visual */}
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">

                      {article.category === "Publicité" ? (
                        <Megaphone size={28} />
                      ) : article.category === "Vente en ligne" ? (
                        <TrendingUp size={28} />
                      ) : (
                        <Target size={28} />
                      )}

                    </div>

                  </div>


                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">

                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                      {article.category}
                    </span>

                    <h3 className="mt-3 text-xl font-bold leading-tight">
                      {article.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {article.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">

                      <span className="text-xs text-slate-500">
                        Lecture : {article.readTime}
                      </span>

                      <span className="inline-flex items-center gap-1 text-sm font-bold text-yellow-400">

                        Lire

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />

                      </span>

                    </div>

                  </div>

                </Link>

              ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          SEO / CONTENT STATEMENT
      ====================================================== */}
      <section className="py-20">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
            <BookOpen size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-black sm:text-4xl">
            Le marketing digital n'est pas réservé aux grandes entreprises.
          </h2>

          <p className="mt-6 leading-relaxed text-slate-400">
            Avec les bons outils, la bonne stratégie et un message adapté à
            votre audience, une petite entreprise peut elle aussi développer
            sa visibilité, attirer de nouveaux prospects et construire une
            clientèle.
          </p>

          <p className="mt-4 leading-relaxed text-slate-400">
            Sur le blog PayLink, nous partageons des méthodes concrètes pour
            vous aider à mieux comprendre le marketing digital et à l'utiliser
            pour votre entreprise.
          </p>

        </div>
      </section>


      {/* =====================================================
          NEWSLETTER / CTA
      ====================================================== */}
      <section className="border-t border-white/5 py-20">

        <div className="mx-auto max-w-5xl px-6">

          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 p-8 text-center sm:p-12">

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/10 blur-[80px]" />

            <div className="relative">

              <Megaphone
                size={38}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                Prêt à faire connaître votre entreprise ?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-300">
                Découvrez comment PayLink peut vous aider à développer votre
                visibilité et à attirer davantage de clients.
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
                  Découvrir nos services
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}