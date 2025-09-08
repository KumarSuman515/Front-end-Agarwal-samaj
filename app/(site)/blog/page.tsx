"use client";
import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import { Blog } from "@/types/blog";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const BlogPage = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = BlogData;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => 
        post.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metadata?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = BlogData.map(post => post.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* Header Section */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="animate_top mx-auto text-center">
            <h1 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle1">
              Agarwal Samaj Blog
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Stay updated with the latest news, events, and stories from the Agarwal community. 
              Discover inspiring achievements, cultural insights, and community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-10">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
          <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, authors, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-stroke px-6 py-4 pr-12 shadow-solid-12 focus:border-primary focus:outline-hidden dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 p-5"
                  aria-label="search-icon"
                >
                  <svg
                    className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Category Filters */}
            <div className="mb-4">
              <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === ""
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category || "")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count and Clear Filters */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                {(searchTerm || selectedCategory) && (
                  <span className="ml-1">
                    {searchTerm && ` for "${searchTerm}"`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </span>
                )}
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
          {currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {currentPosts.map((post, key) => (
                  <BlogItem key={post._id} blog={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                          : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-blacksection dark:text-white dark:hover:bg-gray-800"
                      }`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-blacksection dark:text-white dark:hover:bg-gray-800"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                          : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-blacksection dark:text-white dark:hover:bg-gray-800"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center dark:bg-gray-800">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary hover:text-primary/80 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
