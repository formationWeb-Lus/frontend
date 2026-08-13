"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  reference: string;
  customer: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        // S'assurer de ne jamais appeler localhost en fallback si non souhaité
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

        if (!baseUrl && process.env.NODE_ENV === "production") {
          console.warn("API URL manquante");
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseUrl}/payment/transactions`, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions.slice(0, 5));
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("RECENT TRANSACTIONS ERROR:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200 mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#08192D]">
            Dernières transactions
          </h2>
          <p className="text-slate-500 text-sm">Les paiements les plus récents.</p>
        </div>

        <Link
          href="/dashboard/transactions"
          className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-semibold hover:bg-slate-100 transition-colors"
        >
          Voir tout
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-slate-500">
              <th className="pb-4 font-medium">Client</th>
              <th className="pb-4 font-medium">Transaction</th>
              <th className="pb-4 font-medium">Méthode</th>
              <th className="pb-4 font-medium">Montant</th>
              <th className="pb-4 font-medium">Statut</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  Aucune transaction disponible.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08192D] text-sm font-bold text-white">
                        {transaction.customer?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">
                          {transaction.customer || "Client inconnu"}
                        </p>
                        <p className="text-xs text-slate-500">Client paiement</p>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium text-sm text-slate-700">{transaction.reference}</td>
                  <td className="text-sm text-slate-600">{transaction.method}</td>
                  <td className="font-bold text-sm text-slate-900">
                    {transaction.amount} {transaction.currency}
                  </td>

                  <td>
                    {transaction.status === "SUCCESS" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={14} />
                        Réussi
                      </span>
                    )}
                    {transaction.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                        <Clock3 size={14} />
                        En attente
                      </span>
                    )}
                    {transaction.status === "FAILED" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                        <XCircle size={14} />
                        Échoué
                      </span>
                    )}
                  </td>

                  <td className="text-sm text-slate-500">
                    {new Date(transaction.createdAt).toLocaleDateString("fr-FR")}
                  </td>

                  <td>
                    <Link
                      href={`/dashboard/transactions/${transaction.id}`}
                      aria-label={`Voir les détails de la transaction ${transaction.reference}`}
                      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-900"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}