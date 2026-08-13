import Link from "next/link";
import {
  MapPin,
  Bot,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "1. Définir votre zone",
    description:
      "Configurez la géolocalisation de votre entreprise et identifiez votre profil de client idéal.",
  },
  {
    icon: Bot,
    title: "2. Création de campagne IA",
    description:
      "Notre plateforme intelligente conçoit vos publicités captivantes (visuels & textes accrocheurs).",
  },
  {
    icon: Zap,
    title: "3. Diffusion ciblée",
    description:
      "Vos publicités apparaissent sur les téléphones des personnes situées exactement dans votre ville.",
  },
  {
    icon: TrendingUp,
    title: "4. Recommandations & Croissance",
    description:
      "Consultez les résultats en temps réel et appliquez nos conseils IA pour maximiser vos ventes.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#08192D] py-20 lg:py-28 text-white">
      {/* Effet décoratif d'arrière-plan */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 text-sm font-semibold text-yellow-400">
            Processus Ultra-Simple
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Propulsez votre entreprise en{" "}
            <span className="text-yellow-400">4 étapes automatisées</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            De la création de vos publicités géolocalisées à l'analyse de vos revenus,
            notre agence s'occupe de tout.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-white/10"
              >
                {/* Number */}
                <div className="absolute right-6 top-6 text-5xl font-black text-white/10 select-none">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-[#08192D] shadow-lg shadow-yellow-400/20">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-8 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 leading-relaxed text-slate-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/dashboard/contacts"
            className="inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-bold text-[#08192D] shadow-xl transition-all hover:bg-yellow-300 hover:scale-105"
          >
            Lancer ma première campagne
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </section>
  );
}