"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { API_ENDPOINTS, getImageUrl as getFullImageUrl } from "@/lib/api/config";

interface Profile {
  id: number;
  name: string;
  dob: string;
  state: string;
  education: string;
  occupation: string;
  image_path: string;
}

// Helper function to calculate age from DOB
const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Helper function to get image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath || imagePath === "default-profile.jpg") {
    // Return a data URL for a default avatar
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjc3NDhCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QTwvdGV4dD4KPC9zdmc+Cg==';
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return getFullImageUrl(imagePath);
};

const MatrimonyPreview = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured profiles from backend
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Profile[]>(API_ENDPOINTS.candidates);
        const profiles = Array.isArray(res.data) ? res.data.slice(0, 3) : [];
        setFeaturedProfiles(profiles);
      } catch (error) {
        console.error("Error fetching featured profiles:", error);
        // Fallback to static data if API fails
        setFeaturedProfiles([
          {
            id: 1,
            name: "Priya Agarwal",
            dob: "1998-05-15",
            state: "Maharashtra",
            education: "MBA",
            occupation: "Software Engineer",
            image_path: ""
          },
          {
            id: 2,
            name: "Rahul Agarwal",
            dob: "1995-08-22",
            state: "Delhi",
            education: "CA",
            occupation: "Chartered Accountant",
            image_path: ""
          },
          {
            id: 3,
            name: "Anjali Agarwal",
            dob: "1999-03-10",
            state: "Karnataka",
            education: "B.Tech",
            occupation: "Data Scientist",
            image_path: ""
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const features = [
    "Verified Profiles",
    "Secure Platform",
    "Advanced Search",
    "Privacy Protection",
    "Community Trust",
    "24/7 Support"
  ];

  return (
    <>
      <section id="matrimony-preview" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Find Your Life Partner
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Connect with potential life partners within the trusted Agarwal Samaj community. 
                Our platform ensures verified profiles, secure communication, and privacy protection.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/matrimony"
                  className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Browse Profiles
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/matrimony"
                  className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Create Profile
                </Link>
              </div>
            </div>

            {/* Right Side - Profile Cards */}
            <div className="space-y-4">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                ))
              ) : (
                featuredProfiles.map((profile) => {
                  const age = calculateAge(profile.dob);
                  const imageUrl = getImageUrl(profile.image_path);
                  
                  return (
                    <div
                      key={profile.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 overflow-hidden rounded-full mr-4">
                            {profile.image_path && profile.image_path !== "default-profile.jpg" ? (
                              <img
                                src={imageUrl}
                                alt={`${profile.name}'s profile photo`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallbackDiv = target.nextElementSibling as HTMLElement;
                                  if (fallbackDiv) fallbackDiv.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className={`w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center ${
                              profile.image_path && profile.image_path !== "default-profile.jpg" ? 'hidden' : 'flex'
                            }`}>
                              <span className="text-lg font-semibold text-gray-700">{profile.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {profile.name}, {age}
                            </h3>
                            <p className="text-gray-600 text-sm">{profile.state}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="bg-blue-500 text-white p-1 rounded-full">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.115 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                        </svg>
                        {profile.education}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        {profile.occupation}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MatrimonyPreview;
