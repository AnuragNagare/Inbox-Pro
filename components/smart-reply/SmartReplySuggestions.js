'use client';

import React, { useState } from 'react';
import { generateSmartReply } from '../../utils/smart-reply-api';

const SmartReplySuggestions = ({ apiKey }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [emailType, setEmailType] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState(null);

  const emailTypes = [
    { value: 'general', label: 'General' },
    { value: 'meeting_request', label: 'Meeting Request' },
    { value: 'follow_up', label: 'Follow-up' },
    { value: 'information_request', label: 'Information Request' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'support', label: 'Support' },
  ];

  const generateSuggestions = async () => {
    if (!subject || !content || !sender) {
      setError('❌ Please fill in all required fields: Subject, Content, and Sender');
      return;
    }

    if (!apiKey) {
      setError('❌ API key not found. Please complete setup.');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestions(null);

    try {
      const data = await generateSmartReply(subject, content, sender, emailType);
      
      // Transform API response to match component expectations
      const transformedSuggestions = {
        quick_reply: data.suggestions.find(s => s.type === 'quick')?.content || '',
        detailed_reply: data.suggestions.find(s => s.type === 'detailed')?.content || '',
        follow_up_reply: data.suggestions.find(s => s.type === 'follow_up')?.content || '',
        suggested_tone: data.suggestions[0]?.tone || 'professional',
        urgency_level: 'same_day',
        key_points: data.suggestions[0]?.key_points || [],
        cost: data.cost,
      };
      
      setSuggestions(transformedSuggestions);
    } catch (err) {
      console.error('Error generating suggestions:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setSubject('');
    setContent('');
    setSender('');
    setEmailType('general');
    setError('');
    setSuggestions(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🤖 Smart Reply Suggestions (NEW)</h2>
        <p className="text-gray-600">Generate AI-powered reply suggestions for any email! Enter email details below to get smart reply options:</p>
      </div>

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Meeting Request - Project Discussion"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 From <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="john@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📋 Email Type
          </label>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {emailTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Email Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Hi, I hope you're doing well. I wanted to follow up on our discussion about the project timeline. Could we schedule a meeting this week to discuss the next steps?"
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="flex-1 gradient text-white font-bold rounded-full px-6 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '🤖 Generating...' : '🤖 Generate Smart Reply Suggestions'}
        </button>
        <button
          onClick={clearFields}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          🗑️ Clear
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Suggestions Display */}
      {suggestions && (
        <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-1">🤖 Smart Reply Suggestions</h3>
            <p className="text-sm opacity-90">Cost: ${suggestions.cost?.toFixed(4) || '0.0000'}</p>
          </div>

          {/* Quick Reply */}
          <div className="reply-card bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">📝 Quick Reply</span>
              <button
                onClick={() => copyToClipboard(suggestions.quick_reply)}
                className="text-sm text-purple-600 hover:text-purple-800 font-semibold"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-800">{suggestions.quick_reply}</p>
          </div>

          {/* Detailed Reply */}
          <div className="reply-card bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">📋 Detailed Reply</span>
              <button
                onClick={() => copyToClipboard(suggestions.detailed_reply)}
                className="text-sm text-purple-600 hover:text-purple-800 font-semibold"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-800">{suggestions.detailed_reply}</p>
          </div>

          {/* Follow-up Reply */}
          <div className="reply-card bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">🔄 Follow-up Reply</span>
              <button
                onClick={() => copyToClipboard(suggestions.follow_up_reply)}
                className="text-sm text-purple-600 hover:text-purple-800 font-semibold"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-800">{suggestions.follow_up_reply}</p>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">🎭 Suggested Tone:</span>
                <span className="ml-2 text-gray-800 capitalize">{suggestions.suggested_tone || 'professional'}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">⏰ Urgency:</span>
                <span className="ml-2 text-gray-800 capitalize">{(suggestions.urgency_level || 'when_convenient').replace('_', ' ')}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">🔑 Key Points:</span>
                <span className="ml-2 text-gray-800">{suggestions.key_points?.join(', ') || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartReplySuggestions;

