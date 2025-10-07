"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/app/context/ToastContext";
import { API_ENDPOINTS } from "@/lib/api/config";
import api, { ApiError } from "@/lib/api/client";

interface BusinessStatsProps {
  className?: string;
}

interface StatsData {
  totalBusinesses: number;
  approvedBusinesses: number;
  pendingBusinesses: number;
  categories: { [key: string]: number };
}

const BusinessStats = ({ className = "" }: BusinessStatsProps) => {
  const { showToast } = useToast();
  const [stats, setStats] = useState<StatsData>({
    totalBusinesses: 0,
    approvedBusinesses: 0,
    pendingBusinesses: 0,
    categories: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all businesses for statistics (use all listings endpoint, not search which only returns approved)
      const businesses = await api.get<any[]>(API_ENDPOINTS.classifieds, {
        timeout: 15000,
        retries: 2
      });
      
      // Calculate statistics
      const totalBusinesses = businesses.length;
      const approvedBusinesses = businesses.filter((b: any) => b.status === 'approved').length;
      const pendingBusinesses = businesses.filter((b: any) => b.status === 'pending').length;
      
      // Count by category
      const categories: { [key: string]: number } = {};
      businesses.forEach((business: any) => {
        const category = business.business_category || 'Other';
        categories[category] = (categories[category] || 0) + 1;
      });
      
      setStats({
        totalBusinesses,
        approvedBusinesses,
        pendingBusinesses,
        categories
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error instanceof ApiError) {
        showToast(error.userMessage || 'Failed to load business statistics', 'error');
      } else {
        showToast('Failed to load business statistics', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const topCategories = Object.entries(stats.categories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Directory Stats</h3>
      
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.totalBusinesses}</div>
          <div className="text-sm text-gray-600">Total Businesses</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.approvedBusinesses}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.pendingBusinesses}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Top Categories */}
      {topCategories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Top Categories</h4>
          <div className="space-y-2">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{category}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval Rate */}
      {stats.totalBusinesses > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Approval Rate</span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round((stats.approvedBusinesses / stats.totalBusinesses) * 100)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stats.approvedBusinesses / stats.totalBusinesses) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessStats;
