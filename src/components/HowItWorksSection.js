import React from 'react';
import { ROUTES } from '../config/routes';

const HowItWorksSection = () => {
  const steps = [
    { number: '1', title: 'Connect Your Gmail', description: 'Securely connect your Gmail account using OAuth2 authentication. Your data stays private and secure.' },
    { number: '2', title: 'AI Analyzes Your Emails', description: 'Our AI scans your emails and learns your patterns to understand what\'s important to you.' },
    { number: '3', title: 'Get Smart Prioritization', description: 'Emails are automatically scored and categorized so you can focus on what matters most.' },
    { number: '4', title: 'Automate & Optimize', description: 'Use smart replies, automated follow-ups, and continuous learning to maximize your email productivity.' },
  ];

  return (
    <section id="how-it-works" className="bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <h2 
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          How It Works
        </h2>
        <div className="w-full mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div 
            className="w-full sm:w-1/2 p-6 mt-6"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-start"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={400 + index * 100}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 pulse-slow">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div 
            className="w-full sm:w-1/2 p-6 mt-6"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4 float">🚀</div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Inbox?</h4>
                <p className="text-gray-600 mb-6">Join thousands of professionals who have revolutionized their email workflow with Inbox Pro AI.</p>
                <button
                  onClick={() => window.open(ROUTES.SETUP, '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transform transition hover:scale-105 duration-300 pulse-slow"
                >
                  Start Your Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

