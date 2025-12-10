import React from 'react';
import { ROUTES } from '../config/routes';

const PricingSection = () => {
  const handleGetStarted = () => {
    window.open(ROUTES.SETUP, '_blank');
  };

  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: 'for 14 days',
      features: [
        'Up to 100 emails/month',
        'Basic AI prioritization',
        'Smart reply suggestions',
        'Gmail integration'
      ],
      button: 'Start Free Trial',
      highlight: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/ month',
      features: [
        'Unlimited emails',
        'Advanced AI scoring',
        'Follow-up campaigns',
        'Meeting detection',
        'Analytics dashboard',
        'Priority learning'
      ],
      button: 'Get Started',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom AI training',
        'Priority support',
        'API access'
      ],
      button: 'Contact Sales',
      highlight: false
    },
  ];

  return (
    <section id="pricing" className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <h2 
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Simple, Transparent Pricing
        </h2>
        <div className="w-full mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col w-5/6 lg:w-1/${plan.highlight ? '3' : '4'} mx-auto lg:mx-0 ${plan.highlight ? 'rounded-lg shadow-lg z-10' : 'rounded-none lg:rounded-l-lg'} bg-white mt-4 ${plan.highlight ? 'sm:-mt-6' : ''}`}
              data-aos={plan.highlight ? "zoom-in" : "fade-up"}
              data-aos-duration="800"
              data-aos-delay={300 + index * 100}
            >
              <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                <div className="p-8 text-3xl font-bold text-center border-b-4">
                  {plan.name}
                </div>
                {plan.highlight && <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>}
                <ul className={`w-full text-center ${plan.highlight ? 'text-base font-bold' : 'text-sm'}`}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="border-b py-4">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className={`w-full pt-6 ${plan.highlight ? 'text-4xl' : 'text-3xl text-gray-600'} font-bold text-center`}>
                  {plan.price}
                  <span className="text-base"> {plan.period}</span>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleGetStarted}
                    className={`mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ${plan.highlight ? 'pulse-slow' : ''}`}
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

