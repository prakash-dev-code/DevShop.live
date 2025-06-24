"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FiEye, FiMoreHorizontal } from "react-icons/fi";

const Page = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      userId: 1,
      customerName: "Test User",
      price: 1299.99,
      status: "completed",
      orderTime: "2024-06-15 14:30",
      method: "Credit Card",
      invoiceNo: "INV-001",
    },
    {
      id: "ORD002",
      userId: 2,
      customerName: "John Doe",
      price: 1199.99,
      status: "pending",
      orderTime: "2024-06-16 10:15",
      method: "PayPal",
      invoiceNo: "INV-002",
    },
  ]);
  const pathname = usePathname();
  // Sample data for dashboard charts
  const salesData = [
    { date: "Jun 12", value: 1000 },
    { date: "Jun 13", value: 300 },
    { date: "Jun 14", value: 200 },
    { date: "Jun 15", value: 250 },
    { date: "Jun 16", value: 180 },
    { date: "Jun 17", value: 350 },
    { date: "Jun 18", value: 400 },
  ];

  const pieData = [
    { name: "Green Leaf Lettuce", value: 35, color: "#10B981" },
    { name: "Rainbow Chard", value: 25, color: "#3B82F6" },
    { name: "Clementine", value: 20, color: "#F97316" },
    { name: "Mint", value: 20, color: "#8B5CF6" },
  ];
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-2">
          <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
            Sales
          </button>
          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
            Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">
            Sales Overview
          </h3>
          <div className="relative h-64">
            <svg className="w-full h-full">
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                points={salesData
                  .map(
                    (item, index) =>
                      `${index * 80 + 40},${200 - (item.value / 1000) * 150}`
                  )
                  .join(" ")}
              />
              {salesData.map((item, index) => (
                <circle
                  key={index}
                  cx={index * 80 + 40}
                  cy={200 - (item.value / 1000) * 150}
                  r="4"
                  fill="#10B981"
                />
              ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-400 text-sm">
              {salesData.map((item, index) => (
                <span key={index}>{item.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">
            Product Distribution
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                {pieData.map((item, index) => {
                  const total = pieData.reduce((sum, d) => sum + d.value, 0);
                  const percentage = item.value / total;
                  const angle = percentage * 360;
                  const prevAngles = pieData
                    .slice(0, index)
                    .reduce((sum, d) => sum + (d.value / total) * 360, 0);

                  const x1 = 96 + 80 * Math.cos((prevAngles * Math.PI) / 180);
                  const y1 = 96 + 80 * Math.sin((prevAngles * Math.PI) / 180);
                  const x2 =
                    96 + 80 * Math.cos(((prevAngles + angle) * Math.PI) / 180);
                  const y2 =
                    96 + 80 * Math.sin(((prevAngles + angle) * Math.PI) / 180);

                  const largeArc = angle > 180 ? 1 : 0;

                  return (
                    <path
                      key={index}
                      d={`M 96,96 L ${x1},${y1} A 80,80 0 ${largeArc},1 ${x2},${y2} z`}
                      fill={item.color}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="ml-6">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div
                    className={`w-4 h-4 rounded mr-2`}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="pb-3">INVOICE NO</th>
                <th className="pb-3">ORDER TIME</th>
                <th className="pb-3">CUSTOMER NAME</th>
                <th className="pb-3">METHOD</th>
                <th className="pb-3">AMOUNT</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3">ACTION</th>
                <th className="pb-3">INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="py-3 text-gray-300">{order.invoiceNo}</td>
                  <td className="py-3 text-gray-300">{order.orderTime}</td>
                  <td className="py-3 text-gray-300">{order.customerName}</td>
                  <td className="py-3 text-gray-300">{order.method}</td>
                  <td className="py-3 text-gray-300">${order.price}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status === "completed"
                          ? "bg-green-600 text-white"
                          : order.status === "pending"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-300">
                        <FiMoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 text-gray-300">PDF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
