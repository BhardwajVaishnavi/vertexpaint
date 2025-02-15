import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    blogs: 0,
    guides: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-3xl">{stats.products}</p>
          <Link 
            to="/admin/products" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Manage Products
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Blogs</h2>
          <p className="text-3xl">{stats.blogs}</p>
          <Link 
            to="/admin/blogs" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Manage Blogs
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Guides</h2>
          <p className="text-3xl">{stats.guides}</p>
          <Link 
            to="/admin/guides" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Manage Guides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 