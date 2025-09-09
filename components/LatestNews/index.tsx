import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogData from "@/components/Blog/blogData";

const LatestNews = () => {
  return (
    <section id="latest-news" className="px-4 md:px-8 2xl:px-0">
      <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
          {/* 70% width main featured blog section */}
          <div className="lg:col-span-7 rounded-2xl bg-gray-900 p-4 text-white md:p-8">
            <h1 className="mb-4 text-center text-3xl font-extrabold md:mb-6 md:text-5xl">
              लाइव न्यूज़ ब्रॉडकास्ट
            </h1>
            {/* Featured Blog Post */}
            <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-black shadow-xl md:mb-6">
              <Link href={`/blog/${BlogData[0].slug}`} className="block h-full w-full">
                <div className="relative h-full w-full">
                  <Image
                    src={BlogData[0].mainImage || "/images/blog/blog-01.png"}
                    alt={BlogData[0].title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="p-6 w-full">
                      <h2 className="text-2xl font-bold mb-2 line-clamp-2 md:text-3xl">
                        {BlogData[0].title}
                      </h2>
                      <p className="text-gray-200 text-sm md:text-base line-clamp-2">
                        {BlogData[0].metadata}
                      </p>
                      <div className="mt-3 flex items-center space-x-4 text-xs text-gray-300">
                        <span className="bg-primary/20 px-2 py-1 rounded-full">
                          {BlogData[0].category}
                        </span>
                        <span>{new Date(BlogData[0].publishedAt || '').toLocaleDateString('hi-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <p className="mx-auto mt-2 max-w-2xl text-center text-base text-gray-300 md:text-lg">
              ब्रेकिंग न्यूज़ और दुनिया भर के रियल-टाइम अपडेट्स। हमारे लाइव कवरेज के साथ हमेशा सूचित रहें।
            </p>
          </div>

          {/* 30% width sidebar section */}
          <aside className="lg:col-span-3 rounded-2xl bg-gray-100 p-4 md:p-6">
            <h2 className="mb-4 border-b-2 border-gray-300 pb-2 text-xl font-bold text-gray-900 md:text-2xl">
              ताज़ा सुर्खियाँ
            </h2>
            <ul className="space-y-6">
              {BlogData.slice(0, 3).map((blog, index) => (
                <li key={blog._id} className="flex items-start space-x-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-300">
                    <Image
                      src={blog.mainImage || "/images/blog/blog-01.png"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link 
                      href={`/blog/${blog.slug}`} 
                      className="text-lg font-semibold hover:underline hover:text-primary transition-colors duration-300"
                    >
                      {blog.title}
                    </Link>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {blog.metadata}
                    </p>
                    <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                      <span>{blog.category}</span>
                      <span>•</span>
                      <span>{new Date(blog.publishedAt || '').toLocaleDateString('hi-IN')}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* View All News Button */}
            <div className="mt-6 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300"
              >
                सभी समाचार देखें
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
