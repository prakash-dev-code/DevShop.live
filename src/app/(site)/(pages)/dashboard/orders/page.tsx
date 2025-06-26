'use client';
import { useApi } from '@/services/apiServices';
import Link from 'next/link';
// import { formatToDayMonthYear } from "@/utils/dateFormat";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
// import { useQuery } from "react-query";

const Page = () => {
  const [ordersData, setOrdersData] = useState<any[]>([]);
  // const { getOrders } = useApi();
  // const {
  //   data: orders = [],
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery<any>("orders", getOrders, {
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,

  //   onError: (err: any) => {
  //     console.error("Fetch products error:", err.message);
  //     toast.error(
  //       err.response?.data?.message || err.message || "Failed to fetch products"
  //     );
  //   },
  // });
  // const ordersData = orders.data?.doc || [];
  return (
    <div className="md:p-6">
      <div className="flex justify-between items-center mb-6">
        <ul className="flex items-center gap-2">
          <li className="text-custom-sm hover:text-blue">
            <Link href="/dashboard">Home /</Link>
          </li>

          <li className="text-custom-sm last:text-blue capitalize">Orders</li>
        </ul>
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
                        order.status === 'delivered'
                          ? 'text-white bg-green'
                          : order.status === 'on-hold'
                            ? 'text-white bg-red'
                            : order.status === 'processing'
                              ? 'text-white bg-yellow'
                              : 'Unknown Status'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
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
