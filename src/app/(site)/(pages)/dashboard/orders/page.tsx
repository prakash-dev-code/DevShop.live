"use client";
import { useApi } from "@/services/apiServices";
import { formatToDayMonthYear } from "@/utils/dateFormat";
import React, { useState } from "react";
import toast from "react-hot-toast";
// import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useQuery } from "react-query";

const Page = () => {
  const { getOrders } = useApi();
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery<any>("orders", getOrders, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    onError: (err: any) => {
      console.error("Fetch products error:", err.message);
      toast.error(
        err.response?.data?.message || err.message || "Failed to fetch products"
      );
    },
  });
  const ordersData = orders.data?.doc || [];
  return (
    <div className="md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        {/* <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
          <FiPlus size={16} />
          Add Order
        </button> */}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-3">CUSTOMER</th>
                <th className="pb-3">EMAIL</th>
                <th className="pb-3">PRICE</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3">ORDER TIME</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order: any) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="py-4 text-gray-300">{order.user.name}</td>
                  <td className="py-4 text-gray-300">{order.user.email}</td>
                  <td className="py-4 text-gray-300">$ {order.price.total}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status === "delivered"
                          ? "text-white bg-green"
                          : order.status === "on-hold"
                          ? "text-white bg-red"
                          : order.status === "processing"
                          ? "text-white bg-yellow"
                          : "Unknown Status"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">
                    {formatToDayMonthYear(order.createdAt)}
                  </td>
                  {/* <td className="py-4 text-gray-300">{order.method}</td> */}
                  {/* <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit("orders", order)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("orders", order.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td> */}
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
