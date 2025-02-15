import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper';

const ColourConsultancyPage = () => {
  const CONSULTATION_IMAGES = {
    expert: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800",
    swatches: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800",
    visualization: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
  };

  return (
    <PageWrapper>
      <div className="font-times container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Colour Consultancy</h1>
        {/* Add content */}
      </div>
    </PageWrapper>
  );
};

export default ColourConsultancyPage; 