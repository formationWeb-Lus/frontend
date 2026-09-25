"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  UserCheck,
  Calendar,
  CreditCard,
  Mail,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface UserData {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface ActiveSubscription {
  _id: string;
  userId: UserData | string;
  user?: UserData;
  planId?: {
    _id: string;
    name: string;
    price: number;
    interval?: string;
  };
  planName?: string;
  plan?: string;
  amount?: number;
  price?: number;
  status: "active" | "trialing" | "past_due" | "canceled" | "unpaid";
  startDate?: string;
  createdAt?: string;
  currentPeriodEnd?: string;
  endDate?: string;
  paymentMethod?: string;
  autoRenew?: boolean;
}

interface UsersApiResponse {
  success: boolean;
  message?: string;
  data: ActiveSubscription[];
}

// Nettoyage de l'URL de base pour éviter les doubles slashes / ou les erreurs de sous-domaine
const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://shop-flowpay-backend.vercel.app/api";

const API_URL = RAW_API_URL.replace(/\/+$/, ""); // Supprime le slash final s'il existe

export default function ActiveSubscriptionsPage() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState<ActiveSubscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const [selectedSub, setSelectedSub] = useState<ActiveSubscription | null>(null);

  const fetchActiveSubscriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token && token !== "null" && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Test de la route /subscriptions/active
      const targetUrl = `${API_URL}/subscriptions/active`;
      console.log("Appel API vers :", targetUrl);

      const response = await fetch(targetUrl, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP ${response.status}: La route ${targetUrl} n'a pas été trouvée sur le serveur.`
        );
      }

      const result: UsersApiResponse = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Impossible de récupérer les abonnements actifs."
        );
      }

      setSubscriptions(result.data || []);
    } catch (err: any) {
      console.error("Erreur récupération abonnements:", err);
      setError(
        err?.message || "Une erreur est survenue lors de la récupération des abonnés."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveSubscriptions();
  }, []);

  const getUserName = (sub: ActiveSubscription): string => {
    if (typeof sub.userId === "object" && sub.userId?.name) return sub.userId.name;
    if (sub.user?.name) return sub.user.name;
    return "Utilisateur inconnu";
  };

  const getUserEmail = (sub: ActiveSubscription): string => {
    if (typeof sub.userId === "object" && sub.userId?.email) return sub.userId.email;
    if (sub.user?.email) return sub.user.email;
    return "Email indisponible";
  };

  const getPlanName = (sub: ActiveSubscription): string => {
    if (sub.planId?.name) return sub.planId.name;
    if (sub.planName) return sub.planName;
    if (sub.plan) return sub.plan;
    return "Plan standard";
  };

  const getPlanPrice = (sub: ActiveSubscription): string => {
    const amount = sub.amount ?? sub.price ?? sub.planId?.price;
    if (amount !== undefined && amount !== null) {
      return `${amount.toLocaleString("fr-FR")} FCFA`;
    }
    return "N/A";
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Date invalide";
    }
  };

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const name = getUserName(sub).toLowerCase();
      const email = getUserEmail(sub).toLowerCase();
      const plan = getPlanName(sub).toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        name.includes(search) || email.includes(search) || plan.includes(search);

      const matchesStatus =
        statusFilter === "all" || sub.status === statusFilter;

      const matchesPlan =
        planFilter === "all" || plan === planFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [subscriptions, searchTerm, statusFilter, planFilter]);

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage) || 1;
  const paginatedSubscriptions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubscriptions.slice(start, start + itemsPerPage);
  }, [filteredSubscriptions, currentPage]);

  const availablePlans = useMemo(() => {
    const plans = new Set<string>();
    subscriptions.forEach((s) => plans.add(getPlanName(s)));
    return Array.from(plans);
  }, [subscriptions]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-indigo-600" />
            Clients & Abonnements Actifs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez et consultez les abonnements en cours d'utilisation sur la plateforme.
          </p>
        </div>

        <button
          onClick={fetchActiveSubscriptions}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou plan..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="trialing">Essai gratuit</option>
              <option value="past_due">En retard</option>
              <option value="canceled">Annulé</option>
            </select>
          </div>

          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tous les plans</option>
            {availablePlans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={fetchActiveSubscriptions}
            className="text-sm font-semibold underline hover:text-red-800"
          >
            Réessayer
          </button>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Client</th>
                <th className="py-3.5 px-4 font-semibold">Plan</th>
                <th className="py-3.5 px-4 font-semibold">Montant</th>
                <th className="py-3.5 px-4 font-semibold">Statut</th>
                <th className="py-3.5 px-4 font-semibold">Date de début</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-32 mb-1"></div><div className="h-3 bg-gray-100 rounded w-48"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="py-4 px-4"><div className="h-5 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="py-4 px-4 text-right"><div className="h-8 bg-gray-200 rounded w-8 ml-auto"></div></td>
                  </tr>
                ))
              ) : paginatedSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Aucun abonnement trouvé.
                  </td>
                </tr>
              ) : (
                paginatedSubscriptions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{getUserName(sub)}</div>
                      <div className="text-xs text-gray-400">{getUserEmail(sub)}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-700">
                      {getPlanName(sub)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {getPlanPrice(sub)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                          sub.status === "active"
                            ? "bg-green-100 text-green-800"
                            : sub.status === "trialing"
                            ? "bg-blue-100 text-blue-800"
                            : sub.status === "past_due"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          sub.status === "active" ? "bg-green-500" : "bg-gray-400"
                        }`}></span>
                        {sub.status === "active"
                          ? "Actif"
                          : sub.status === "trialing"
                          ? "Essai"
                          : sub.status === "past_due"
                          ? "En retard"
                          : sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {formatDate(sub.startDate || sub.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Voir les détails"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredSubscriptions.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Affichage de{" "}
              <span className="font-semibold text-gray-700">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              à{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(currentPage * itemsPerPage, filteredSubscriptions.length)}
              </span>{" "}
              sur{" "}
              <span className="font-semibold text-gray-700">
                {filteredSubscriptions.length}
              </span>{" "}
              résultats
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs px-2 text-gray-600 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedSub(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">
              Détails de l'abonnement
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <UserIcon className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Client</p>
                  <p className="font-semibold text-gray-800">{getUserName(selectedSub)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <p className="text-gray-800">{getUserEmail(selectedSub)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Formule & Tarif</p>
                  <p className="font-semibold text-gray-800">
                    {getPlanName(selectedSub)} — {getPlanPrice(selectedSub)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Période</p>
                  <p className="text-gray-800">
                    Du {formatDate(selectedSub.startDate || selectedSub.createdAt)} au{" "}
                    {formatDate(selectedSub.currentPeriodEnd || selectedSub.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Statut</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {selectedSub.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}