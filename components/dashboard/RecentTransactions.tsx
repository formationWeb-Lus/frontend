"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
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
    async function fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

        const response = await fetch(`${baseUrl}/payment/transactions`, {
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
          // On prend uniquement les 5 dernières
          setTransactions(data.transactions.slice(0, 5));
        }
      } catch (error) {
        console.error("RECENT TRANSACTIONS ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm text-slate-500">
        Chargement des transactions...
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
          <p className="text-slate-500">Les paiements les plus récents.</p>
        </div>

        <button className="rounded-xl border border-slate-200 px-5 py-2 font-semibold hover:bg-slate-100">
          Voir tout
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-slate-500">
              <th className="pb-4">Client</th>
              <th className="pb-4">Transaction</th>
              <th className="pb-4">Méthode</th>
              <th className="pb-4">Montant</th>
              <th className="pb-4">Statut</th>
              <th className="pb-4">Date</th>
              <th className="pb-4"></th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-slate-500"
                >
                  Aucune transaction disponible.
                </td>
              </tr>
            )}

            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#08192D] font-bold text-white">
                      {transaction.customer?.charAt(0) || "C"}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {transaction.customer || "Client inconnu"}
                      </p>
                      <p className="text-sm text-slate-500">
                        Client paiement
                      </p>
                    </div>
                  </div>
                </td>

                <td className="font-medium">{transaction.reference}</td>

                <td>{transaction.method}</td>

                <td className="font-bold">
                  {transaction.amount} {transaction.currency}
                </td>

                <td>
                  {transaction.status === "SUCCESS" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      <CheckCircle2 size={16} />
                      Réussi
                    </span>
                  )}

                  {transaction.status === "PENDING" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      <Clock3 size={16} />
                      En attente
                    </span>
                  )}

                  {transaction.status === "FAILED" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                      <XCircle size={16} />
                      Échoué
                    </span>
                  )}
                </td>

                <td>
                  {new Date(transaction.createdAt).toLocaleDateString(
                    "fr-FR"
                  )}
                </td>

                <td>
                  <button className="rounded-lg p-2 transition hover:bg-slate-100">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}