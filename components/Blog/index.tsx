import React from "react";
import Link from "next/link";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import type { Blog } from "@/types/blog";
import { API_ENDPOINTS, getImageUrl } from "@/lib/api/config";

// Transform API data to match frontend Blog type
const transformBlogPost = (apiPost: any) => {
  // Build proper image URL for thumbnail
  let mainImage = '/images/blog/blog-01.png'; // default fallback
  if (apiPost.thumbnail_url) {
    // If thumbnail_url exists, check if it's already a full URL or just a filename
    if (apiPost.thumbnail_url.startsWith('http')) {
      mainImage = apiPost.thumbnail_url;
    } else {
      // It's just a filename, prepend the backend uploads path
      mainImage = getImageUrl(apiPost.thumbnail_url);
    }
  }

  return {
    _id: apiPost.post_id,
    title: apiPost.title,
    slug: apiPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    metadata: apiPost.excerpt,
    body: apiPost.content || '',
    mainImage: mainImage,
    author: {
      _id: 1, // Default author ID since API doesn't provide author details
      name: apiPost.author_name,
      image: '/images/user/user-01.png', // Default author image
      bio: 'Community Member'
    },
    tags: [apiPost.Category?.category_name || 'General'],
    publishedAt: apiPost.publish_date,
    category: apiPost.Category?.category_name || 'General'
  };
};

const Blog = async () => {
  let blogPosts: Blog[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(API_ENDPOINTS.blogs, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiPosts = await response.json();
    blogPosts = apiPosts.map(transformBlogPost);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = 'Failed to load blog posts';
  }

  return (
    <section id="blog" className="px-4 md:px-8 2xl:px-0">
      <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <SectionHeader
          headerInfo={{
            title: "AGARWAL SAMAJ BLOG",
            subtitle: "Stay Updated with Community Stories",
            description: "Stay updated with the latest news, events, and stories from the Agarwal community. Discover inspiring achievements, cultural insights, and community initiatives that bring us together."
          }}
        />
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Please try again later or contact support if the problem persists.</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300">No blog posts available at the moment.</p>
            <p className="text-sm text-gray-500 mt-2">Check back later for new content.</p>
          </div>
        ) : (
          <>
            <div className="relative">
              {/* Blog Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {blogPosts.slice(0, 6).map((blog, index) => (
                  <div 
                    key={blog._id}
                    className="transform transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogItem blog={blog} />
                  </div>
                ))}
              </div>
              
              {/* View All Button */}
              <div className="mt-16 text-center">
                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Explore All Articles
                    <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
