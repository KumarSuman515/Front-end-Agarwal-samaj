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
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection hover:shadow-solid-13 transition-shadow duration-300"
      >
        <Link href={`/blog/${slug}`} className="relative block aspect-368/239">
          <Image src={mainImage || "/images/blog/blog-01.png"} alt={title} fill className="rounded-lg object-cover" />
        </Link>

        <div className="px-4">
          {/* Category and Date */}
          <div className="mt-4 mb-2 flex items-center justify-between text-sm text-gray-500">
            {category && (
              <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-goldenrod">
                {category}
              </span>
            )}
            {publishedAt && (
              <span className="text-gray-500">
                {new Date(publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>

          {/* Author */}
          {author && (
            <div className="mb-3 flex items-center">
              <div className="mr-2 h-6 w-6 overflow-hidden rounded-full">
                <Image 
                  src={author.image || "/images/user/user-01.png"} 
                  alt={author.name} 
                  width={24} 
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-gray-600">By {author.name}</span>
            </div>
          )}

          <h3 className="mb-3.5 mt-2 line-clamp-2 text-lg font-medium text-black duration-300 hover:text-goldenrod dark:text-white dark:hover:text-goldenrod xl:text-itemtitle2">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-gray-600 dark:text-gray-300">{metadata}</p>
          
          {/* Read More Link */}
          <div className="mt-4">
            <Link 
              href={`/blog/${slug}`}
              className="inline-flex items-center text-sm font-medium text-goldenrod hover:text-darkgoldenrod transition-colors"
            >
              Read More
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
