"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useToast } from "@/app/context/ToastContext";

interface StatusCheckModalProps {
  onClose: () => void;
}

const StatusCheckModal = ({ onClose }: StatusCheckModalProps) => {
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact.trim()) {
      console.log("No data found - showing toast");
      try {
        showToast("No data found", "error");
        console.log("Toast called successfully");
        // Fallback alert for testing
        alert("No data found");
      } catch (error) {
        console.error("Error showing toast:", error);
        alert("No data found (fallback)");
      }
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4005/api/classifieds/status/${encodeURIComponent(contact)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // User is not registered - show specific message
          console.log("Data not found - showing toast");
          try {
            showToast("Data not found", "error");
            console.log("Toast called successfully");
            // Fallback alert for testing
            alert("Data not found");
          } catch (error) {
            console.error("Error showing toast:", error);
            alert("Data not found (fallback)");
          }
          setLoading(false);
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to check status");
      }

      const data = await response.json();
      setStatus(data.status);
      setBusinessName(contact); // In real app, you might want to get business name from API
      showToast("Status retrieved successfully", "success");
    } catch (error) {
      console.error("Error checking status:", error);
      showToast(error instanceof Error ? error.message : "Failed to check status", "error");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "disapproved":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "disapproved":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "approved":
        return "Congratulations! Your business has been approved and is now live in our directory.";
      case "pending":
        return "Your business registration is under review. We'll notify you once it's approved.";
      case "disapproved":
        return "Your business registration was not approved. Please contact us for more information.";
      default:
        return "";
    }
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Check Registration Status</h2>
              <p className="text-blue-100 text-sm mt-1">Enter your email or phone to check status</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!status ? (
            <form onSubmit={checkStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your registered email or phone"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Check Status"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 ${getStatusColor(status)} mb-4`}>
                {getStatusIcon(status)}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {getStatusMessage(status)}
              </p>

              {status === "approved" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    <strong>Your business is now live!</strong> Customers can find and contact you through our directory.
                  </p>
                </div>
              )}

              {status === "pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Review in progress:</strong> Our team is reviewing your business details. This usually takes 1-2 business days.
                  </p>
                </div>
              )}

              {status === "disapproved" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-800">
                    <strong>Registration not approved:</strong> Please contact our support team for assistance.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStatus(null);
                    setContact("");
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Check Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default StatusCheckModal;
