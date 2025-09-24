'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Blog API Configuration
const API_KEY = 'AIzaSyDfc6DXGg_VASW_PivGv7gmNglcrT-_EtI';
const BLOG_ID = '3036668774632497871';
const POSTS_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=3`;

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  url: string;
}

interface BlogSectionProps {
  className?: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ className = '' }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(POSTS_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setPosts(data.items);
      } else {
        setError('No blog posts found');
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const extractImageFromContent = (content: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imgElements = doc.querySelectorAll('img');
    
    // Domains that typically block hotlinking
    const blockedDomains = [
      'media.licdn.com',
      'linkedin.com',
      'scontent.facebook.com',
      'instagram.com',
      'twitter.com',
      'x.com'
    ];
    
    // Find the first image that's not from a blocked domain
    for (const img of imgElements) {
      if (img.src) {
        const isBlocked = blockedDomains.some(domain => img.src.includes(domain));
        if (!isBlocked) {
          return img.src;
        }
      }
    }
    
    // Fallback to a simple gray placeholder as data URL
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+QmxvZyBQb3N0PC90ZXh0Pgo8L3N2Zz4K';
  };

  const createSummary = (content: string): string => {
    // Remove HTML tags and create summary
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...' 
      : textContent;
  };

  if (loading) {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-48 mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchLatestPosts}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No blog posts available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {posts.map((post) => (
        <article key={post.id} className="blog-post group">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={extractImageFromContent(post.content)}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+QmxvZyBQb3N0PC90ZXh0Pgo8L3N2Zz4K';
              }}
            />
          </div>
          
          <div className="blog-content">
            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
              {createSummary(post.content)}
            </p>
            
            <div className="flex items-center justify-between">
              <time className="text-xs text-muted-foreground">
                {new Date(post.published).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              
              <Link
                href={`https://apilageai.lk/blog/post.html?id=${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

// Hook for blog functionality
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (maxResults: number = 3) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${maxResults}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts
  };
};

export default BlogSection;
