import React from 'react';
import { latestStories } from '../../data/content';

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestStories.map(story => (
          <article key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-sm text-primary-600 mb-2 inline-block">{story.category}</span>
              <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
              <p className="text-gray-600 mb-4">{story.excerpt}</p>
              <div className="text-sm text-gray-500">{story.date}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage; 