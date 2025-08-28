"use client";

import { useState } from "react";
import { Heart, X, Gift } from "lucide-react";

export default function DonationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");

  const predefinedAmounts = ["100", "500", "1000", "2000", "5000"];

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation details:", {
      amount: donationAmount,
      name: donorName,
      email: donorEmail,
    });
    setIsModalOpen(false);
    setDonationAmount("");
    setDonorName("");
    setDonorEmail("");
  };

  return (
    <>
      {/* Floating Donation Button */}
      <div className="fixed bottom-20 right-7 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative flex items-center gap-2 h-14 px-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Donate to Agarwal Samaj"
        >
          <Heart className="h-6 w-6 fill-current" />
          <span className="font-semibold">Donate Kre</span>

          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-800">
            <Gift className="h-3 w-3" />
          </span>
        </button>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 mt-15"
          onClick={() => setIsModalOpen(false)} // click outside modal to close
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-gray-800 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside modal
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Support Agarwal Samaj
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  Your donation helps us serve the community better
                </p>
              </div>
            </div>

            {/* Scrollable Form */}
            <div className="overflow-y-auto p-6">
              <form onSubmit={handleDonation} className="space-y-4">
                {/* Predefined Amounts */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Amount (₹)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount)}
                        className={`rounded-lg border-2 p-2 text-sm font-medium transition-colors ${
                          donationAmount === amount
                            ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                            : "border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-red-400"
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Donor Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Donor Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!donationAmount || !donorName || !donorEmail}
                  className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 py-3 font-semibold text-white transition-all duration-300 hover:from-red-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Donate ₹{donationAmount || "0"}
                </button>
              </form>

              {/* Footer Note */}
              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Your donation is secure and will be used for community development
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
