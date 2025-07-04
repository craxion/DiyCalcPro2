import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FramingCalculatorPage } from './pages/FramingCalculatorPage';
import { AllCalculatorsPage } from './pages/AllCalculatorsPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-grey-200 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/calculators" element={<AllCalculatorsPage />} />
            {/* Specific route for framing calculator - must come before the general pattern */}
            <Route path="/calculators/construction-and-building/framing-material-estimator" element={<FramingCalculatorPage />} />
            <Route path="/calculators/:categorySlug" element={<CategoryPage />} />
            <Route path="/calculators/:categorySlug/:calculatorSlug" element={<CalculatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;