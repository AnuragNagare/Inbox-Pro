'use client';

import React, { useState } from 'react';
import { submitPriorityFeedback } from '../../utils/priority-feedback-api';

const PriorityFeedback = () => {
  const [emailId, setEmailId] = useState('');
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [snippet, setSnippet] = useState('');
  const [aiPriority, setAiPriority] = useState('');
  const [correctPriority, setCorrectPriority] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const priorityOptions = [
    { value: '🚨 CRITICAL', label: '🚨 CRITICAL' },
    { value: '🔥 Hot Lead', label: '🔥 Hot Lead' },
    { value: '⚡ Action Needed', label: '⚡ Action Needed' },
    { value: '🟡 Warm Lead', label: '🟡 Warm Lead' },
    { value: '📝 Review', label: '📝 Review' },
    { value: '❄️ Cold', label: '❄️ Cold' },
  ];

  const submitFeedback = async () => {
    if (!emailId || !subject || !sender || !snippet || !aiPriority || !correctPriority) {
      setError('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Clean priority values (remove emojis for API)
      const cleanAiPriority = aiPriority.replace(/[🚨🔥⚡🟡📝❄️]/g, '').trim();
      const cleanUserPriority = correctPriority.replace(/[🚨🔥⚡🟡📝❄️]/g, '').trim().replace('Hot Lead', 'HOT_LEAD').replace('Action Needed', 'ACTION_NEEDED').replace('Warm Lead', 'WARM').replace(' ', '_').toUpperCase();
      
      const data = await submitPriorityFeedback(
        emailId,
        subject,
        sender,
        snippet,
        cleanAiPriority,
        cleanUserPriority,
        feedbackText
      );
      
      setSuccess(data.message || `✅ Feedback recorded! You corrected priority to: ${correctPriority}`);
      setEmailId('');
      setSubject('');
      setSender('');
      setSnippet('');
      setAiPriority('');
      setCorrectPriority('');
      setFeedbackText('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🎯 AI Priority Feedback (Phase 2)</h2>
        <p className="text-gray-600">Teach the AI your preferences! When you see email priorities above, you can provide feedback to improve accuracy:</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold">{success}</p>
              <p className="text-sm mt-1">The AI will learn from your feedback and improve over time!</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="abc12345..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📋 Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 Sender <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="sender@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Snippet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              placeholder="Email preview text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🤖 AI Priority <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={aiPriority}
              onChange={(e) => setAiPriority(e.target.value)}
              placeholder="What AI said (e.g., HOT_LEAD)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ✅ Correct Priority <span className="text-red-500">*</span>
            </label>
            <select
              value={correctPriority}
              onChange={(e) => setCorrectPriority(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Select priority...</option>
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💬 Why? (Optional)
          </label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="This sender always sends urgent items..."
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">Help AI understand your reasoning</p>
        </div>

        <div className="pt-4">
          <button
            onClick={submitFeedback}
            disabled={loading}
            className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🎯 Submitting...' : '🎯 Submit Priority Feedback'}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-gray-800 mb-2">💡 How This Helps:</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>The AI learns from your corrections and improves accuracy over time</li>
          <li>Your feedback helps identify patterns (e.g., "this sender is always urgent")</li>
          <li>The more feedback you provide, the better the AI becomes at prioritizing</li>
        </ul>
      </div>
    </div>
  );
};

export default PriorityFeedback;

