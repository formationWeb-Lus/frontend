"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setMessage("");
      setMessageType("");

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://paylink.coderise-solution.com/api";
      const loginUrl = `${API_URL.replace(/\/+$/, "")}/auth/login`;

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      let result: any = {};
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text || "Réponse invalide du serveur." };
      }

      if (!response.ok) {
        setMessage(result?.message || result?.error || `Erreur serveur (${response.status}).`);
        setMessageType("error");
        return;
      }

      if (!result?.success) {
        setMessage(result?.message || "Connexion impossible.");
        setMessageType("error");
        return;
      }

      if (!result?.token) {
        setMessage("Le serveur n'a pas retourné de token.");
        setMessageType("error");
        return;
      }

      localStorage.setItem("token", result.token);
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      document.cookie = `token=${encodeURIComponent(result.token)}; path=/; max-age=604800; SameSite=Lax`;

      setMessage("Connexion réussie. Redirection...");
      setMessageType("success");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error) {
      console.error("LOGIN ERROR :", error);
      setMessage("Impossible de contacter le serveur. Vérifiez la connexion.");
      setMessageType("error");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100">
      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Espace Sécurisé</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Bon retour parmi nous
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Saisissez vos identifiants pour vous connecter
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        {/* EMAIL */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Adresse email
          </label>
          <div className="relative group">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="email"
              {...register("email")}
              placeholder="nom@email.com"
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Mot de passe
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 underline-offset-2 hover:underline transition-colors"
            >
              Oublié ?
            </Link>
          </div>
          <div className="relative group">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.password.message}</p>
          )}
        </div>

        {/* BOUTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-200 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
          ) : (
            <>
              <span>Se connecter</span>
              <ArrowRight className="w-4 h-4 text-amber-400 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>

        {/* FOOTER SÉCURITÉ */}
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50/80 border border-slate-100 p-3 text-xs text-slate-500 mt-6">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Connexion sécurisée SSL 256-bit.</span>
        </div>
      </form>
    </div>
  );
}