import Image from "next/image";

const channels = [
  { name: "Facebook Ads", logo: "/icons/facebook.png" },
  { name: "Instagram Ads", logo: "/icons/instangram.jpg" },
  { name: "TikTok Ads", logo: "/icons/tikitok.png" },
  { name: "Google Maps", logo: "/icons/googlemap.png" },
  { name: "WhatsApp Business", logo: "/icons/whatsapp.jpg" },
];

const stats = [
  {
    value: "+300%",
    label: "Augmentation de visibilité locale",
  },
  {
    value: "< 24h",
    label: "Pour lancer vos publicités géolocalisées",
  },
  {
    value: "100%",
    label: "Campagnes analysées et recommandées par IA",
  },
  {
    value: "x3",
    label: "Plus de messages WhatsApp clients",
  },
];

export default function TrustedCompanies() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Titre */}
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
            Couverture Réseaux & Canaux
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 lg:text-5xl">
            Soyez visible là où vos clients{" "}
            <span className="text-[#08192D]">passent leur journée</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Notre plateforme diffuse vos offres sur toutes les applications phares
            utilisées quotidiennement à votre geolocalisation.
          </p>
        </div>

        {/* Logos des réseaux */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-white hover:shadow-xl"
            >
              <div className="relative h-14 w-14">
                <Image
                  src={channel.logo}
                  alt={channel.name}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="mt-4 font-bold text-slate-800 text-center">
                {channel.name}
              </p>
            </div>
          ))}
        </div>

        {/* Statistiques d'impact */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-3xl bg-[#08192D] p-8 text-center text-white shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-4 -mt-4 h-20 w-20 rounded-full bg-yellow-400/10 blur-xl" />
              <h3 className="text-4xl font-black text-yellow-400 lg:text-5xl">
                {stat.value}
              </h3>

              <p className="mt-3 text-slate-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}