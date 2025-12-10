import React from 'react';

const ProblemsSection = () => {
  const problems = [
    { emoji: '😰', title: 'Email Overwhelm', description: 'Hundreds of emails daily with no clear priority system. Important messages get buried in the noise.' },
    { emoji: '⏰', title: 'Time Wasted', description: 'Spending hours manually sorting through emails instead of focusing on high-value work.' },
    { emoji: '❌', title: 'Missed Opportunities', description: 'Critical business emails and hot leads getting lost in the shuffle, costing you money.' },
    { emoji: '🤖', title: 'Manual Work', description: 'Repetitive email tasks like follow-ups and responses that could be automated.' },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <h2 
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Problems We Solve
        </h2>
        <div className="w-full mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={300 + index * 100}
            >
              <div className="text-4xl mb-4 float">{problem.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;

