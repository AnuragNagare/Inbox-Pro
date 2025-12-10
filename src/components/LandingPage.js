import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import WhatIsSection from './WhatIsSection';
import ProblemsSection from './ProblemsSection';
import FeaturesSection from './FeaturesSection';
import AdditionalFeaturesSection from './AdditionalFeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import Footer from './Footer';
import { getBackendStatus } from '../utils/api';

const LandingPage = () => {
  const [backendStatus, setBackendStatus] = useState(null);

  useEffect(() => {
    // Check backend status on mount
    getBackendStatus().then(status => {
      setBackendStatus(status);
    });
  }, []);

  return (
    <div className="leading-normal tracking-normal text-white email-gradient" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      <Navigation />
      <HeroSection />
      <WhatIsSection />
      <ProblemsSection />
      <FeaturesSection />
      <AdditionalFeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;

