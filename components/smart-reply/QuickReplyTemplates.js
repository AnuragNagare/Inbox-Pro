'use client';

import React, { useState, useEffect } from 'react';
import { getTemplates } from '../../utils/smart-reply-api';

const QuickReplyTemplates = () => {
  const [templateType, setTemplateType] = useState('acknowledgment');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [templates, setTemplates] = useState({
    acknowledgment: [
      "Thank you for your email. I'll review this and get back to you shortly.",
      "Received your message. I'll respond with details soon.",
      "Thanks for reaching out. I'll look into this and follow up."
    ],
    meeting_request: [
      "I'd be happy to schedule a meeting. What times work best for you this week?",
      "Let's set up a call to discuss this further. I'm available [time slots].",
      "I'm interested in meeting. Please suggest a few times that work for you."
    ],
    follow_up: [
      "Following up on our previous conversation. Do you have any updates?",
      "Just checking in on the status. How are things progressing?",
      "I wanted to touch base and see if you need any additional information."
    ],
    decline: [
      "Thank you for the opportunity, but I'm not able to proceed at this time.",
      "I appreciate your interest, but I'll have to pass on this occasion.",
      "Thanks for reaching out, but this isn't a good fit for me right now."
    ],
    information_request: [
      "I'd be happy to provide that information. Let me gather the details and send them over.",
      "I can help with that. I'll compile the information and get back to you.",
      "I'll look into this and provide you with the requested details."
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch templates from API on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const data = await getTemplates();
        if (data.templates) {
          setTemplates(data.templates);
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(`❌ Error: ${err.message}. Using default templates.`);
        // Keep default templates if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const templateLabels = {
    acknowledgment: "✅ Acknowledgment",
    meeting_request: "📅 Meeting Request",
    follow_up: "🔄 Follow-up",
    decline: "❌ Decline",
    information_request: "ℹ️ Information Request"
  };

  const applyTemplate = () => {
    const templateOptions = templates[templateType];
    if (!templateOptions) {
      setSelectedTemplate('❌ Template type not found');
      return;
    }

    let result = templateOptions[0]; // Use first template option
    if (customMessage.trim()) {
      result = `${result} ${customMessage}`;
    }

    setSelectedTemplate(result);
  };

  const getAllTemplatesDisplay = () => {
    return Object.entries(templates).map(([type, options]) => (
      <div key={type} className="mb-6">
        <h4 className="font-bold text-gray-800 mb-3 text-lg">{templateLabels[type]}:</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          {options.map((template, index) => (
            <li key={index} className="text-gray-700 italic">"{template}"</li>
          ))}
        </ul>
      </div>
    ));
  };

  const templatesDisplay = getAllTemplatesDisplay();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">⚡ Quick Reply Templates</h2>
        <p className="text-gray-600">Instant pre-built templates for common email scenarios. No AI required - fast and free!</p>
        {loading && <p className="text-sm text-purple-600 mt-2">Loading templates from API...</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📋 Template Type
          </label>
          <select
            value={templateType}
            onChange={(e) => {
              setTemplateType(e.target.value);
              setSelectedTemplate('');
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.keys(templates).map(type => (
              <option key={type} value={type}>{templateLabels[type]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ✏️ Custom Message (Optional)
          </label>
          <input
            type="text"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="I'll get back to you by tomorrow"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">Add custom text to append to the template</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={applyTemplate}
          className="flex-1 gradient text-white font-bold rounded-full px-6 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          ⚡ Apply Quick Reply Template
        </button>
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          {showAll ? '📋 Hide Templates' : '📋 Show All Templates'}
        </button>
      </div>

      {/* Selected Template Display */}
      {selectedTemplate && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Selected Template:</h3>
            <button
              onClick={() => copyToClipboard(selectedTemplate)}
              className="text-sm text-purple-600 hover:text-purple-800 font-semibold"
            >
              Copy
            </button>
          </div>
          <p className="text-gray-800 italic">{selectedTemplate}</p>
        </div>
      )}

      {/* Show All Templates */}
      {showAll && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Quick Reply Templates Available:</h3>
          <div className="space-y-6">
            {templatesDisplay}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickReplyTemplates;

