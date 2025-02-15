import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Guide } from '../../types';

const GuideDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch(`/api/guides/${id}`);
        const data = await response.json();
        setGuide(data);
      } catch (error) {
        console.error('Error fetching guide:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!guide) {
    return <div>Guide not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
          <div className="text-gray-600">{guide.category}</div>
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          <p>{guide.content}</p>
        </div>

        {guide.steps && guide.steps.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Step-by-Step Guide</h2>
            {guide.steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {step.image && (
                      <img
                        src={step.image}
                        alt={step.title}
                        className="mt-4 rounded-lg w-full max-w-md"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default GuideDetail; 