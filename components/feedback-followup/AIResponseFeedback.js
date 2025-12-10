'use client';

import React, { useState } from 'react';
import { submitAIResponseFeedback } from '../../utils/feedback-followup-api';

const AIResponseFeedback = () => {
  const [responseId, setResponseId] = useState('');
  const [originalResponse, setOriginalResponse] = useState('');
  const [correctedResponse, setCorrectedResponse] = useState('');
  const [feedbackType, setFeedbackType] = useState('correction');
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const feedbackTypes = [
    { value: 'correction', label: '✏️ Correction' },
    { value: 'improvement', label: '✨ Improvement Suggestion' },
    { value: 'tone', label: '🎭 Tone Adjustment' },
    { value: 'accuracy', label: '🎯 Accuracy Issue' },
    { value: 'other', label: '💬 Other' },
  ];

  const submitFeedback = async () => {
    if (!responseId || !originalResponse || !correctedResponse) {
      setError('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await submitAIResponseFeedback(
        responseId,
        originalResponse,
        correctedResponse,
        feedbackType,
        feedbackText
      );
      
      setSuccess(data.message || `✅ Feedback recorded! The AI will learn from your correction.`);
      setResponseId('');
      setOriginalResponse('');
      setCorrectedResponse('');
      setFeedbackType('correction');
      setFeedbackText('');
      
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">💬 AI Response Feedback</h2>
        <p className="text-gray-600">Help improve AI accuracy! When you see an AI-generated response that needs correction, provide feedback to help the AI learn.</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold">{success}</p>
              <p className="text-sm mt-1">Your feedback helps the AI improve over time!</p>
            </div>
          </div>
        </div>
      )}

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

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🆔 Response ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={responseId}
              onChange={(e) => setResponseId(e.target.value)}
              placeholder="response_12345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📋 Feedback Type <span className="text-red-500">*</span>
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              {feedbackTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🤖 Original AI Response <span className="text-red-500">*</span>
          </label>
          <textarea
            value={originalResponse}
            onChange={(e) => setOriginalResponse(e.target.value)}
            placeholder="The AI-generated response that needs correction..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ✅ Corrected Response <span className="text-red-500">*</span>
          </label>
          <textarea
            value={correctedResponse}
            onChange={(e) => setCorrectedResponse(e.target.value)}
            placeholder="Your corrected version of the response..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💬 Why? (Optional)
          </label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Explain why this correction is needed..."
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
            {loading ? '💬 Submitting...' : '💬 Submit Feedback'}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-gray-800 mb-2">💡 How This Helps:</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>The AI learns from your corrections and improves accuracy over time</li>
          <li>Your feedback helps identify patterns and improve response quality</li>
          <li>The more feedback you provide, the better the AI becomes</li>
        </ul>
      </div>
    </div>
  );
};

export default AIResponseFeedback;

