"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Nom complet trop court"),
    companyName: z.string().min(2, "Nom d'entreprise requis"),
    email: z.string().email("Adresse email invalide"),
    phone: z.string().min(9, "Numéro de téléphone invalide"),
    password: z.string().min(8, "Au moins 8 caractères requis"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(Boolean, {
      message: "Veuillez accepter les conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setMessage("");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://paylink.coderise-solution.com/api"}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: data.fullName,
            companyName: data.companyName,
            email: data.email,
            phone: data.phone,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Une erreur est survenue.");
        setMessageType("error");
        return;
      }

      if (result.token) {
        document.cookie = `token=${encodeURIComponent(result.token)}; path=/; max-age=1800; SameSite=Lax`;
        localStorage.setItem("token", result.token);
      }

      setMessage("Compte créé avec succès ! Redirection...");
      setMessageType("success");
      reset();

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Impossible de joindre le serveur.");
      setMessageType("error");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100">
      {/* HEADER EFFECT */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Création de compte rapide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Commencez gratuitement
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Remplissez vos informations pour accéder au tableau de bord
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* MESSAGE FLASH */}
        {message && (
          <div
            className={`flex items-center gap-3 rounded-2xl p-4 text-xs sm:text-sm font-semibold transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
              messageType === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-sm shadow-emerald-100"
                : "bg-rose-50 text-rose-800 border border-rose-200/80 shadow-sm shadow-rose-100"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            )}
            <span>{message}</span>
          </div>
        )}

        {/* NOM & ENTREPRISE */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Nom complet
            </label>
            <div className="relative group">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                {...register("fullName")}
                placeholder="Jean Dupont"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Entreprise
            </label>
            <div className="relative group">
              <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                {...register("companyName")}
                placeholder="Mon entreprise"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.companyName.message}</p>
            )}
          </div>
        </div>

        {/* EMAIL & TELEPHONE */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Email
            </label>
            <div className="relative group">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="email"
                {...register("email")}
                placeholder="contact@mail.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Téléphone
            </label>
            <div className="relative group">
              <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                {...register("phone")}
                placeholder="+243 970 000 000"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* MOT DE PASSE & CONFIRMATION */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Mot de passe
            </label>
            <div className="relative group">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="8+ caractères"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Confirmation
            </label>
            <div className="relative group">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Répétez"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* CONDITIONS */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-0.5 h-4 w-4 rounded-md border-slate-300 text-amber-500 focus:ring-amber-400 transition"
            />
            <span className="text-xs leading-relaxed text-slate-600">
              J'accepte les{" "}
              <Link href="/terms" className="font-semibold text-amber-600 hover:text-amber-700 underline underline-offset-2">
                conditions d'utilisation
              </Link>{" "}
              et la politique de confidentialité.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* BOUTON SOUMISSION */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-200 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
          ) : (
            <>
              <span>Créer mon compte gratuitement</span>
              <ArrowRight className="w-4 h-4 text-amber-400 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>

        {/* SÉPARATEUR */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-slate-200/80" />
          <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">OU</span>
          <div className="h-px flex-1 bg-slate-200/80" />
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continuer avec Google</span>
        </button>

        {/* FOOTER SÉCURITÉ */}
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50/80 border border-slate-100 p-3 text-xs text-slate-500 mt-4">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Données chiffrées & connexions hautement sécurisées.</span>
        </div>
      </form>
    </div>
  );
}