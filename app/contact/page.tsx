"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const whatsappNumbers = [
  {
    number: "+243 995 271 831",
    href: "https://wa.me/243995271831",
  },
  {
    number: "+243 899 864 081",
    href: "https://wa.me/243899864081",
  },
];

const emails = [
  {
    email: "africoms879@gmail.com",
    label: "Contact général",
  },
  {
    email: "jiresselusa127@gmail.com",
    label: "Contact direct",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // Démonstration uniquement.
    // À remplacer plus tard par votre API d'envoi d'email.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    setSubmitted(true);

    e.currentTarget.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#08192D]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#061221] py-20 lg:py-28">

        {/* Background */}
        <div className="absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-yellow-400/10 blur-[140px]" />

        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-300">
              <Sparkles size={15} />
              Parlons de votre activité
            </div>

            {/* Title */}
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transformons vos idées en{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                opportunités.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Une question, un projet ou besoin d'aide pour développer votre
              présence digitale ? Notre équipe est disponible pour vous
              accompagner.
            </p>

          </div>

        </div>
      </section>


      {/* =========================================================
          CONTACT DIRECT
      ========================================================= */}
      <section className="relative -mt-8 pb-8">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-5 md:grid-cols-3">

            {/* WhatsApp */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

              <div className="flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <MessageCircle size={27} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Rapide
                </span>

              </div>

              <h2 className="mt-6 text-xl font-extrabold">
                WhatsApp
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Échangez directement avec notre équipe pour obtenir une
                réponse rapidement.
              </p>

              <div className="mt-6 space-y-3">

                {whatsappNumbers.map((item) => (
                  <a
                    key={item.number}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span>{item.number}</span>

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </a>
                ))}

              </div>

            </div>


            {/* Téléphone */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

              <div className="flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Phone size={27} />
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Direct
                </span>

              </div>

              <h2 className="mt-6 text-xl font-extrabold">
                Appel téléphonique
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Pour une discussion plus détaillée, contactez-nous
                directement par téléphone.
              </p>

              <div className="mt-6">

                <a
                  href="tel:+243910128046"
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span>+243 910 128 046</span>

                  <ArrowRight size={17} />
                </a>

              </div>

            </div>


            {/* Email */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

              <div className="flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Mail size={27} />
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Email
                </span>

              </div>

              <h2 className="mt-6 text-xl font-extrabold">
                Écrivez-nous
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Pour les demandes professionnelles, collaborations ou
                informations générales.
              </p>

              <div className="mt-6 space-y-3">

                {emails.map((item) => (
                  <a
                    key={item.email}
                    href={`mailto:${item.email}`}
                    className="block rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-amber-200 hover:bg-amber-50"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </span>

                    <span className="mt-1 block truncate text-sm font-semibold text-slate-700">
                      {item.email}
                    </span>
                  </a>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FORMULAIRE + INFORMATIONS
      ========================================================= */}
      <section className="py-16 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">


            {/* =====================================================
                LEFT
            ====================================================== */}
            <div>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                Une question ?
              </span>

              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Parlons de votre projet.
              </h2>

              <p className="mt-5 leading-relaxed text-slate-600">
                Expliquez-nous votre besoin. Que vous cherchiez à améliorer
                votre visibilité, attirer davantage de clients ou développer
                votre activité en ligne, nous sommes là pour vous écouter.
              </p>


              {/* Informations */}
              <div className="mt-8 space-y-4">

                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#08192D]">
                    <Clock3 size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Réponse rapide
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Nous faisons notre possible pour répondre rapidement à
                      chaque demande.
                    </p>
                  </div>

                </div>


                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#08192D]">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Service digital
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Nous accompagnons les entrepreneurs et entreprises
                      dans leur développement digital.
                    </p>
                  </div>

                </div>


                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

                  <div className="flex gap-3">

                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <p className="text-sm leading-relaxed text-amber-900">
                      Vous ne savez pas quelle solution choisir ? Expliquez
                      simplement votre situation et nous vous orienterons
                      vers l'approche la plus adaptée.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =====================================================
                FORM
            ====================================================== */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">

              <div className="mb-7">

                <h2 className="text-2xl font-black">
                  Envoyez-nous un message
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Remplissez les informations ci-dessous et expliquez-nous
                  comment nous pouvons vous aider.
                </p>

              </div>


              {/* Success */}
              {submitted && (
                <div className="mb-6 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>

                    <p className="text-sm font-bold text-emerald-800">
                      Message enregistré
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-emerald-700">
                      Votre demande a été prise en compte. Nous vous
                      recontacterons prochainement.
                    </p>

                  </div>

                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Nom + Email */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Nom complet
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Ex. Jean Dupont"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#08192D] focus:bg-white focus:ring-4 focus:ring-[#08192D]/5"
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Adresse email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vous@entreprise.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#08192D] focus:bg-white focus:ring-4 focus:ring-[#08192D]/5"
                    />

                  </div>

                </div>


                {/* Téléphone */}
                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Téléphone
                    <span className="ml-1 font-normal text-slate-400">
                      (facultatif)
                    </span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+243 ..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#08192D] focus:bg-white focus:ring-4 focus:ring-[#08192D]/5"
                  />

                </div>


                {/* Sujet */}
                <div>

                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Sujet
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-[#08192D] focus:bg-white focus:ring-4 focus:ring-[#08192D]/5"
                  >
                    <option value="" disabled>
                      Sélectionnez un sujet
                    </option>

                    <option value="marketing">
                      Marketing digital
                    </option>

                    <option value="acquisition">
                      Acquisition de clients
                    </option>

                    <option value="website">
                      Création / amélioration de site
                    </option>

                    <option value="partnership">
                      Partenariat
                    </option>

                    <option value="support">
                      Assistance
                    </option>

                    <option value="other">
                      Autre demande
                    </option>

                  </select>

                </div>


                {/* Message */}
                <div>

                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Votre message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Expliquez-nous votre besoin, votre activité ou votre projet..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#08192D] focus:bg-white focus:ring-4 focus:ring-[#08192D]/5"
                  />

                </div>


                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#08192D] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#08192D]/10 transition hover:bg-[#102c4e] disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande

                      <Send
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>


                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  En envoyant ce formulaire, vous acceptez que les
                  informations fournies soient utilisées uniquement pour
                  répondre à votre demande.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="border-t border-slate-200 bg-white py-16">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <MessageCircle size={27} />
          </div>

          <h2 className="mt-5 text-3xl font-black">
            Vous préférez discuter directement ?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            Contactez-nous sur WhatsApp pour commencer la conversation
            directement avec notre équipe.
          </p>

          <a
            href="https://wa.me/243995271831"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl"
          >
            <MessageCircle size={19} />
            Nous écrire sur WhatsApp
            <ArrowRight size={17} />
          </a>

        </div>

      </section>

    </main>
  );
}