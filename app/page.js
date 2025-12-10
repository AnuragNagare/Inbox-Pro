'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import WhatIsSection from '@/components/WhatIsSection'
import ProblemsSection from '@/components/ProblemsSection'
import FeaturesSection from '@/components/FeaturesSection'
import AdditionalFeaturesSection from '@/components/AdditionalFeaturesSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import PricingSection from '@/components/PricingSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import { getBackendStatus } from '@/utils/api'

export default function Home() {
  const [backendStatus, setBackendStatus] = useState(null)

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })

    // Check backend status on mount
    getBackendStatus().then(status => {
      setBackendStatus(status)
    })
  }, [])

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
  )
}

