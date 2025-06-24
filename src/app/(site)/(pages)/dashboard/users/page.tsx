"use client";
import { useApi } from "@/services/apiServices";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useQuery } from "react-query";

const Page = () => {
  const { getAllUser } = useApi();
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery<any>("users", getAllUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    onError: (err: any) => {
      console.error("Fetch users error:", err.message);
      toast.error(
        err.response?.data?.message || err.message || "Failed to fetch users"
      );
    },
  });
  return (
    <div className="md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Users</h1>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-3">S.no.</th>
                <th className="pb-3">NAME</th>
                <th className="pb-3">EMAIL</th>
                <th className="pb-3">ROLE</th>

                {/* <th className="pb-3">ACTIONS</th> */}
              </tr>
            </thead>
            <tbody>
              {users?.data?.doc?.map((user: any, index: any) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-4 text-gray-300">{index + 1}</td>
                  <td className="py-4 text-gray-300">{user.name}</td>
                  <td className="py-4 text-gray-300">{user.email}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.role === "admin"
                          ? "bg-red text-white"
                          : user.role === "staff"
                          ? "bg-blue text-white"
                          : "bg-green text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit("users", user)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("users", user.id)}
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
