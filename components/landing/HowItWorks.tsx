import {
  Building2,
  Package,
  Link2,
  Wallet,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Créer votre entreprise",
    description:
      "Inscrivez votre entreprise et configurez votre profil en quelques minutes.",
  },
  {
    icon: Package,
    title: "Ajouter vos produits",
    description:
      "Créez vos produits ou services avec leur prix et leur devise.",
  },
  {
    icon: Link2,
    title: "Créer un lien de paiement",
    description:
      "Générez une page ou un lien de paiement sécurisé à partager avec vos clients.",
  },
  {
    icon: Wallet,
    title: "Recevoir vos paiements",
    description:
      "Suivez vos transactions en temps réel depuis votre tableau de bord.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#08192D] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Comment ça marche
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Commencez à recevoir des paiements
            <span className="block text-yellow-400">
              en seulement 4 étapes
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            PayLink simplifie la gestion des paiements pour toutes les entreprises,
            des petites boutiques aux grandes organisations.
          </p>
        </div>

        {/* Steps */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400"
              >
                {/* Number */}

                <div className="absolute right-6 top-6 text-5xl font-black text-white/10">
                  0{index + 1}
                </div>

                {/* Icon */}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-[#08192D]">
                  <Icon size={30} />
                </div>

                {/* Title */}

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="mt-5 leading-8 text-slate-300">
                  {step.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-yellow-400">
                  Étape suivante

                  <ArrowRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <div className="mt-20 text-center">
          <a
            href="/register"
            className="inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-[#08192D] transition hover:bg-yellow-300"
          >
            Commencer gratuitement

            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}