import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const transactions = [
  {
    id: "#TX-24001",
    customer: "Jean Dupont",
    email: "jean@email.com",
    amount: "$120.00",
    method: "Orange Money",
    status: "success",
    date: "Aujourd'hui",
  },
  {
    id: "#TX-24002",
    customer: "Sarah Mukendi",
    email: "sarah@email.com",
    amount: "$45.00",
    method: "M-Pesa",
    status: "pending",
    date: "Aujourd'hui",
  },
  {
    id: "#TX-24003",
    customer: "David Kalala",
    email: "david@email.com",
    amount: "$250.00",
    method: "Visa",
    status: "success",
    date: "Hier",
  },
  {
    id: "#TX-24004",
    customer: "Grâce Ilunga",
    email: "grace@email.com",
    amount: "$80.00",
    method: "Airtel Money",
    status: "failed",
    date: "Hier",
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#08192D]">
            Dernières transactions
          </h2>

          <p className="text-slate-500">
            Les paiements les plus récents.
          </p>
        </div>

        <button className="rounded-xl border border-slate-200 px-5 py-2 font-semibold hover:bg-slate-100">
          Voir tout
        </button>
      </div>

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
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#08192D] font-bold text-white">
                      {transaction.customer.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {transaction.customer}
                      </p>

                      <p className="text-sm text-slate-500">
                        {transaction.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="font-medium">
                  {transaction.id}
                </td>

                <td>{transaction.method}</td>

                <td className="font-bold">
                  {transaction.amount}
                </td>

                <td>
                  {transaction.status === "success" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      <CheckCircle2 size={16} />
                      Réussi
                    </span>
                  )}

                  {transaction.status === "pending" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      <Clock3 size={16} />
                      En attente
                    </span>
                  )}

                  {transaction.status === "failed" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                      <XCircle size={16} />
                      Échoué
                    </span>
                  )}
                </td>

                <td>{transaction.date}</td>

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