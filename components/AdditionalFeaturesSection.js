const AdditionalFeaturesSection = () => {
  const features = [
    { emoji: '📊', title: 'Meeting Detection', description: 'Automatically identify meeting requests and extract key details like time, location, and participants.' },
    { emoji: '🧠', title: 'Learning AI', description: 'Our AI learns from your feedback to continuously improve email prioritization accuracy.' },
    { emoji: '📈', title: 'Analytics Dashboard', description: 'Track your email productivity, AI usage costs, and campaign performance with detailed analytics.' },
    { emoji: '🔗', title: 'Gmail Integration', description: 'Seamlessly integrates with Gmail using secure OAuth2 authentication for complete email access.' },
    { emoji: '💰', title: 'Cost Tracking', description: 'Real-time monitoring of AI usage costs with detailed breakdowns and budget controls.' },
    { emoji: '⚡', title: 'Quick Templates', description: 'Pre-built email templates for common scenarios with customizable tone and context options.' },
  ]

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <h2 
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          More Powerful Features
        </h2>
        <div className="w-full mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay={300 + index * 100}
            >
              <div className="text-4xl mb-4 float">{feature.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdditionalFeaturesSection

