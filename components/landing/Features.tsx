import Link from "next/link";
import {
  CreditCard,
  Link2,
  Code2,
  BarChart3,
  Webhook,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Pages de paiement",
    description:
      "Créez des pages de paiement professionnelles et partagez-les avec vos clients en quelques secondes.",
    icon: CreditCard,
  },
  {
    title: "Liens de paiement",
    description:
      "Générez un lien sécurisé et envoyez-le via WhatsApp, Facebook, Email ou SMS.",
    icon: Link2,
  },
  {
    title: "API REST",
    description:
      "Connectez facilement PayLink à votre site web, application mobile ou logiciel.",
    icon: Code2,
  },
  {
    title: "Tableau de bord",
    description:
      "Suivez vos revenus, vos paiements, vos clients et vos statistiques en temps réel.",
    icon: BarChart3,
  },
  {
    title: "Webhooks",
    description:
      "Recevez automatiquement les notifications de paiement dans votre application.",
    icon: Webhook,
  },
  {
    title: "Paiements sécurisés",
    description:
      "Toutes les transactions sont protégées grâce aux meilleures pratiques de sécurité.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Fonctionnalités
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 lg:text-5xl">
            Tout ce dont vous avez besoin
            <span className="block text-[#08192D]">
              pour accepter des paiements
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Une plateforme complète pour créer des pages de paiement,
            intégrer une API, suivre vos ventes et développer votre entreprise.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-yellow-300
                  hover:shadow-2xl
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#08192D]
                    text-yellow-400
                    transition
                    group-hover:scale-110
                  "
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {feature.description}
                </p>

                <Link
                  href="#"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-[#08192D]
                    transition
                    hover:text-yellow-600
                  "
                >
                  En savoir plus

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
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