import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../../types';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{blog.category}</span>
            <span>•</span>
            <span>By {blog.author}</span>
          </div>
        </header>

        <div className="aspect-w-16 aspect-h-9 mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {/* In a real implementation, you'd use a rich text renderer here */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        <footer className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetail; 