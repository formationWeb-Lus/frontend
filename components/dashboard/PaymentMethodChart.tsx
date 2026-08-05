"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Orange Money", value: 42 },
  { name: "M-Pesa", value: 28 },
  { name: "Airtel Money", value: 18 },
  { name: "Visa", value: 12 },
];

const COLORS = [
  "#f97316",
  "#2563eb",
  "#dc2626",
  "#16a34a",
];

export default function PaymentMethodChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-[#08192D]">
        Méthodes de paiement
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span>{item.name}</span>
            </div>

            <span className="font-semibold">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}