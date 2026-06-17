
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import MutualFundsPage from './pages/MutualFundsPage.jsx';
import InsurancePage from './pages/InsurancePage.jsx';
import CalculatorPage from './pages/CalculatorPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import IntelligencePage from './pages/IntelligencePage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/mutual-funds" element={<MutualFundsPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/intelligence" element={<IntelligencePage />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-8">Page not found</p>
              <a href="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200">
                Back to home
              </a>
            </div>
          </div>
        } />
      </Routes>
      <WhatsAppButton />
      <Toaster />
    </Router>
  );
}

export default App;
