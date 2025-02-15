import React from 'react';
import { Link } from 'react-router-dom';
import { latestStories } from '../../data/content';

const LatestStories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Latest Stories</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get inspired with the latest trends and expert advice
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestStories.map(story => (
            <article 
              key={story.id}
              className="bg-white rounded-lg overflow-hidden shadow-md group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                    {story.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{story.date}</span>
                  <Link 
                    to={`/stories/${story.id}`}
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/stories"
            className="inline-block border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-colors"
          >
            View All Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestStories; 