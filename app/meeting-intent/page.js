'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/meeting-intent/Header';
import CredentialValidator from '../../components/meeting-intent/CredentialValidator';
import MeetingDetection from '../../components/meeting-intent/MeetingDetection';
import AutoMeetingDetection from '../../components/meeting-intent/AutoMeetingDetection';
import MeetingAnalytics from '../../components/meeting-intent/MeetingAnalytics';
import RecentDetections from '../../components/meeting-intent/RecentDetections';

export default function MeetingIntentPage() {
  const [activeTab, setActiveTab] = useState('detect');
  const [credentialsValidated, setCredentialsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    // Initialize AOS animations
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
    }
  }, []);

  const handleValidationComplete = (isValid) => {
    setIsValidating(false);
    setCredentialsValidated(isValid);
  };

  // Show validation screen while checking credentials
  if (isValidating) {
    return <CredentialValidator onValidationComplete={handleValidationComplete} />;
  }

  // Show error screen if validation failed
  if (!credentialsValidated) {
    return (
      <div className="min-h-screen email-gradient flex items-center justify-center" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center" data-aos="zoom-in">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Validation Failed</h2>
          <p className="text-gray-600 mb-6">Unable to validate credentials. Please check your backend connection and try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="gradient text-white font-bold rounded-full px-6 py-3 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section id="hero" className="email-gradient text-white pt-24 pb-12">
        <div className="container mx-auto px-3">
          <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-duration="1000">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              📅 Meeting Intent Detection (NEW)
            </h1>
            <p className="leading-normal text-2xl mb-8 max-w-3xl">
              Detect meeting-related content in emails! AI analyzes emails to identify meeting requests, confirmations, cancellations, and scheduling discussions.
            </p>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="relative -mt-12 lg:-mt-24">
          <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
              </g>
              <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path
                  d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab('detect')}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'detect'
                  ? 'gradient text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-aos="fade-up" data-aos-duration="600"
            >
              🔍 Manual Detect
            </button>
            <button
              onClick={() => setActiveTab('auto')}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'auto'
                  ? 'gradient text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-aos="fade-up" data-aos-duration="600" data-aos-delay="100"
            >
              🤖 Auto Detect
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'analytics'
                  ? 'gradient text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-colors ${
                activeTab === 'recent'
                  ? 'gradient text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-aos="fade-up" data-aos-duration="600" data-aos-delay="300"
            >
              📅 Recent Detections
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'detect' && <MeetingDetection />}
          {activeTab === 'auto' && <AutoMeetingDetection />}
          {activeTab === 'analytics' && <MeetingAnalytics />}
          {activeTab === 'recent' && <RecentDetections />}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Inbox Pro AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

