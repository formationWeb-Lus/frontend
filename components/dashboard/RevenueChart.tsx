"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 1800 },
  { month: "Fév", revenue: 2600 },
  { month: "Mar", revenue: 3200 },
  { month: "Avr", revenue: 4500 },
  { month: "Mai", revenue: 5200 },
  { month: "Juin", revenue: 7100 },
  { month: "Juil", revenue: 8400 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-[#08192D]">
        Revenus
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#FACC15"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#FACC15"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#08192D"
              strokeWidth={3}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}