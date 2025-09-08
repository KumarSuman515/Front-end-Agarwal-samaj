"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogData from "./blogData";
import { Blog } from "@/types/blog";

interface RelatedPostProps {
  currentPost?: Blog;
  limit?: number;
}

const RelatedPost: React.FC<RelatedPostProps> = ({ currentPost, limit = 3 }) => {
  // Get related posts based on category or random selection
  const getRelatedPosts = () => {
    let relatedPosts = BlogData;
    
    // If current post is provided, filter by category first
    if (currentPost && currentPost.category) {
      const sameCategoryPosts = BlogData.filter(
        post => post.category === currentPost.category && post._id !== currentPost._id
      );
      
      if (sameCategoryPosts.length >= limit) {
        relatedPosts = sameCategoryPosts;
      } else {
        // If not enough posts in same category, add other posts
        const otherPosts = BlogData.filter(
          post => post.category !== currentPost.category && post._id !== currentPost._id
        );
        relatedPosts = [...sameCategoryPosts, ...otherPosts];
      }
    }
    
    // Shuffle and take the limit
    return relatedPosts
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const relatedPosts = getRelatedPosts();

  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Related Posts
        </h4>

        <div>
          {relatedPosts.map((post) => (
            <div
              className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
              key={post._id}
            >
              <div className="max-w-45 relative h-18 w-45 overflow-hidden rounded-md">
                <Image 
                  fill 
                  src={post.mainImage || "/images/blog/blog-01.png"} 
                  alt={post.title}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h5>
                {post.publishedAt && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
