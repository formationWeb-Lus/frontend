
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Megaphone,
  Rocket,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  MousePointerClick,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#061221] py-14 lg:py-24">
      {/* =========================
          BACKGROUND EFFECTS
      ========================== */}
      <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-yellow-500/15 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.06),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">

          {/* =====================================================
              LEFT — MARKETING MESSAGE
          ====================================================== */}
          <div className="lg:col-span-7">

            {/* Hook */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300 backdrop-blur-md">
              <Megaphone
                size={16}
                className="text-yellow-400"
              />

              <span>
                Plus de visibilité • Plus de clients • Plus de ventes
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Vous avez des produits.
              <br />

              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Nous vous aidons à trouver les clients.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              PayLink aide les entrepreneurs et les entreprises à{" "}
              <strong className="text-white">
                attirer plus de clients grâce au marketing digital
              </strong>
              , présenter leurs offres en ligne, transformer les visiteurs
              en acheteurs et recevoir leurs paiements simplement.
            </p>

            {/* Marketing benefits */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3">
                <div className="mt-0.5 rounded-lg bg-yellow-400/10 p-2 text-yellow-400">
                  <Megaphone size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Attirez de nouveaux clients
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Faites connaître vos produits et services auprès des bonnes personnes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3">
                <div className="mt-0.5 rounded-lg bg-blue-400/10 p-2 text-blue-400">
                  <Users size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Transformez les visiteurs en clients
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Présentez vos offres avec une page conçue pour convertir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3">
                <div className="mt-0.5 rounded-lg bg-emerald-400/10 p-2 text-emerald-400">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Développez votre activité
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Suivez vos performances et améliorez vos campagnes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3">
                <div className="mt-0.5 rounded-lg bg-purple-400/10 p-2 text-purple-400">
                  <MousePointerClick size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Vendez directement en ligne
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Un lien simple pour présenter, vendre et encaisser.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 text-base font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30"
              >
                <Rocket size={20} />

                <span>
                  Développer mon activité
                </span>

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:border-yellow-400/50 hover:bg-slate-800"
              >
                Découvrir comment ça marche
              </Link>

            </div>

            {/* Trust points */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-400">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-yellow-400"
                />
                Marketing digital
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-yellow-400"
                />
                Page de vente
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-yellow-400"
                />
                Paiements en ligne
              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT — MARKETING DASHBOARD VISUAL
          ====================================================== */}
          <div className="relative lg:col-span-5">

            {/* Main Dashboard Card */}
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-7">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Performance marketing
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                    Votre activité
                  </h2>
                </div>

                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3 text-yellow-400">
                  <TrendingUp size={28} />
                </div>

              </div>

              {/* Campaign Status */}
              <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 to-amber-500/5 p-4">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-full bg-yellow-400/15 p-2.5 text-yellow-400">
                      <Megaphone size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-yellow-400">
                        CAMPAGNE ACTIVE
                      </p>

                      <p className="text-sm font-bold text-white">
                        Promotion de vos produits
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                    Active
                  </span>

                </div>

              </div>

              {/* Marketing Stats */}
              <div className="mt-5 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                  <div className="flex items-center gap-2 text-blue-400">
                    <Users size={17} />

                    <span className="text-xs text-slate-300">
                      Personnes touchées
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    12.8K
                  </h3>

                  <p className="mt-1 text-xs text-emerald-400">
                    +24,5% cette semaine
                  </p>

                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                  <div className="flex items-center gap-2 text-yellow-400">
                    <MousePointerClick size={17} />

                    <span className="text-xs text-slate-300">
                      Visites
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    1 284
                  </h3>

                  <p className="mt-1 text-xs text-emerald-400">
                    +18,2% cette semaine
                  </p>

                </div>

              </div>

              {/* Conversion */}
              <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                      <TrendingUp size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Conversions
                      </p>

                      <p className="text-lg font-bold text-white">
                        142 nouveaux clients
                      </p>
                    </div>

                  </div>

                  <span className="text-sm font-bold text-emerald-400">
                    +32%
                  </span>

                </div>

                {/* Progress bar */}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                </div>

              </div>

              {/* Payment */}
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-400">
                    <Smartphone size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-emerald-400">
                      Vente réalisée
                    </p>

                    <p className="text-sm font-bold text-white">
                      +45,00 USD
                    </p>
                  </div>

                </div>

                <Wallet
                  size={20}
                  className="text-emerald-400"
                />

              </div>

            </div>

            {/* Floating Marketing Badge */}
            <div className="absolute -left-5 -top-6 hidden items-center gap-3 rounded-2xl border border-yellow-400/30 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex">

              <div className="rounded-xl bg-yellow-400/15 p-2.5 text-yellow-400">
                <Megaphone size={22} />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white">
                  Plus de visibilité
                </h4>

                <p className="text-xs text-slate-400">
                  Votre offre touche plus de clients
                </p>
              </div>

            </div>

            {/* Floating Security Badge */}
            <div className="absolute -bottom-6 -right-5 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex">

              <div className="rounded-xl bg-emerald-500/15 p-2.5 text-emerald-400">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white">
                  Vente sécurisée
                </h4>

                <p className="text-xs text-slate-400">
                  Encaissez simplement en ligne
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
