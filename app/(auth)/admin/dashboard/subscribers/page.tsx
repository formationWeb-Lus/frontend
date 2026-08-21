"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Crown,
  Calendar,
  Mail,
  Phone,
  Building2,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://paylinks.coderise-solution.com/api";

interface Plan {
  id: number;
  name: string;
  priceUSD: number;
  priceCDF: number;
}

interface Subscription {
  id: number;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  autoRenew: boolean;
  plan?: Plan | null;
}

interface Company {
  id: number;
  name: string;
  logo?: string | null;
  phone?: string | null;
  email?: string | null;
  slug?: string | null;
}

interface User {
  id: number;
  name?: string | null;
  email: string;
  phone?: string | null;
  role: string;
  subscriptionStatus: string;
  createdAt?: string;
  company?: Company | null;
  subscriptions?: Subscription[];
}

interface UsersApiResponse {
  success: boolean;
  count: number;
  data: User[];
  message?: string;
}

export default function SubscribersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token && token !== "null" && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/admin/subscriptions/active`, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const result: UsersApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Impossible de récupérer la liste des clients."
        );
      }

      setUsers(result.data || []);
    } catch (err: any) {
      console.error("Erreur récupération utilisateurs:", err);
      setError(err?.message || "Une erreur est survenue lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const companyName = user.company?.name?.toLowerCase() || "";
      const userName = user.name?.toLowerCase() || "";
      const userEmail = user.email?.toLowerCase() || "";
      const userPhone = user.phone || user.company?.phone || "";
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        companyName.includes(query) ||
        userName.includes(query) ||
        userEmail.includes(query) ||
        userPhone.includes(query);

      const isActive = user.subscriptionStatus?.toUpperCase() === "ACTIVE";

      if (statusFilter === "ACTIVE") return matchesSearch && isActive;
      if (statusFilter === "INACTIVE") return matchesSearch && !isActive;

      return matchesSearch;
    });
  }, [users, searchQuery, statusFilter]);

  const formatDate = (date?: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061221] p-6 py-12 text-white sm:p-10">
      {/* Dynamic Glows */}
      <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[150px]" />
      <div className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        
        {/* Header / Branding */}
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#08192D]/80 p-8 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-500 text-[#061221] font-black text-2xl shadow-lg shadow-yellow-500/20">
              PL
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Pay<span className="text-yellow-400">Link</span>
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                  <ShieldCheck className="h-4 w-4" /> Admin Console
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Gestion centrale des abonnés et des entreprises
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-3 backdrop-blur-md">
            <div className="text-right">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Développé par
              </span>
              <span className="block text-sm font-extrabold text-yellow-400">
                CodeRise Solution
              </span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-extrabold text-white border border-white/10">
              CR
            </div>
          </div>
        </header>

        {/* Title & Refresh */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Répertoire des Clients & Abonnements
            </h2>
            <p className="mt-1 text-base text-slate-400">
              Consultez les détails de souscription des comptes entreprise enregistrés.
            </p>
          </div>

          <button
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-base font-bold text-[#061221] shadow-lg shadow-yellow-500/20 transition hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/10 bg-[#08192D]/80 p-5 shadow-xl backdrop-blur-xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, entreprise, email, téléphone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-base text-white placeholder-slate-400 focus:border-yellow-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-slate-400" />
            <div className="flex rounded-xl bg-white/5 p-1.5 border border-white/10">
              <button
                onClick={() => setStatusFilter("ALL")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  statusFilter === "ALL"
                    ? "bg-yellow-400 text-[#061221] shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setStatusFilter("ACTIVE")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  statusFilter === "ACTIVE"
                    ? "bg-yellow-400 text-[#061221] shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Actifs
              </button>
              <button
                onClick={() => setStatusFilter("INACTIVE")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  statusFilter === "INACTIVE"
                    ? "bg-yellow-400 text-[#061221] shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Inactifs
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-base font-medium text-red-400 backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Dynamic & Spacious Table */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-[#08192D]/60 backdrop-blur-xl">
            <div className="text-center space-y-4">
              <RefreshCw className="mx-auto h-10 w-10 animate-spin text-yellow-400" />
              <p className="text-base font-medium text-slate-400">Chargement des comptes clients...</p>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#08192D]/60 p-16 text-center shadow-2xl backdrop-blur-xl">
            <Users className="mx-auto h-14 w-14 text-slate-500" />
            <h3 className="mt-4 text-xl font-bold text-white">Aucun résultat trouvé</h3>
            <p className="mt-2 text-base text-slate-400">
              {searchQuery
                ? "Ajustez vos critères de recherche pour trouver ce client."
                : "La base de données ne contient aucun compte enregistré."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#08192D]/80 shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs font-black uppercase tracking-wider text-slate-300">
                    <th className="px-8 py-5">Client / Entreprise</th>
                    <th className="px-8 py-5">Coordonnées</th>
                    <th className="px-8 py-5">Forfait actuel</th>
                    <th className="px-8 py-5">Période d'abonnement</th>
                    <th className="px-8 py-5 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => {
                    const company = user.company;
                    const latestSub = user.subscriptions?.[0];

                    const displayName = company?.name || user.name || "Compte sans nom";
                    const contactEmail = company?.email || user.email;
                    const contactPhone = company?.phone || user.phone;
                    const planName = latestSub?.plan?.name || "Sans Forfait";
                    const isActive = user.subscriptionStatus?.toUpperCase() === "ACTIVE";

                    return (
                      <tr
                        key={user.id}
                        className="group transition hover:bg-white/[0.04]"
                      >
                        {/* Client / Entreprise (Agrandie) */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            {company?.logo ? (
                              <img
                                src={company.logo}
                                alt={displayName}
                                className="h-14 w-14 rounded-2xl object-cover border border-white/10 shadow-md"
                              />
                            ) : (
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-base font-black text-[#061221] shadow-md">
                                {getInitials(displayName)}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-extrabold text-white group-hover:text-yellow-400 transition">
                                  {displayName}
                                </span>
                                {company && (
                                  <Building2 className="h-4 w-4 text-slate-400" />
                                )}
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-400">
                                <span>ID #{user.id}</span>
                                {user.role && (
                                  <>
                                    <span>•</span>
                                    <span className="uppercase text-yellow-400/90 font-bold">{user.role}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Coordonnées (Agrandie) */}
                        <td className="px-8 py-6">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                              <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                              {contactEmail}
                            </div>
                            {contactPhone ? (
                              <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                                {contactPhone}
                              </div>
                            ) : (
                              <span className="text-xs text-slate-500 italic">Pas de téléphone</span>
                            )}
                          </div>
                        </td>

                        {/* Forfait actuel (Agrandie) */}
                        <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-extrabold text-slate-100 shadow-sm">
                            <Crown
                              className={`h-4 w-4 ${
                                planName.toLowerCase().includes("premium") || planName.toLowerCase().includes("business")
                                  ? "text-yellow-400"
                                  : "text-slate-400"
                              }`}
                            />
                            {planName}
                          </div>
                        </td>

                        {/* Période d'abonnement (Agrandie) */}
                        <td className="px-8 py-6">
                          <div className="space-y-1 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                              <span>Début : <strong className="text-white">{formatDate(latestSub?.startDate)}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 pl-6 text-slate-400">
                              <span>Fin : <strong className="text-slate-200">{formatDate(latestSub?.endDate)}</strong></span>
                            </div>
                          </div>
                        </td>

                        {/* Statut (Agrandie) */}
                        <td className="px-8 py-6 text-right">
                          {isActive ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-bold text-emerald-400">
                              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                              Actif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold text-slate-400">
                              <span className="h-2 w-2 rounded-full bg-slate-500" />
                              {user.subscriptionStatus || "Inactif"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}