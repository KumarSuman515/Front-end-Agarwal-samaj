import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { Blog } from "@/types/blog";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const response = await fetch('http://localhost:4005/api/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiPosts = await response.json();
    const blogPosts = apiPosts.map(transformBlogPost);
    const blog = blogPosts.find((post) => post.slug === resolvedParams.slug);
    
    if (!blog) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: `${blog.title} - Agarwal Samaj Blog`,
      description: blog.metadata || blog.title,
      openGraph: {
        title: blog.title,
        description: blog.metadata || blog.title,
        images: [blog.mainImage || "/images/blog/blog-01.png"],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:4005/api/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiPosts = await response.json();
    const blogPosts = apiPosts.map(transformBlogPost);
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

const BlogPostPage = async ({ params }: BlogPageProps) => {
  const resolvedParams = await params;
  
  try {
    const response = await fetch('http://localhost:4005/api/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiPosts = await response.json();
    const blogPosts = apiPosts.map(transformBlogPost);
    const blog = blogPosts.find((post) => post.slug === resolvedParams.slug);

    if (!blog) {
      notFound();
    }

    // Format the body content with proper line breaks
    const formatBodyContent = (body: string) => {
    return body.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Handle bold text (markdown-style **text**)
      if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.slice(2, -2);
        return (
          <h3 key={index} className="pt-6 pb-2 text-xl font-semibold text-black dark:text-white">
            {text}
          </h3>
        );
      }
      
      // Handle bullet points
      if (line.startsWith('- **')) {
        const text = line.slice(4);
        const [boldPart, ...rest] = text.split('**');
        return (
          <li key={index} className="mb-2 flex items-start">
            <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span>
              <strong>{boldPart}</strong>
              {rest.join('**')}
            </span>
          </li>
        );
      }
      
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="mb-2 flex items-start">
            <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span>{line.slice(2)}</span>
          </li>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="mb-2">
            {line}
          </li>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts.filter(
    (post) => post._id !== blog._id && post.category === blog.category
  ).slice(0, 3);

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            {/* Sidebar */}
            <div className="md:w-1/2 lg:w-[32%]">
              {/* Search */}
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <form>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-hidden dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
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
              </div>

              {/* Categories */}
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>
                <ul>
                  {['Events', 'Business', 'Culture', 'Youth', 'Education'].map((category) => (
                    <li key={category} className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                      <Link href={`/blog?category=${category.toLowerCase()}`}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Posts */}
              <RelatedPost currentPost={blog} allPosts={blogPosts} />
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                {/* Featured Image */}
                <div className="mb-10 w-full overflow-hidden">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    <Image
                      src={blog.mainImage || "/images/blog/blog-01.png"}
                      alt={blog.title}
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                {/* Title */}
                <h1 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  {blog.title}
                </h1>

                {/* Meta Information */}
                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  {blog.author && (
                    <li>
                      <span className="text-black dark:text-white">Author: </span>
                      {blog.author.name}
                    </li>
                  )}
                  {blog.publishedAt && (
                    <li>
                      <span className="text-black dark:text-white">
                        Published On: {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </li>
                  )}
                  {blog.category && (
                    <li>
                      <span className="text-black dark:text-white">Category: </span>
                      {blog.category}
                    </li>
                  )}
                </ul>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Content */}
                <div className="blog-details">
                  {blog.body && formatBodyContent(blog.body)}
                </div>

                {/* Author Bio */}
                {blog.author && blog.author.bio && (
                  <div className="mt-10 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={blog.author.image || "/images/user/user-01.png"}
                          alt={blog.author.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-black dark:text-white">
                          About {blog.author.name}
                        </h4>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          {blog.author.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Post */}
                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
};

export default BlogPostPage;
