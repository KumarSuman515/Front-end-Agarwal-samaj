"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/app/context/ToastContext";

interface Classified {
  id: number;
  title: string;
  category: string;
  description: string;
  contact: string;
  email?: string;
  location?: string;
  price?: number;
  featured: boolean;
  status: string;
  views: number;
  postedBy: string;
  postedByPhone: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

const ClassifiedManager = () => {
  const { showToast } = useToast();
  const [classifieds, setClassifieds] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClassifieds = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: "100",
      });

      if (selectedStatus !== "all") {
        params.append("status", selectedStatus);
      }

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`http://localhost:4005/api/classifieds?${params}`);
      if (!response.ok) throw new Error("Failed to fetch classifieds");

      const data = await response.json();
      setClassifieds(data.classifieds);
    } catch (error) {
      console.error("Error fetching classifieds:", error);
      showToast("Error loading classifieds", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassifieds();
  }, [selectedStatus, searchTerm]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:4005/api/classifieds/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      showToast(`Classified ${status} successfully`, "success");
      fetchClassifieds();
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Error updating status", "error");
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4005/api/classifieds/${id}/featured`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to toggle featured status");

      const data = await response.json();
      showToast(`Classified ${data.featured ? "featured" : "unfeatured"} successfully`, "success");
      fetchClassifieds();
    } catch (error) {
      console.error("Error toggling featured status:", error);
      showToast("Error updating featured status", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this classified?")) return;

    try {
      const response = await fetch(`http://localhost:4005/api/classifieds/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete classified");

      showToast("Classified deleted successfully", "success");
      fetchClassifieds();
    } catch (error) {
      console.error("Error deleting classified:", error);
      showToast("Error deleting classified", "error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Classified Management
        </h1>
        
        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search classifieds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {/* Classifieds Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {classifieds.map((classified) => (
                <tr key={classified.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {classified.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {classified.contact}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {classified.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {classified.postedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(classified.status)}`}>
                      {classified.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {classified.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(classified.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        classified.featured
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {classified.featured ? "Featured" : "Not Featured"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {classified.status === "inactive" && (
                        <button
                          onClick={() => handleStatusChange(classified.id, "active")}
                          className="text-green-600 hover:text-green-900 dark:text-green-400"
                        >
                          Approve
                        </button>
                      )}
                      {classified.status === "active" && (
                        <button
                          onClick={() => handleStatusChange(classified.id, "inactive")}
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400"
                        >
                          Deactivate
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(classified.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {classifieds.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No classifieds found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassifiedManager;
