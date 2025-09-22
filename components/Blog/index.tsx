import React from "react";
import Link from "next/link";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import type { Blog } from "@/types/blog";

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
      mainImage = `http://localhost:4005/uploads/${apiPost.thumbnail_url}`;
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
    const response = await fetch('http://localhost:4005/api/blogs', {
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
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* <!-- Section Title Start --> */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `NEWS & BLOGS`,
              subtitle: `Latest News & Blogs`,
              description: `Stay updated with the latest news, events, and stories from the Agarwal community. Discover inspiring achievements, cultural insights, and community initiatives.`,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
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
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {blogPosts.slice(0, 6).map((blog) => (
                <BlogItem blog={blog} key={blog._id} />
              ))}
            </div>
            
            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg bg-primary px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
              >
                View All Articles
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
