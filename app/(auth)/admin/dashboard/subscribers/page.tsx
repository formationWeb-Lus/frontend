"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Interface pour le type de données retourné
interface UserSubscription {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  plan: string;
  status: string;
  createdAt: string;
}

interface UsersApiResponse {
  success: boolean;
  message?: string;
  data: UserSubscription[];
}

// URL de base de l'API
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://shop-flowpay-backend.vercel.app/api";

export default function ActiveSubscriptionsPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      // Récupération du token JWT
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token && token !== "null" && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Appel API avec la route corrigée (sans le préfixe /admin)
      const response = await fetch(`${API_URL}/subscriptions/active`, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      // Gestion du cas non autorisé (Token expiré ou absent)
      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      // Vérification du statut HTTP avant de tenter un parsing JSON (évite les crashs 404 HTML)
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP ${response.status}: Impossible de contacter la route d'API (${response.statusText})`
        );
      }

      const result: UsersApiResponse = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Impossible de récupérer la liste des clients."
        );
      }

      setUsers(result.data || []);
    } catch (err: any) {
      console.error("Erreur lors de la récupération des abonnés:", err);
      setError(
        err?.message || "Une erreur est survenue lors du chargement des données."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Abonnements Actifs</h1>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">Chargement des abonnés en cours...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
          <p className="font-semibold">Erreur</p>
          <p>{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="text-gray-500">Aucun abonné actif trouvé.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Nom</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Plan</th>
                <th className="py-2 px-4 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {users.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{sub.user?.name || "N/A"}</td>
                  <td className="py-2 px-4">{sub.user?.email || "N/A"}</td>
                  <td className="py-2 px-4">{sub.plan}</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}