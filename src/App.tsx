/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import { seedFirestore } from './lib/seed';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminBlog from './pages/admin/AdminBlog';
import AdminUsers from './pages/admin/AdminUsers';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return null;
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear hash on initial load so it always starts at Home
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    seedFirestore().catch(console.error);
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-accent-orange text-xl font-bold">Loading...</div>;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHashElement />
        <div className="min-h-screen bg-bg-dark text-text-main font-sans selection:bg-accent-orange selection:text-white">
          <Routes>
            <Route path="/admin" element={user ? <AdminLayout /> : <Navigate to="/admin/login" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            <Route path="/admin/login" element={user ? <Navigate to="/admin" /> : <AdminLogin />} />
            
            {/* Public routes */}
            <Route path="/*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <Services />
                        <About />
                        <Portfolio />
                        <Contact />
                      </>
                    } />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}


