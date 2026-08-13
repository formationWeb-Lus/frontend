import Link from "next/link";
import {
  Target,
  Bot,
  MessageSquare,
  BarChart3,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Publicité Géolocalisée",
    description:
      "Touchez les clients exacts qui se trouvent à proximité de votre commerce ou établissement.",
    icon: MapPin,
    tag: "Haute précision",
  },
  {
    title: "Intelligence Artificielle & IA",
    description:
      "Notre plateforme crée, gère et optimise vos campagnes en temps réel pour un impact maximal.",
    icon: Bot,
    tag: "Auto-piloté",
  },
  {
    title: "Tunnel Conversion WhatsApp",
    description:
      "Transformez les vues en conversations directes et en commandes WhatsApp instantanées.",
    icon: MessageSquare,
    tag: "Ventes directes",
  },
  {
    title: "Analyses & Recommandations",
    description:
      "Suivez vos performances et recevez des conseils clairs de l'IA pour augmenter votre chiffre d'affaires.",
    icon: BarChart3,
    tag: "Tableau de bord",
  },
  {
    title: "Campagnes Multi-canaux",
    description:
      "Diffusez vos visuels et vidéos sur Facebook, Instagram et TikTok depuis un seul endroit.",
    icon: Target,
    tag: "Visibilité 360°",
  },
  {
    title: "Rapport de Rentabilité (ROI)",
    description:
      "Sachez exactement combien chaque dollar investi en publicité vous apporte en nouveaux clients.",
    icon: Sparkles,
    tag: "Transparence totale",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08192D]">
            <Sparkles size={14} className="text-yellow-600" />
            Plateforme Marketing Intelligente
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 lg:text-5xl">
            Attirez plus de clients chez vous avec une{" "}
            <span className="bg-gradient-to-r from-[#08192D] to-yellow-600 bg-clip-text text-transparent">
              visibilité ciblée et automatique
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Une technologie de pointe associée à notre agence pour analyser,
            créer vos publicités et recommander les meilleures actions pour faire grandir votre activité.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#08192D] text-yellow-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={30} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 group-hover:bg-yellow-100 group-hover:text-yellow-800">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-600">
                  {feature.description}
                </p>

                <Link
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 font-bold text-[#08192D] transition hover:text-yellow-600"
                >
                  Découvrir cette solution
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}