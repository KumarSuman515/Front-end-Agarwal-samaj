"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import CreateProfile from "./CreateProfile";
import axios from "axios";

// Profile type that matches the backend data structure
interface Profile {
  id: number;
  name: string;
  dob: string;
  birth_place: string;
  candidate_gender: "male" | "female";
  manglik: string;
  gotra: string;
  maternal_gotra: string;
  father_name: string;
  father_mobile: string;
  father_occupation: string;
  father_annual_income: number;
  mother_name: string;
  mother_occupation: string;
  grandfather: string;
  native_place: string;
  nationality: string;
  status_of_family: string;
  address: string;
  country: string;
  state: string;
  district: string;
  pin_code: string;
  phone: string;
  contact_no: string;
  email: string;
  height: string;
  body_type: string;
  complexion: string;
  blood_group: string;
  education_detail: string;
  education: string;
  hobby: string;
  occupation: string;
  designation: string;
  annual_income: number;
  company_name: string;
  company_city: string;
  no_unmarried_brother: number;
  no_unmarried_sister: number;
  no_married_brother: number;
  no_married_sister: number;
  relation: string;
  relative_name: string;
  relative_mobile_no: string;
  relative_city: string;
  relative_company_name: string;
  relative_designation: string;
  relative_company_address: string;
  kundali_milana: string;
  about_me: string;
  image_path: string;
  subscription: boolean;
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

// Helper function to get location string
const getLocationString = (profile: Profile): string => {
  const parts: string[] = [];
  if (profile.district) parts.push(profile.district);
  if (profile.state) parts.push(profile.state);
  if (profile.country) parts.push(profile.country);
  return parts.length > 0 ? parts.join(", ") : "Location not specified";
};

// Helper function to get image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath || imagePath === "default-profile.jpg") {
    // Return a data URL for a default avatar
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjc3NDhCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QTwvdGV4dD4KPC9zdmc+Cg==';
  }
  // If it's a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // If it's a filename from uploads, construct the full URL
  return `http://localhost:4005/uploads/${imagePath}`;
};

