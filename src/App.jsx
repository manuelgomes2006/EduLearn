import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CourseDetail } from './pages/CourseDetail';
import { Dashboard } from './pages/Dashboard';
import { CoursePlayer } from './pages/CoursePlayer';
import { InstructorDashboard } from './pages/InstructorDashboard';
import { DistrictAdminPanel } from './pages/DistrictAdminPanel';
import { Checkout } from './pages/Checkout';
import { BillingHistory } from './pages/BillingHistory';
import { AccountSettings } from './pages/AccountSettings';
import { HelpCenter } from './pages/HelpCenter';
import { ContactSupport } from './pages/ContactSupport';
import { PrivacyCompliance } from './pages/PrivacyCompliance';
import { TermsOfService } from './pages/TermsOfService';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NotFound } from './pages/NotFound';

const MainLayout = () => {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith('/player');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      {!isPlayer && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player/:courseId" element={<CoursePlayer />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/admin" element={<DistrictAdminPanel />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />
          <Route path="/billing" element={<BillingHistory />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactSupport />} />
          <Route path="/privacy" element={<PrivacyCompliance />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isPlayer && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
