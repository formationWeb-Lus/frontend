"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* EN-TÊTE */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Besoin d'aide ?
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#08192D] tracking-tight">
            Contactez-nous
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Notre équipe est disponible pour répondre à toutes vos questions. Choisissez le canal qui vous convient le mieux.
          </p>
        </div>

        {/* CARTES DE CONTACT DIRECT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* WHATSAPP */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <MessageCircle size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#08192D]">WhatsApp</h2>
                <p className="text-xs text-slate-500 mt-1">Discutez directement avec nous sur WhatsApp.</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href="https://wa.me/243995271831"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-sm font-semibold transition border border-slate-100"
              >
                <span>+243 995 271 831</span>
                <span className="text-xs font-normal bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Discuter</span>
              </a>

              <a
                href="https://wa.me/243899864081"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-sm font-semibold transition border border-slate-100"
              >
                <span>+243 899 864 081</span>
                <span className="text-xs font-normal bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Discuter</span>
              </a>
            </div>
          </div>

          {/* APPELS TELEPHONIQUES */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Phone size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#08192D]">Appel Direct</h2>
                <p className="text-xs text-slate-500 mt-1">Ligne dédiée aux appels standard (sans WhatsApp).</p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="tel:+243910128046"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-sm font-semibold transition border border-slate-100"
              >
                <span>+243 910 128 046</span>
                <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Appeler</span>
              </a>
            </div>
          </div>

          {/* ADRESSES EMAIL */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Mail size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#08192D]">Email</h2>
                <p className="text-xs text-slate-500 mt-1">Écrivez-nous pour toute demande formelle.</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href="mailto:africoms879@gmail.com"
                className="block p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-700 text-xs sm:text-sm font-semibold transition truncate border border-slate-100"
              >
                africoms879@gmail.com
              </a>

              <a
                href="mailto:jiresselusa127@gmail.com"
                className="block p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-700 text-xs sm:text-sm font-semibold transition truncate border border-slate-100"
              >
                jiresselusa127@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* FORMULAIRE DE CONTACT */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm max-w-3xl mx-auto">
          <h2 className="text-xl font-extrabold text-[#08192D] mb-2">
            Envoyez-nous un message
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
          </p>

          {submitted && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <span>Votre message a été envoyé avec succès ! Nous vous recontacterons sous peu.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#08192D]/20 focus:border-[#08192D] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email</label>
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#08192D]/20 focus:border-[#08192D] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sujet</label>
              <input
                type="text"
                required
                placeholder="Objet de votre message"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#08192D]/20 focus:border-[#08192D] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Comment pouvons-nous vous aider ?"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#08192D]/20 focus:border-[#08192D] transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#08192D]/10 transition hover:bg-[#102c4e] active:scale-[0.98]"
            >
              <span>Envoyer le message</span>
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}