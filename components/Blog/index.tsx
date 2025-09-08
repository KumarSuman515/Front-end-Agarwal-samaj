import React from "react";
import Link from "next/link";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import BlogData from "./blogData";

const Blog = async () => {
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
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {BlogData.slice(0, 6).map((blog, key) => (
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
      </div>
    </section>
  );
};

export default Blog;
