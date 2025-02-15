import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../../types';

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'Interior Design',
    'Color Trends',
    'DIY Projects',
    'Home Maintenance',
    'Painting Tips'
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="flex flex-wrap gap-4">
          <button
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(blog.createdAt).toLocaleDateString()} • {blog.category}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">{blog.content}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-500">By {blog.author}</span>
                  <div className="ml-2 flex gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList; 