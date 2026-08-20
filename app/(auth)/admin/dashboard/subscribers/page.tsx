"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Sparkles,
  Mail,
  User,
  Phone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  BellRing,
} from "lucide-react";

export default function SubscribePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi des données à votre API/Backend
    setIsSubmitted(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#061221] py-16 lg:py-24 text-white flex items-center justify-center">
      {/* =========================
          BACKGROUND EFFECTS
      ========================== */}
      <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-yellow-500/15 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.06),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* =====================================================
              LEFT — VALUE PROPOSITION & PROOF
          ====================================================== */}
          <div className="lg:col-span-7">
            {/* Hook Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-300 backdrop-blur-md">
              <Sparkles size={16} className="text-yellow-400" />
              <span>Rejoignez le Club Privé • Offres Exclusives</span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Restez informé de nos{" "}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                meilleures opportunités.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Abonnez-vous à notre liste VIP pour recevoir en avant-première nos conseils marketing, 
              nos nouvelles fonctionnalités et des offres exclusives réservées à nos membres.
            </p>

            {/* Benefits List */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.04] p-4 backdrop-blur-md">
                <div className="mt-0.5 rounded-xl bg-yellow-400/10 p-2.5 text-yellow-400">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Conseils Stratégiques</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Des astuces concrètes pour augmenter vos ventes chaque semaine.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.04] p-4 backdrop-blur-md">
                <div className="mt-0.5 rounded-xl bg-blue-400/10 p-2.5 text-blue-400">
                  <BellRing size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Accès Avant-Première</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Testez nos outils automatisés par IA avant tout le monde.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-yellow-400" />
                Zero Spam
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-yellow-400" />
                Désabonnement en 1 clic
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-yellow-400" />
                Données 100% sécurisées
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — SUBSCRIPTION FORM CARD
          ====================================================== */}
          <div className="relative lg:col-span-5">
            <div className="relative rounded-3xl border border-white/10 bg-[#08192D]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              
              {!isSubmitted ? (
                <>
                  <div className="border-b border-white/10 pb-6">
                    <span className="rounded-full bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-400">
                      Inscription Rapide
                    </span>
                    <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                      Devenir Abonné
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Remplissez vos informations ci-dessous.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Nom complet */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Nom Complet
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ex: Jean Dupont"
                          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-yellow-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Adresse E-mail
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jean@exemple.com"
                          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-yellow-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
                        />
                      </div>
                    </div>

                    {/* Téléphone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Numéro WhatsApp (Optionnel)
                      </label>
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                          <Phone size={18} />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+243 ..."
                          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-yellow-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group w-full mt-2 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 text-base font-bold text-[#061221] shadow-xl shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 cursor-pointer"
                    >
                      <Users size={20} />
                      <span>Rejoindre la communauté</span>
                      <ArrowRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-white">
                    Félicitations !
                  </h3>
                  <p className="mt-3 text-sm text-slate-300">
                    Votre inscription a été validée avec succès. Vous recevrez très bientôt nos premières informations.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-xs font-bold text-yellow-400 hover:underline"
                  >
                    Inscrire une autre personne
                  </button>
                </div>
              )}

              {/* Security note */}
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Confidentialité garantie à 100%</span>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl border border-yellow-400/30 bg-[#0c1f38] p-4 shadow-xl backdrop-blur-md sm:flex">
              <div className="rounded-xl bg-yellow-400/15 p-2.5 text-yellow-400">
                <Users size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">+2,500 Abonnés</h4>
                <p className="text-xs text-slate-400">Ont rejoint ce mois-ci</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}