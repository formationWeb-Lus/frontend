"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowUpRight,
  DollarSign,
  Users,
  CreditCard,
  Wallet,
  Plus,
  Loader2,
  Lock,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

import RevenueChart from "@/components/dashboard/RevenueChart";
import PaymentMethodChart from "@/components/dashboard/PaymentMethodChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

// =====================================================
// TYPES
// =====================================================

type SubscriptionStatus =
  | "FREE"
  | "PENDING"
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED";

interface Company {
  id: number;
  name: string;
  logo?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  subscriptionStatus: SubscriptionStatus;
  company: Company | null;
}

// =====================================================
// DASHBOARD
// =====================================================

export default function DashboardPage() {
  const router = useRouter();

  // =================================================
  // STATES
  // =================================================

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =================================================
  // RECUPERER L'UTILISATEUR CONNECTE
  // =================================================

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          router.replace("/login");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
          document.cookie = "token=; path=/; max-age=0";
          localStorage.removeItem("user");
          router.replace("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            result.message || "Impossible de récupérer votre compte"
          );
        }

        if (!result.user) {
          throw new Error("Utilisateur introuvable");
        }

        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
      } catch (err) {
        console.error("DASHBOARD USER ERROR:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  // =================================================
  // LOADING
  // =================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-12 w-12 rounded-full bg-amber-400/20 animate-ping" />
            <Loader2 className="h-10 w-10 animate-spin text-amber-500 relative z-10" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Chargement de votre tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  // =================================================
  // ERROR
  // =================================================

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-red-200/80 bg-red-50/50 p-6 text-center backdrop-blur-sm shadow-xl shadow-red-500/5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-4">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Impossible de charger votre compte
          </h2>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full rounded-2xl bg-[#08192D] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#08192D]/20 transition active:scale-[0.98] hover:bg-[#102c4e]"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // =================================================
  // SUBSCRIPTION & DATA HELPERS
  // =================================================

  const isActive = user.subscriptionStatus === "ACTIVE";

  const subscriptionLabel: Record<SubscriptionStatus, string> = {
    FREE: "Gratuit",
    PENDING: "En attente",
    ACTIVE: "Actif",
    EXPIRED: "Expiré",
    CANCELLED: "Annulé",
  };

  const subscriptionLabelText = subscriptionLabel[user.subscriptionStatus];

  const stats = [
    {
      title: "Revenus",
      value: "$0",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Transactions",
      value: "0",
      icon: CreditCard,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Clients",
      value: "0",
      icon: Users,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Pages de paiement",
      value: "0",
      icon: Wallet,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  // =================================================
  // NAVIGATION
  // =================================================

  function goToProducts() {
    router.push("/dashboard/products");
  }

  function goToSubscription() {
    router.push("/dashboard/subscriptions");
  }

  function goToPayment() {
    if (!isActive) {
      router.push("/dashboard/subscriptions");
      return;
    }
    router.push("/dashboard/payment");
  }

  function goToCustomers() {
    if (!isActive) {
      router.push("/dashboard/subscriptions");
      return;
    }
    router.push("/dashboard/customers");
  }

  // =================================================
  // RENDER
  // =================================================

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-12">
      {/* ================================================= */}
      {/* BANNIÈRE DE BIENVENUE */}
      {/* ================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#08192D] via-[#0d233e] to-[#08192D] p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-[#08192D]/10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md text-amber-300 border border-white/10">
              <Sparkles size={14} />
              <span>Espace Personnel</span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
              Bonjour, {user.name || "Utilisateur"} 👋
            </h1>

            <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Bienvenue sur votre espace PayLink. Gérez vos produits, vos
              paiements et vos clients depuis une seule plateforme.
            </p>

            {user.company && (
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <span>Entreprise :</span>
                  <strong className="text-white font-semibold">
                    {user.company.name}
                  </strong>
                </span>
              </div>
            )}
          </div>

          <div className="shrink-0">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-xl shadow-inner min-w-[200px]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Abonnement
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-2xl font-black tracking-tight text-white">
                  {subscriptionLabelText}
                </p>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isActive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Statut :{" "}
                <span className="font-medium text-slate-200">
                  {user.subscriptionStatus}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* BANNIÈRE D'ACTIVATION D'ABONNEMENT */}
      {/* ================================================= */}
      {!isActive && (
        <section className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start sm:items-center gap-4">
              <div className="shrink-0 rounded-2xl bg-amber-500/10 p-3 text-amber-700 border border-amber-200/50">
                <Lock size={22} />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Activez votre abonnement
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                  Votre compte est actuellement en statut{" "}
                  <strong className="font-semibold text-slate-900">
                    {user.subscriptionStatus}
                  </strong>
                  . Débloquez les paiements et les fonctionnalités avancées.
                </p>
              </div>
            </div>

            <button
              onClick={goToSubscription}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#08192D] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#08192D]/10 transition hover:bg-[#102c4e] active:scale-[0.98]"
            >
              <span>Choisir un plan</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* STATISTIQUES */}
      {/* ================================================= */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.title}
                </span>
                <div
                  className={`rounded-2xl p-2.5 border ${item.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#08192D]">
                  {item.value}
                </h2>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400 border-t border-slate-100 pt-3">
                <ArrowUpRight size={14} className="text-slate-400" />
                <span>Pas encore de données</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ================================================= */}
      {/* GRAPHIQUES */}
      {/* ================================================= */}
      {isActive && (
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <PaymentMethodChart />
        </section>
      )}

      {/* ================================================= */}
      {/* MESSAGE FEATURE LOCKED */}
      {/* ================================================= */}
      {!isActive && (
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-2xl bg-slate-100 p-3 text-slate-500">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="font-bold text-[#08192D] text-base">
                Fonctionnalités avancées verrouillées
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Les statistiques de paiement, les graphiques et les
                fonctionnalités avancées seront disponibles dès la validation de
                votre abonnement.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* ACTIONS RAPIDES */}
      {/* ================================================= */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#08192D] tracking-tight">
            Actions rapides
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Accédez rapidement aux fonctionnalités principales de votre espace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* PRODUITS */}
          <button
            onClick={goToProducts}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/5 active:scale-[0.99]"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 transition-transform duration-300 group-hover:scale-110">
                <Plus size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#08192D]">
                Gérer les produits
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Créez, modifiez et organisez vos catalogues de produits.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Accéder aux produits</span>
              <ChevronRight size={14} />
            </div>
          </button>

          {/* LIEN DE PAIEMENT */}
          <button
            onClick={goToPayment}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 active:scale-[0.99]"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-transform duration-300 group-hover:scale-110">
                <Wallet size={24} />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#08192D]">
                  Pages de paiement
                </h3>
                {!isActive && (
                  <Lock size={14} className="text-slate-400 shrink-0" />
                )}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Générez des liens de paiement personnalisés à partager à vos clients.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>{isActive ? "Gérer mes liens" : "Débloquer la fonction"}</span>
              <ChevronRight size={14} />
            </div>
          </button>

          {/* CLIENTS */}
          <button
            onClick={goToCustomers}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 active:scale-[0.99]"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 transition-transform duration-300 group-hover:scale-110">
                <Users size={24} />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#08192D]">
                  Répertoire clients
                </h3>
                {!isActive && (
                  <Lock size={14} className="text-slate-400 shrink-0" />
                )}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Consultez l'historique d'achat et la liste complète de vos clients.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>{isActive ? "Voir mes clients" : "Débloquer la fonction"}</span>
              <ChevronRight size={14} />
            </div>
          </button>
        </div>
      </section>

      {/* ================================================= */}
      {/* RECENT TRANSACTIONS */}
      {/* ================================================= */}
      {isActive && <RecentTransactions />}

      {/* FOOTER */}
      <DashboardFooter />
    </div>
  );
}