'use client';

import { Button } from "@mui/material";
import { FiHome } from "react-icons/fi";
import { BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ApexOptions } from "apexcharts"; // ← ADD THIS

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <p className="text-center py-8 text-gray-500">Loading chart...</p>,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = [{ name: "Revenue", data: [30, 40, 35, 50, 49, 60, 70] }];

  const options: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    yaxis: { title: { text: "Revenue ($)" } },
    colors: ["#1976d2"],
    tooltip: { y: { formatter: (val) => `$${val}k` } },
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Fintech PMS Dashboard
        </h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="contained">MUI Button</Button>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiHome size={20} /> React Icons
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <BarChart3 size={20} /> Lucide React
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Revenue Chart (ApexCharts)
          </h2>

          {isClient && typeof window !== "undefined" && (
            <Chart options={options} series={series} type="bar" height={350} />
          )}
        </div>
      </div>
    </main>
  );
}