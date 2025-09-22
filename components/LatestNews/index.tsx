import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog";

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

const LatestNews = async () => {
  let newsPosts: Blog[] = [];
  let blogPosts: Blog[] = [];
  let error: string | null = null;

  try {
    // Fetch blog posts from API
    const blogResponse = await fetch('http://localhost:4005/api/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!blogResponse.ok) {
      throw new Error(`HTTP error! status: ${blogResponse.status}`);
    }

    const blogApiPosts = await blogResponse.json();
    
    // Transform all posts and use them as news (since we don't have separate news endpoint)
    const allPosts = blogApiPosts.map(transformBlogPost);
    
    // Use the latest posts as news
    newsPosts = allPosts.slice(0, 4);
    blogPosts = allPosts.slice(4, 8); // Additional posts for variety
    
  } catch (err) {
    console.error('Error fetching posts:', err);
    error = 'Failed to load latest news and blogs';
    
    // Fallback to some sample data if API fails
    const fallbackData = [
      {
        post_id: 'fallback1',
        title: 'Welcome to Agarwal Samaj',
        excerpt: 'Join our vibrant community and be part of something special. Connect with fellow community members.',
        content: 'Welcome to our community platform...',
        thumbnail_url: '/images/blog/blog-01.png',
        author_name: 'Community Admin',
        Category: { category_name: 'Community' },
        publish_date: new Date().toISOString()
      }
    ];
    
    newsPosts = fallbackData.map(transformBlogPost);
    blogPosts = [];
  }

  return (
    <section id="latest-news" className="px-4 md:px-8 2xl:px-0h-[80vh]">
      <div className="relative mx-auto max-w-c-1390 px-7.5 py-8 lg:px-15 xl:px-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10 h-[85vh]">
          {/* 70% width main featured blog section */}
          <div className="lg:col-span-7 rounded-2xl bg-gray-900 p-3 text-white md:p-4 h-full flex flex-col">
            <h1 className="mb-3 text-center text-2xl font-extrabold md:mb-4 md:text-3xl">
              लाइव न्यूज़ ब्रॉडकास्ट
            </h1>
            
            {error ? (
              <div className="flex-1 w-full overflow-hidden rounded-lg bg-black shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-red-500 mb-2">
                    <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">{error}</p>
                </div>
              </div>
            ) : newsPosts.length === 0 ? (
              <div className="flex-1 w-full overflow-hidden rounded-lg bg-black shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">No news available at the moment.</p>
                </div>
              </div>
            ) : (
              /* Live News Broadcast Video */
              <div className="flex-1 w-full overflow-hidden rounded-lg bg-black shadow-xl">
                <div className="relative h-full w-full">
                  {/* Live News Video */}
                  <div className="relative h-full w-full">
                    <iframe
                      src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk&controls=1&showinfo=0&rel=0&modestbranding=1"
                      title="Live News Broadcast"
                      className="h-full w-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                    
                    {/* Live Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-bold">LIVE</span>
                      </div>
                    </div>
                    
                    {/* News Ticker */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="text-white">
                        <h3 className="text-lg font-bold mb-1">ब्रेकिंग न्यूज़</h3>
                        <p className="text-sm text-gray-200 line-clamp-2">
                          {newsPosts[0].title}
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-300">
                          <span className="bg-primary/20 px-2 py-1 rounded-full">
                            {newsPosts[0].category}
                          </span>
                          <span>{new Date(newsPosts[0].publishedAt || '').toLocaleDateString('hi-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <p className="mx-auto mt-3 text-center text-sm text-gray-300 md:text-base">
              ब्रेकिंग न्यूज़ और दुनिया भर के रियल-टाइम अपडेट्स। हमारे लाइव कवरेज के साथ हमेशा सूचित रहें।
            </p>
          </div>

          {/* 30% width sidebar section */}
          <aside className="lg:col-span-3 rounded-2xl bg-gray-100 p-3 md:p-4 h-full flex flex-col">
            <h2 className="mb-3 border-b-2 border-gray-300 pb-2 text-xl font-bold text-gray-900 md:text-2xl">
              ताज़ा सुर्खियाँ
            </h2>
            
            {error ? (
              <div className="flex-1 text-center py-4">
                <div className="text-red-500 mb-2">
                  <svg className="mx-auto h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-xs">{error}</p>
              </div>
            ) : newsPosts.length === 0 ? (
              <div className="flex-1 text-center py-4">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-xs">No content available</p>
              </div>
            ) : (
              <ul className="flex-1 space-y-4 overflow-y-auto">
                {/* Show only news posts */}
                {newsPosts.slice(0, 4).map((post, index) => (
                  <li key={post._id} className="flex items-start space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-300">
                      <Image
                        src={post.mainImage || "/images/blog/blog-01.png"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="text-base font-semibold hover:underline hover:text-primary transition-colors duration-300 line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {post.metadata}
                      </p>
                      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                          समाचार
                        </span>
                        <span>•</span>
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt || '').toLocaleDateString('hi-IN')}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            {/* View All News Button */}
            <div className="mt-4 text-center">
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
