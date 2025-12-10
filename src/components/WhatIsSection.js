import React from 'react';

const WhatIsSection = () => {
  return (
    <section className="bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <h2 
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          What is Inbox Pro AI?
        </h2>
        <div className="w-full mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap">
          <div 
            className="w-5/6 sm:w-1/2 p-6"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Your AI Email Assistant
            </h3>
            <p className="text-gray-600 mb-8">
              Inbox Pro AI is a revolutionary email management platform that uses advanced artificial intelligence to transform how you handle your inbox.
              <br />
              <br />
              Our AI learns from your email patterns, understands your business priorities, and automatically categorizes emails by importance - from critical business communications to low-priority newsletters.
              <br />
              <br />
              <strong>Never miss an important email again.</strong>
            </p>
          </div>
          <div 
            className="w-full sm:w-1/2 p-6"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4 float">📧</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Smart Inbox</h4>
                <p className="text-gray-600">AI-powered email prioritization that learns your preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;

