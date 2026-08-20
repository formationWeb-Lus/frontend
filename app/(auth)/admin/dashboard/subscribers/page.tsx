"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Crown,
  Calendar,
  Mail,
  Phone,
  Building2,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://paylink.coderise-solution.com/api";

interface Plan {
  id: number;
  name: string;
  priceUSD: number;
  priceCDF: number;
}

interface Company {
  id: number;
  name: string;
  logo?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface User {
  id: number;
  name?: string | null;
  email: string;
  phone?: string | null;
  role: string;
  subscriptionStatus: string;
  company?: Company | null;
}

interface Subscription {
  id: number;
  userId: number;
  planId: number;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  autoRenew: boolean;
  createdAt: string;
  user: User;
  plan: Plan;
}

interface SubscribersResponse {
  success: boolean;
  count: number;
  data: Subscription[];
  message?: string;
}

export default function SubscribersPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const response = await fetch(
        `${API_URL}/subscriptions/active`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },

          cache: "no-store",
        }
      );

      const result: SubscribersResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Impossible de récupérer les abonnés."
        );
      }

      setSubscriptions(result.data || []);
    } catch (err: any) {
      console.error(
        "Erreur récupération abonnés:",
        err
      );

      setError(
        err?.message ||
          "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const formatDate = (
    date?: string | null
  ) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "fr-FR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  const getInitials = (
    name?: string | null
  ) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />

              <span className="text-sm font-medium text-blue-600">
                Gestion des abonnements
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Abonnés actifs
            </h1>

            <p className="mt-2 text-slate-500">
              Consultez les entreprises et utilisateurs
              qui utilisent actuellement votre plateforme.
            </p>
          </div>

          <button
            onClick={fetchSubscribers}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading ? "animate-spin" : ""
              }`}
            />

            Actualiser
          </button>
        </div>

        {/* STATISTIQUES */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Abonnés actifs
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {subscriptions.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Plan Premium
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {
                    subscriptions.filter(
                      (subscription) =>
                        subscription.plan?.name
                          ?.toLowerCase()
                          .includes("premium")
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3">
                <Crown className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Renouvellement automatique
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {
                    subscriptions.filter(
                      (subscription) =>
                        subscription.autoRenew
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

        </div>

        {/* ERREUR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* CHARGEMENT */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="text-center">
              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Récupération des abonnés...
              </p>
            </div>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-300" />

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Aucun abonné actif
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Aucun abonnement actif n'a été trouvé.
            </p>
          </div>
        ) : (
          /* TABLE */
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">

                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Entreprise / Utilisateur
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Plan
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Début
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Expiration
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Statut
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {subscriptions.map(
                    (subscription) => {

                      const user =
                        subscription.user;

                      const company =
                        user?.company;

                      const displayName =
                        company?.name ||
                        user?.name ||
                        "Utilisateur";

                      return (
                        <tr
                          key={subscription.id}
                          className="transition hover:bg-slate-50"
                        >

                          {/* ENTREPRISE */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                {getInitials(
                                  displayName
                                )}
                              </div>

                              <div>
                                <p className="font-semibold text-slate-900">
                                  {displayName}
                                </p>

                                <p className="text-xs text-slate-500">
                                  ID utilisateur :{" "}
                                  {user?.id}
                                </p>
                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}
                          <td className="px-6 py-5">

                            <div className="space-y-1">

                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail className="h-4 w-4" />

                                {user?.email || "—"}
                              </div>

                              {user?.phone && (
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                  <Phone className="h-4 w-4" />

                                  {user.phone}
                                </div>
                              )}

                            </div>

                          </td>

                          {/* PLAN */}
                          <td className="px-6 py-5">

                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5">

                              <Crown className="h-4 w-4 text-amber-500" />

                              <span className="text-sm font-semibold text-amber-700">
                                {subscription.plan?.name ||
                                  "—"}
                              </span>

                            </div>

                          </td>

                          {/* START */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600">

                              <Calendar className="h-4 w-4" />

                              {formatDate(
                                subscription.startDate
                              )}

                            </div>

                          </td>

                          {/* END */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600">

                              <Calendar className="h-4 w-4" />

                              {formatDate(
                                subscription.endDate
                              )}

                            </div>

                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-5">

                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">

                              <span className="h-2 w-2 rounded-full bg-green-500" />

                              Actif

                            </span>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}