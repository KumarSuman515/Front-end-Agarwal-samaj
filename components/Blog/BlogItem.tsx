"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { mainImage, title, metadata, slug, author, publishedAt, category } = blog;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 dark:bg-gray-800"
      >
        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden">
          <Link href={`/blog/${slug}`} className="relative block aspect-[4/3]">
            <Image 
              src={mainImage || "/images/blog/blog-01.png"} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            {/* Category Badge */}
            {category && (
              <div className="absolute top-4 left-4">
                <span className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                  {category}
                </span>
              </div>
            )}
          </Link>
        </div>

        <div className="p-6">
          {/* Date */}
          {publishedAt && (
            <div className="mb-3 flex items-center text-sm text-gray-500" suppressHydrationWarning>
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'UTC'
              })}
            </div>
          )}

          {/* Title */}
          <h3 className="mb-4 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>

          {/* Description */}
          <p className="mb-6 line-clamp-3 text-gray-600 dark:text-gray-300 leading-relaxed">
            {metadata}
          </p>

          {/* Author and Read More */}
          <div className="flex items-center justify-between">
            {/* Author */}
            {author && (
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full ring-2 ring-orange-200">
                  <Image 
                    src={author.image || "/images/user/user-01.png"} 
                    alt={author.name} 
                    width={40} 
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">By {author.name}</p>
                  <p className="text-xs text-gray-500">Community Member</p>
                </div>
              </div>
            )}

            {/* Read More Link */}
            <Link 
              href={`/blog/${slug}`}
              className="group/readmore flex items-center text-sm font-semibold text-orange-600 transition-all duration-300 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
            >
              Read More
              <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/readmore:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