const Matrimony = () => {
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    ageRange: "",
    location: "",
    education: "",
    gender: ""
  });
  const [originalProfiles, setOriginalProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(6);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectProfile, setConnectProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [connectMessage, setConnectMessage] = useState("");

  // Load profiles from API
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Profile[]>("http://localhost:4005/api/candidates");
      const profiles = Array.isArray(res.data) ? res.data : [];
      console.log("Fetched profiles:", profiles);
      setOriginalProfiles(profiles);
      setFilteredProfiles(profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setOriginalProfiles([]);
      setFilteredProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Save handler from CreateProfile
  const handleSaveProfile = (_profile: Profile) => {
    // Refresh from server to avoid local storage of submitted data
    fetchProfiles();
    setShowCreateProfile(false);
  };

  // Handle search filters
  const handleSearch = () => {
    let filtered: Profile[] = originalProfiles;

    if (searchFilters.ageRange) {
      const [minAge, maxAge] = searchFilters.ageRange.split('-').map(Number);
      filtered = filtered.filter((profile) => {
        const age = calculateAge(profile.dob);
        if (maxAge) {
          return age >= minAge && age <= maxAge;
        } else {
          return age >= minAge;
        }
      });
    }

    if (searchFilters.location && searchFilters.location !== "All Locations") {
      filtered = filtered.filter((profile) => {
        const location = getLocationString(profile);
        return location.toLowerCase().includes(searchFilters.location.toLowerCase());
      });
    }

    if (searchFilters.education && searchFilters.education !== "Any Education") {
      filtered = filtered.filter((profile) =>
        profile.education?.toLowerCase().includes(searchFilters.education.toLowerCase())
      );
    }

    if (searchFilters.gender) {
      filtered = filtered.filter((profile) => profile.candidate_gender === (searchFilters.gender as "male" | "female"));
    }

    setFilteredProfiles(filtered);
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (name: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle view profile
  const handleViewProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowViewProfile(true);
  };

  // Handle connect
  const handleConnect = (profile: Profile) => {
    setConnectProfile(profile);
    setShowConnectModal(true);
  };

  // Handle connect request
  const handleConnectRequest = async () => {
    if (!connectProfile) return;
    try {
      if (!senderName || !senderEmail) {
        alert("Please enter your name and email");
        return;
      }
      await axios.post(`http://localhost:4005/api/candidates/${connectProfile.id}/connect`, {
        senderName:senderName,
        senderEmail:senderEmail,
        message: connectMessage,
      });
      alert(`Connection request sent to ${connectProfile.name}. You'll be notified when they respond.`);
      setShowConnectModal(false);
      setConnectProfile(null);
      setSenderName("");
      setSenderEmail("");
      setConnectMessage("");
    } catch (err) {
      console.error(err);
      const anyErr: any = err;
      const apiMsg = anyErr?.response?.data?.error || anyErr?.response?.data?.details || anyErr?.message || "Failed to send request. Please try again later.";
      alert(apiMsg);
    }
  };

  // Pagination
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const loadMoreProfiles = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <section id="matrimony" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <SectionHeader
            headerInfo={{
              title: "Find Your Life Partner",
              subtitle: "Agarwal Samaj Matrimony",
              description: "Connect with potential life partners within the Agarwal Samaj community. Verified profiles, secure platform, and trusted matchmaking.",
            }}
          />

          {/* Search Filters */}
          <div className="mt-12 mb-8 rounded-lg bg-white p-6 shadow-md">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Age Range
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.ageRange}
                  onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                >
                  <option value="">Any Age</option>
                  <option value="18-25">18-25</option>
                  <option value="26-30">26-30</option>
                  <option value="31-35">31-35</option>
                  <option value="36-40">36-40</option>
                  <option value="36">36+</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">All Locations</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Education
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.education}
                  onChange={(e) => handleFilterChange('education', e.target.value)}
                >
                  <option value="">Any Education</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Professional">Professional</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="CA">CA</option>
                  <option value="MBBS">MBBS</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  &nbsp;
                </label>
                <button 
                  onClick={handleSearch}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{filteredProfiles.length}</span> profiles
              {searchFilters.ageRange || searchFilters.location || searchFilters.education || searchFilters.gender ? 
                ` matching your criteria` : ''}
            </p>
          </div>

          {/* Create Profile Button */}
          <div className="mb-8 text-center">
            <button 
              onClick={() => setShowCreateProfile(true)}
              className="rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-green-700"
            >
              Create Your Profile
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading profiles...</p>
            </div>
          )}

          {/* No Profiles Found */}
          {!loading && filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No profiles found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search filters or create a profile to get started.</p>
            </div>
          )}

          {/* Profiles Grid */}
          {!loading && filteredProfiles.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentProfiles.map((profile) => {
                const age = calculateAge(profile.dob);
                const location = getLocationString(profile);
                const imageUrl = getImageUrl(profile.image_path);
                
                return (
              <div
                key={profile.id}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative">
                      <div className="h-48 w-full overflow-hidden">
                        {profile.image_path && profile.image_path !== "default-profile.jpg" ? (
                          <img
                            src={imageUrl}
                            alt={`${profile.name}'s profile photo`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallbackDiv = target.nextElementSibling as HTMLElement;
                              if (fallbackDiv) fallbackDiv.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 ${
                          profile.image_path && profile.image_path !== "default-profile.jpg" ? 'hidden' : 'flex'
                        }`}>
                          <span className="text-4xl font-bold text-gray-500">
                            {profile.name.charAt(0)}
                    </span>
                        </div>
                  </div>
                  <div className="absolute right-3 top-3 flex gap-2">
                      <span className="rounded-full bg-blue-500 p-1 text-white" title="Verified Profile">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                          {profile.name}, {age}
                    </h3>
                  </div>
                  
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                          {location}
                    </div>
                    <div className="flex items-center">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.115 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                      </svg>
                          {profile.education || "Education not specified"}
                    </div>
                    <div className="flex items-center">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                          {profile.occupation || "Occupation not specified"}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewProfile(profile)}
                      className="flex-1 rounded bg-blue-600 py-2 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleConnect(profile)}
                      className="rounded bg-pink-600 py-2 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-pink-700"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
                );
              })}
          </div>
          )}

          {/* Load More Button */}
          {!loading && currentPage < totalPages && (
          <div className="pb-20 pt-12 text-center">
              <button 
                onClick={loadMoreProfiles}
                className="rounded-lg bg-gray-100 px-8 py-3 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200"
              >
                Load More Profiles ({currentPage}/{totalPages})
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {!loading && totalPages > 1 && (
            <div className="pb-8">
              <p className="text-sm text-gray-600 text-center mb-4">
                Showing {indexOfFirstProfile + 1}-{Math.min(indexOfLastProfile, filteredProfiles.length)} of {filteredProfiles.length} profiles
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Create Profile Modal */}
      {showCreateProfile && (
        <CreateProfile onClose={() => setShowCreateProfile(false)} onSave={handleSaveProfile} />
      )}

      {/* View Profile Modal */}
      {showViewProfile && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
                <button
                  onClick={() => setShowViewProfile(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto overflow-hidden rounded-full mb-4">
                  {selectedProfile.image_path && selectedProfile.image_path !== "default-profile.jpg" ? (
                    <img
                      src={getImageUrl(selectedProfile.image_path)}
                      alt={`${selectedProfile.name}'s profile photo`}
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
                    selectedProfile.image_path && selectedProfile.image_path !== "default-profile.jpg" ? 'hidden' : 'flex'
                  }`}>
                    <span className="text-3xl font-bold text-gray-600">{selectedProfile.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedProfile.name}, {calculateAge(selectedProfile.dob)}
                </h3>
                <p className="text-gray-600">
                  {selectedProfile.occupation || "Occupation not specified"} • {getLocationString(selectedProfile)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Date of Birth:</span> {new Date(selectedProfile.dob).toLocaleDateString()}</div>
                    <div><span className="font-medium">Birth Place:</span> {selectedProfile.birth_place}</div>
                    <div><span className="font-medium">Height:</span> {selectedProfile.height}"</div>
                    <div><span className="font-medium">Body Type:</span> {selectedProfile.body_type}</div>
                    <div><span className="font-medium">Complexion:</span> {selectedProfile.complexion}</div>
                    <div><span className="font-medium">Blood Group:</span> {selectedProfile.blood_group}</div>
                    <div><span className="font-medium">Manglik:</span> {selectedProfile.manglik}</div>
                    <div><span className="font-medium">Gotra:</span> {selectedProfile.gotra}</div>
                    <div><span className="font-medium">Maternal Gotra:</span> {selectedProfile.maternal_gotra}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Education & Career</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Education:</span> {selectedProfile.education}</div>
                    <div><span className="font-medium">Education Detail:</span> {selectedProfile.education_detail || "Not specified"}</div>
                    <div><span className="font-medium">Occupation:</span> {selectedProfile.occupation}</div>
                    <div><span className="font-medium">Designation:</span> {selectedProfile.designation || "Not specified"}</div>
                    <div><span className="font-medium">Company:</span> {selectedProfile.company_name || "Not specified"}</div>
                    <div><span className="font-medium">Annual Income:</span> {selectedProfile.annual_income ? `₹${selectedProfile.annual_income.toLocaleString()}` : "Not specified"}</div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3 mt-4">Family Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Father's Name:</span> {selectedProfile.father_name}</div>
                    <div><span className="font-medium">Father's Occupation:</span> {selectedProfile.father_occupation || "Not specified"}</div>
                    <div><span className="font-medium">Mother's Name:</span> {selectedProfile.mother_name || "Not specified"}</div>
                    <div><span className="font-medium">Family Status:</span> {selectedProfile.status_of_family || "Not specified"}</div>
                    <div><span className="font-medium">Native Place:</span> {selectedProfile.native_place || "Not specified"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">About Me</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedProfile.about_me}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowViewProfile(false);
                    handleConnect(selectedProfile);
                  }}
                  className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                >
                  Connect with {selectedProfile.name}
                </button>
                <button
                  onClick={() => setShowViewProfile(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && connectProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto overflow-hidden rounded-full mb-4">
                  {connectProfile.image_path && connectProfile.image_path !== "default-profile.jpg" ? (
                    <img
                      src={getImageUrl(connectProfile.image_path)}
                      alt={`${connectProfile.name}'s profile photo`}
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
                    connectProfile.image_path && connectProfile.image_path !== "default-profile.jpg" ? 'hidden' : 'flex'
                  }`}>
                  <span className="text-xl font-bold text-gray-600">{connectProfile.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Connect with {connectProfile.name}</h3>
                <p className="text-gray-600 text-sm">Send a connection request to start a conversation</p>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your contact details will be shared only after {connectProfile.name} accepts your connection request.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                    <textarea
                      value={connectMessage}
                      onChange={(e) => setConnectMessage(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      rows={3}
                      placeholder={`Say hello to ${connectProfile.name}...`}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleConnectRequest}
                    className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    Send Request
                  </button>
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Matrimony;
