import React from 'react';
import { ROUTES, APP_PATHS } from '../config/routes';

const FeaturesSection = () => {
  const features = [
    {
      category: '📧 AI EMAIL ANALYSIS & SEND',
      title: 'Email Analysis & Send',
      description: 'Analyze your emails with adaptive AI that learns from your feedback, and send emails directly through Gmail API. All-in-one solution for intelligent email management with real-time priority scoring.',
      link: ROUTES.API_EMAIL_AI,
      folder: 'API Email AI email analysis and Send Email',
      alignment: 'start'
    },
    {
      category: '📊 FOLLOW-UP EMAIL & ANALYTICS',
      title: 'Follow-up Email Analytics',
      description: 'Generate AI-powered follow-up emails and track campaign performance. View comprehensive analytics including response rates, email performance, and contact metrics.',
      link: ROUTES.FOLLOW_UP_ANALYTICS,
      folder: 'Follow up email and Analystics',
      alignment: 'center'
    },
    {
      category: '📅 MEETING INTENT DETECTION',
      title: 'Smart Meeting Detection',
      description: 'AI analyzes emails to automatically detect meeting requests, confirmations, cancellations, and scheduling discussions. Never miss an important meeting invitation.',
      link: ROUTES.MEETING_INTENT,
      folder: 'Meeting Intent',
      alignment: 'end'
    },
    {
      category: '🎯 PRIORITY FEEDBACK & AUTOMATION',
      title: 'Priority Feedback & Follow-up',
      description: 'Teach AI your preferences and automate follow-up sequences. Create campaigns, add contacts, and automatically generate personalized follow-up emails at scheduled intervals using AI.',
      link: ROUTES.PRIORITY_FEEDBACK,
      folder: 'Priority Feedback and Follow-up Automation',
      alignment: 'start'
    },
    {
      category: '💬 SMART & QUICK REPLY',
      title: 'Smart Quick Reply',
      description: 'Get intelligent reply suggestions tailored to the email context, your tone preferences, and business needs. Save time with one-click professional responses.',
      link: ROUTES.SMART_QUICK_REPLY,
      folder: 'Smart and Quick reply',
      alignment: 'center'
    },
    {
      category: '🔄 FEEDBACK & FOLLOW-UP',
      title: 'Feedback and Follow-up',
      description: 'Provide feedback on AI responses and automate follow-up sequences. Improve AI accuracy over time through your corrections and preferences.',
      link: ROUTES.FEEDBACK_FOLLOW_UP,
      folder: 'Feed back and Follow up',
      alignment: 'end'
    },
  ];

  return (
    <section id="features" className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <h2 
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Powerful Features
        </h2>
        <div className="w-full mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        {features.map((feature, index) => (
          <div 
            key={index}
            className="w-full md:w-1/2 lg:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={300 + index * 100}
          >
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-wrap no-underline hover:no-underline">
                <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                  {feature.category}
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  {feature.title}
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  {feature.description}
                </p>
              </div>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                {feature.folder && (
                  <p className="text-xs text-gray-500 mb-2 text-center">
                    {feature.folder}
                  </p>
                )}
                <button
                  onClick={() => {
                    // Open the app URL in a new tab
                    window.open(feature.link, '_blank');
                  }}
                  className="mx-auto hover:underline gradient text-white font-bold rounded-full my-2 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                >
                  Launch App
                </button>
                <p className="text-xs text-gray-400 text-center mt-1">
                  {feature.link.replace('http://localhost:', 'Port: ')}
                </p>
                <p className="text-xs text-gray-500 text-center mt-1 px-2">
                  {feature.folder}
                </p>
                <div className="text-xs text-gray-500 text-center mt-2 px-4 bg-gray-50 rounded p-2">
                  <p className="font-semibold mb-1">💡 If connection fails:</p>
                  <p className="text-left">
                    1. Open terminal in: <code className="bg-gray-200 px-1 rounded">"{feature.folder}"</code><br/>
                    2. Run: <code className="bg-gray-200 px-1 rounded">npm start</code><br/>
                    3. Wait for compilation, then click again
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

