import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        {/* Company Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 1942, we have been at the forefront of the paint industry for over 75 years. 
            Our commitment to quality, innovation, and customer satisfaction has made us one of the 
            leading paint manufacturers in the region.
          </p>
          <p className="text-gray-600">
            Today, we continue to push boundaries in paint technology and color innovation, 
            helping our customers transform their spaces with the perfect colors and finishes.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To inspire and enable our customers to transform their living spaces 
              through innovative paint solutions and expert color guidance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-600">
              To be the most trusted and innovative paint company, enriching lives 
              through color and protection.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously developing new solutions and technologies to meet evolving customer needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                Maintaining the highest standards in our products and services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Committed to environmental responsibility in our products and operations.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">75+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Color Choices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((leader) => (
              <div key={leader} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={`/leaders/leader-${leader}.jpg`}
                    alt={`Leader ${leader}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-gray-600">Chief Executive Officer</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 