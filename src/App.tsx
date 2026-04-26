/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { seedFirestore } from './lib/seed';

export default function App() {
  useEffect(() => {
    seedFirestore().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-text-main font-sans selection:bg-accent-orange selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
