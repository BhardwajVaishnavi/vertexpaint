import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/home/HomePage';
import ColorVisualizerPage from './pages/ColorVisualizer';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetail from './pages/products/ProductDetail';
import ServicesPage from './pages/services/ServicesPage';
import SafePaintingPage from './pages/services/SafePaintingPage';
import ColourConsultancyPage from './pages/services/ColourConsultancyPage';
import DealerLocatorPage from './pages/services/DealerLocatorPage';
import PaintCalculatorPage from './pages/services/PaintCalculatorPage';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import BlogPage from './pages/blog/BlogPage';
import BlogDetail from './pages/blog/BlogDetail';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfUsePage from './pages/legal/TermsOfUsePage';
import SitemapPage from './pages/legal/SitemapPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProductList from './pages/admin/products/ProductList';
import AdminProductForm from './pages/admin/products/ProductForm';
import AdminBlogList from './pages/admin/blogs/BlogList';
import AdminBlogForm from './pages/admin/blogs/BlogForm';
import AdminGuideList from './pages/admin/guides/GuideList';
import AdminGuideForm from './pages/admin/guides/GuideForm';
import InteriorPaintsPage from './pages/products/InteriorPaintsPage';
import ExteriorPaintsPage from './pages/products/ExteriorPaintsPage';
import TexturesPage from './pages/products/TexturesPage';
import TextureDetail from './pages/products/TextureDetail';
import ColourRoomsPage from './pages/colours/ColourRoomsPage';
import RoomColoursPage from './pages/colours/RoomColoursPage';
import ColourCombinationsPage from './pages/colours/ColourCombinationsPage';
import WaterproofingPage from './pages/services/WaterproofingPage';
import BookPainterPage from './pages/services/BookPainterPage';
import StoreLocatorPage from './pages/services/StoreLocatorPage';
import TrackOrderPage from './pages/services/TrackOrderPage';
import LoginPage from './pages/services/LoginPage';
import CartPage from './pages/services/CartPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/visualizer" element={<ColorVisualizerPage />} />
            
            {/* Products */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:category" element={<ProductsPage />} />
            <Route path="/products/detail/:id" element={<ProductDetail />} />
            
            {/* Paint Routes */}
            <Route path="/products/interior" element={<InteriorPaintsPage />} />
            <Route path="/products/interior/:id" element={<ProductDetail />} />
            <Route path="/products/exterior" element={<ExteriorPaintsPage />} />
            <Route path="/products/exterior/:id" element={<ProductDetail />} />
            <Route path="/textures" element={<TexturesPage />} />
            <Route path="/textures/:id" element={<TextureDetail />} />
            
            {/* Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/safe-painting" element={<SafePaintingPage />} />
            <Route path="/services/waterproofing" element={<WaterproofingPage />} />
            <Route path="/services/book-painter" element={<BookPainterPage />} />
            <Route path="/services/colour-consultancy" element={<ColourConsultancyPage />} />
            <Route path="/services/dealer-locator" element={<DealerLocatorPage />} />
            <Route path="/services/paint-calculator" element={<PaintCalculatorPage />} />
            
            {/* Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            
            {/* Other Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            
            {/* Paint Routes */}
            <Route path="/products/interior" element={<InteriorPaintsPage />} />
            <Route path="/products/interior/:id" element={<ProductDetail />} />
            <Route path="/products/exterior" element={<ExteriorPaintsPage />} />
            <Route path="/products/exterior/:id" element={<ProductDetail />} />
            <Route path="/textures" element={<TexturesPage />} />
            <Route path="/textures/:id" element={<TextureDetail />} />
            
            {/* Colour Routes */}
            <Route path="/colours/rooms" element={<ColourRoomsPage />} />
            <Route path="/colours/:room" element={<RoomColoursPage />} />
            <Route path="/colours/combinations" element={<ColourCombinationsPage />} />
            
            {/* Service Routes */}
            <Route path="/services/safe-painting" element={<SafePaintingPage />} />
            <Route path="/services/waterproofing" element={<WaterproofingPage />} />
            <Route path="/services/book-painter" element={<BookPainterPage />} />
            <Route path="/services/colour-consultancy" element={<ColourConsultancyPage />} />
            
            {/* Utility Routes */}
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/paint-budget-calculator" element={<PaintCalculatorPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/products/new" element={<AdminProductForm />} />
            <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
            <Route path="/admin/blogs" element={<AdminBlogList />} />
            <Route path="/admin/blogs/new" element={<AdminBlogForm />} />
            <Route path="/admin/blogs/:id/edit" element={<AdminBlogForm />} />
            <Route path="/admin/guides" element={<AdminGuideList />} />
            <Route path="/admin/guides/new" element={<AdminGuideForm />} />
            <Route path="/admin/guides/:id/edit" element={<AdminGuideForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 