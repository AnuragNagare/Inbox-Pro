'use client';

import React, { useState } from 'react';
import { fetchEmails as fetchEmailsAPI, getApiUrl } from '../../utils/email-api';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [maxResults, setMaxResults] = useState(10);
  const [useAdaptiveLearning, setUseAdaptiveLearning] = useState(true);

  const fetchEmails = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchEmailsAPI(query, maxResults, useAdaptiveLearning);

      // Transform API response to match component expectations
      const transformedEmails = data.emails.map(email => ({
        id: email.id,
        subject: email.subject,
        sender: email.sender,
        snippet: email.snippet,
        date: email.date,
        category: email.priority.category,
        priority: `${getPriorityEmoji(email.priority.category)} ${email.priority.category.replace('_', ' ')} | AI: ${(email.priority.confidence * 100).toFixed(0)}% confident | ${email.priority.reasoning}`,
        cost: email.cost,
      }));

      setEmails(transformedEmails);

      if (data.total_cost && data.total_cost > 0) {
        console.log(`Total cost: $${data.total_cost.toFixed(4)}`);
      }
    } catch (err) {
      console.error('Error fetching emails:', err);
      const apiUrl = getApiUrl();

      let errorMsg = `❌ Error: ${err.message}\n\n`;
      
      if (err.message.includes('Gmail not connected') || err.message.includes('OAuth flow')) {
        errorMsg += `🔧 **Setup Required:**\n\n`;
        errorMsg += `Gmail OAuth needs to be completed. Please:\n\n`;
        errorMsg += `1. Open terminal in backend directory:\n`;
        errorMsg += `   cd "D:\\Inbox Pro\\Codes\\backend"\n\n`;
        errorMsg += `2. Run the setup script:\n`;
        errorMsg += `   python setup_gmail_oauth.py\n\n`;
        errorMsg += `3. Complete OAuth flow in the browser window\n`;
        errorMsg += `4. Restart the backend server\n`;
        errorMsg += `5. Refresh this page\n\n`;
        errorMsg += `💡 See SETUP_INSTRUCTIONS.md for detailed steps.`;
      } else {
        errorMsg += `💡 Backend is running on ${apiUrl}.\n`;
        errorMsg += `Check browser DevTools → Network tab to see what's being sent.`;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadgeClass = (category) => {
    const categoryMap = {
      'CRITICAL': 'priority-critical',
      'HOT_LEAD': 'priority-hot',
      'ACTION_NEEDED': 'priority-action',
      'WARM': 'priority-warm',
      'REVIEW': 'priority-review',
      'COLD': 'priority-cold',
    };
    return categoryMap[category] || 'priority-review';
  };

  const getPriorityEmoji = (category) => {
    const emojiMap = {
      'CRITICAL': '🚨',
      'HOT_LEAD': '🔥',
      'ACTION_NEEDED': '⚡',
      'WARM': '🟡',
      'REVIEW': '📝',
      'COLD': '❄️',
    };
    return emojiMap[category] || '📝';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🧠 Adaptive AI Email Analysis</h2>
        <p className="text-gray-600">AI analyzes your emails and assigns priority scores based on business importance</p>
      </div>

      {/* Backend Status */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          ✅ <strong>Backend Connected:</strong> Server running on <code className="bg-green-100 px-2 py-1 rounded">http://localhost:9000</code>
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., is:unread, from:client@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Results</label>
            <input
              type="number"
              value={maxResults}
              onChange={(e) => setMaxResults(parseInt(e.target.value))}
              min="1"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useAdaptiveLearning}
              onChange={(e) => setUseAdaptiveLearning(e.target.checked)}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Use Adaptive Learning (learns from your feedback)</span>
          </label>

          <button
            onClick={fetchEmails}
            disabled={loading}
            className="ml-auto gradient text-white font-bold rounded-full px-6 py-3 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Analyzing...' : '📥 Fetch & Analyze Emails'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
          <div className="whitespace-pre-line">{error}</div>
        </div>
      )}

      {/* Email List */}
      <div className="space-y-4">
        {emails.length === 0 && !loading && !error && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p>No emails found. Click "Fetch & Analyze Emails" to get started.</p>
          </div>
        )}

        {emails.map((email, index) => (
          <div
            key={email.id || index}
            className="email-card bg-gray-50 rounded-lg p-4 border border-gray-200"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`priority-badge ${getPriorityBadgeClass(email.category)}`}>
                    {email.priority?.split('|')[0].trim() || '📝 Review'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {email.priority?.split('|').slice(1).join(' | ')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{email.subject || 'No Subject'}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>From:</strong> {email.sender || 'Unknown Sender'}
                </p>
                <p className="text-gray-700 mb-2">{email.snippet || 'No preview available'}</p>
                {email.date && (
                  <p className="text-xs text-gray-500">
                    {new Date(email.date).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;

