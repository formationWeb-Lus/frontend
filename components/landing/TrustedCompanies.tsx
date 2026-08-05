import Image from "next/image";

const paymentMethods = [
  {
    name: "Airtel Money",
    logo: "/icons/airtel.png",
  },
  {
    name: "Orange Money",
    logo: "/icons/orange.png",
  },
  {
    name: "M-Pesa",
    logo: "/icons/mpsa.png",
  },
  {
    name: "Afrimoney",
    logo: "/icons/afrimoney.png",
  },
  {
    name: "Visa",
    logo: "/icons/visa.jpg",
  },
];

const stats = [
  {
    value: "99.9%",
    label: "Disponibilité",
  },
  {
    value: "< 5 sec",
    label: "Temps moyen de paiement",
  },
  {
    value: "24/7",
    label: "Support",
  },
  {
    value: "100%",
    label: "Paiements sécurisés",
  },
];

export default function TrustedCompanies() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Titre */}
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Moyens de paiement
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Acceptez les paiements avec les services
            <span className="block text-[#08192D]">
              les plus utilisés en Afrique
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            PayLink vous permet d'intégrer plusieurs solutions de paiement
            afin d'offrir une meilleure expérience à vos clients.
          </p>
        </div>

        {/* Logos */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <Image
                src={method.logo}
                alt={method.name}
                width={60}
                height={60}
              />

              <p className="mt-4 font-semibold text-slate-700">
                {method.name}
              </p>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl bg-[#08192D] p-8 text-center text-white"
            >
              <h3 className="text-4xl font-extrabold text-yellow-400">
                {stat.value}
              </h3>

              <p className="mt-3 text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}