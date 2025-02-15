import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Guide } from '../../../types';

interface GuideFormData extends Omit<Guide, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}

interface Step {
  title: string;
  description: string;
  image?: string;
}

const GuideForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GuideFormData>({
    title: '',
    content: '',
    category: '',
    steps: []
  });

  useEffect(() => {
    if (id) {
      fetchGuide();
    }
  }, [id]);

  const fetchGuide = async () => {
    try {
      const response = await fetch(`/api/admin/guides/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching guide:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = id ? `/api/admin/guides/${id}` : '/api/admin/guides';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/admin/guides');
      }
    } catch (error) {
      console.error('Error saving guide:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStepImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const formData = new FormData();
      formData.append('image', files[0]);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      setFormData(prev => {
        const newSteps = [...(prev.steps || [])];
        newSteps[index] = {
          ...newSteps[index],
          image: data.url
        };
        return { ...prev, steps: newSteps };
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [
        ...(prev.steps || []),
        { title: '', description: '' }
      ]
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps?.filter((_, i) => i !== index)
    }));
  };

  const updateStep = (index: number, field: keyof Step, value: string) => {
    setFormData(prev => {
      const newSteps = [...(prev.steps || [])];
      newSteps[index] = {
        ...newSteps[index],
        [field]: value
      };
      return { ...prev, steps: newSteps };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {id ? 'Edit Guide' : 'Create New Guide'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Introduction
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Steps</h2>
              <button
                type="button"
                onClick={addStep}
                className="text-primary-600 hover:text-primary-700"
              >
                + Add Step
              </button>
            </div>

            <div className="space-y-6">
              {formData.steps?.map((step, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Step {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Step Title
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => updateStep(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) => updateStep(index, 'description', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image (optional)
                      </label>
                      {step.image && (
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-40 h-40 object-cover rounded-lg mb-2"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleStepImageUpload(e, index)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/guides')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Guide'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuideForm; 