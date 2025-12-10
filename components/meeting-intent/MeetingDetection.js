'use client';

import React, { useState } from 'react';
import { detectMeetingIntent } from '../../utils/meeting-api';

const MeetingDetection = () => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [sender, setSender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleDetect = async () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      setError('❌ Please enter both email subject and content');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await detectMeetingIntent(emailSubject, emailContent, sender);
      setResult(data);
    } catch (err) {
      console.error('Error detecting meeting intent:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  const getMeetingEmoji = (type) => {
    const emojis = {
      'request': '📅',
      'confirmation': '✅',
      'cancellation': '❌',
      'reschedule': '🔄',
      'reminder': '⏰',
      'invitation': '📧'
    };
    return emojis[type] || '📅';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📅 Meeting Intent Detection (NEW)</h2>
        <p className="text-gray-600">Detect meeting-related content in emails! AI analyzes emails to identify meeting requests, confirmations, cancellations, and scheduling discussions.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📧 Email Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Meeting Request - Project Discussion"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Email Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Hi John, I'd like to schedule a meeting to discuss the project. Are you available on Monday at 2 PM?"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👤 Sender Email (Optional)
          </label>
          <input
            type="email"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="john@company.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleDetect}
          disabled={loading || !emailSubject.trim() || !emailContent.trim()}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed pulse-slow"
        >
          {loading ? '🤖 Analyzing...' : '🔍 Detect Meeting Intent'}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {result.meeting_detected ? (
                <span>🤖 Meeting Intent Detected</span>
              ) : (
                <span>🤖 No Meeting Intent Detected</span>
              )}
            </h3>
            {result.cost && (
              <span className="text-sm text-gray-600">Cost: ${result.cost.toFixed(4)}</span>
            )}
          </div>

          {result.meeting_detected ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getMeetingEmoji(result.meeting_type)}</span>
                  <span className="text-lg font-bold text-gray-800">
                    {result.meeting_type ? result.meeting_type.charAt(0).toUpperCase() + result.meeting_type.slice(1) : 'Meeting'}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({((result.confidence_score || 0) * 100).toFixed(1)}% confidence)
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {result.meeting_date && (
                  <div className="bg-white rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">📅 Date:</label>
                    <p className="text-gray-800 font-semibold">{result.meeting_date}</p>
                  </div>
                )}
                {result.meeting_time && (
                  <div className="bg-white rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">⏰ Time:</label>
                    <p className="text-gray-800 font-semibold">{result.meeting_time}</p>
                  </div>
                )}
                {result.meeting_duration && (
                  <div className="bg-white rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">⏱️ Duration:</label>
                    <p className="text-gray-800 font-semibold">{result.meeting_duration}</p>
                  </div>
                )}
                {result.meeting_location && (
                  <div className="bg-white rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">📍 Location:</label>
                    <p className="text-gray-800 font-semibold">{result.meeting_location}</p>
                  </div>
                )}
              </div>

              {result.meeting_participants && (
                <div className="bg-white rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">👥 Participants:</label>
                  <p className="text-gray-800">{result.meeting_participants}</p>
                </div>
              )}

              {result.meeting_purpose && (
                <div className="bg-white rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">🎯 Purpose:</label>
                  <p className="text-gray-800">{result.meeting_purpose}</p>
                </div>
              )}

              {result.ai_analysis && (
                <div className="bg-white rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">🧠 AI Analysis:</label>
                  <p className="text-gray-800 text-sm">{result.ai_analysis}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Confidence:</span> {((result.confidence_score || 0) * 100).toFixed(1)}%
              </p>
              {result.ai_analysis && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">🧠 AI Analysis:</label>
                  <p className="text-gray-800 text-sm">{result.ai_analysis}</p>
                </div>
              )}
              <p className="text-gray-600 mt-2">This email does not appear to contain meeting-related content.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingDetection;

