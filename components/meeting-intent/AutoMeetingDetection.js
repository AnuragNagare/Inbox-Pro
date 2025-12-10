'use client';

import React, { useState, useEffect } from 'react';
import { detectMeetingIntent, fetchGmailEmails } from '../../utils/meeting-api';

const AutoMeetingDetection = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('is:unread'); // Default: unread emails
  const [maxResults, setMaxResults] = useState(10);
  const [autoDetect, setAutoDetect] = useState(false);
  const [meetingEmails, setMeetingEmails] = useState([]);
  const [nonMeetingEmails, setNonMeetingEmails] = useState([]);

  // Auto-detect meeting intent when emails are loaded
  useEffect(() => {
    if (autoDetect && emails.length > 0 && !analyzing) {
      analyzeAllEmails();
    }
  }, [emails, autoDetect]);

  const fetchEmails = async () => {
    setLoading(true);
    setError('');
    setEmails([]);
    setMeetingEmails([]);
    setNonMeetingEmails([]);

    try {
      const data = await fetchGmailEmails(query, maxResults);
      
      const transformedEmails = data.emails.map(email => ({
        id: email.id,
        subject: email.subject || 'No Subject',
        sender: email.sender || 'Unknown',
        snippet: email.snippet || '',
        content: email.content || email.snippet || '',
        date: email.date,
        meetingDetected: null, // Will be set after analysis
        meetingData: null,
      }));

      setEmails(transformedEmails);

      // Auto-analyze if auto-detect is enabled
      if (autoDetect) {
        analyzeAllEmails(transformedEmails);
      }
    } catch (err) {
      console.error('Error fetching emails:', err);
      let errorMsg = `❌ Error: ${err.message}\n\n`;
      
      if (err.message.includes('Gmail not connected') || err.message.includes('OAuth')) {
        errorMsg += `🔧 **Gmail Setup Required:**\n\n`;
        errorMsg += `1. Make sure backend is running\n`;
        errorMsg += `2. Complete Gmail OAuth setup (see SETUP_INSTRUCTIONS.md)\n`;
        errorMsg += `3. Refresh this page\n`;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const analyzeAllEmails = async (emailsToAnalyze = null) => {
    const emailsToProcess = emailsToAnalyze || emails;
    if (emailsToProcess.length === 0) return;

    setAnalyzing(true);
    setError('');

    const meetingResults = [];
    const nonMeetingResults = [];

    try {
      // Analyze each email
      for (let i = 0; i < emailsToProcess.length; i++) {
        const email = emailsToProcess[i];
        
        try {
          const result = await detectMeetingIntent(
            email.subject,
            email.content || email.snippet,
            email.sender
          );

          const updatedEmail = {
            ...email,
            meetingDetected: result.meeting_detected,
            meetingData: result,
          };

          if (result.meeting_detected) {
            meetingResults.push(updatedEmail);
          } else {
            nonMeetingResults.push(updatedEmail);
          }

          // Update the email in the list
          setEmails(prev => 
            prev.map(e => e.id === email.id ? updatedEmail : e)
          );

        } catch (err) {
          console.error(`Error analyzing email ${email.id}:`, err);
          // Continue with next email even if one fails
          nonMeetingResults.push({
            ...email,
            meetingDetected: false,
            meetingData: { error: err.message },
          });
        }

        // Small delay to avoid overwhelming the API
        if (i < emailsToProcess.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setMeetingEmails(meetingResults);
      setNonMeetingEmails(nonMeetingResults);
    } catch (err) {
      setError(`❌ Error during analysis: ${err.message}`);
    } finally {
      setAnalyzing(false);
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🤖 Automatic Meeting Detection</h2>
        <p className="text-gray-600">Automatically read emails from Gmail and detect meeting intent!</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <div className="whitespace-pre-line">{error}</div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gmail Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., is:unread, from:client@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Gmail search query (e.g., is:unread, is:inbox)</p>
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
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Auto-detect meeting intent after fetching</span>
          </label>

          <button
            onClick={fetchEmails}
            disabled={loading || analyzing}
            className="ml-auto gradient text-white font-bold rounded-full px-6 py-3 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '📥 Fetching...' : analyzing ? '🤖 Analyzing...' : '📥 Fetch Emails from Gmail'}
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      {(meetingEmails.length > 0 || nonMeetingEmails.length > 0) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{emails.length}</p>
              <p className="text-sm text-gray-600">Total Emails</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{meetingEmails.length}</p>
              <p className="text-sm text-gray-600">Meetings Detected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{nonMeetingEmails.length}</p>
              <p className="text-sm text-gray-600">Non-Meeting Emails</p>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Emails Section */}
      {meetingEmails.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            📅 Emails with Meeting Intent ({meetingEmails.length})
          </h3>
          <div className="space-y-4">
            {meetingEmails.map((email, index) => (
              <div
                key={email.id || index}
                className="bg-green-50 border-2 border-green-300 rounded-lg p-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {getMeetingEmoji(email.meetingData?.meeting_type)}
                      </span>
                      <span className="font-bold text-gray-800">
                        {email.meetingData?.meeting_type?.charAt(0).toUpperCase() + email.meetingData?.meeting_type?.slice(1) || 'Meeting'}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({((email.meetingData?.confidence_score || 0) * 100).toFixed(1)}% confidence)
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{email.subject}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>From:</strong> {email.sender}
                    </p>
                    <p className="text-gray-700 mb-2">{email.snippet}</p>
                    
                    {/* Meeting Details */}
                    {email.meetingData && (
                      <div className="mt-3 grid md:grid-cols-2 gap-2 text-sm">
                        {email.meetingData.meeting_date && (
                          <div>
                            <span className="font-semibold">📅 Date:</span> {email.meetingData.meeting_date}
                          </div>
                        )}
                        {email.meetingData.meeting_time && (
                          <div>
                            <span className="font-semibold">⏰ Time:</span> {email.meetingData.meeting_time}
                          </div>
                        )}
                        {email.meetingData.meeting_location && (
                          <div>
                            <span className="font-semibold">📍 Location:</span> {email.meetingData.meeting_location}
                          </div>
                        )}
                        {email.meetingData.meeting_purpose && (
                          <div>
                            <span className="font-semibold">🎯 Purpose:</span> {email.meetingData.meeting_purpose}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-Meeting Emails Section */}
      {nonMeetingEmails.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            📧 Regular Emails ({nonMeetingEmails.length})
          </h3>
          <div className="space-y-4">
            {nonMeetingEmails.map((email, index) => (
              <div
                key={email.id || index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{email.subject}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>From:</strong> {email.sender}
                </p>
                <p className="text-gray-700">{email.snippet}</p>
                {email.meetingData?.confidence_score && (
                  <p className="text-xs text-gray-500 mt-2">
                    Confidence: {((email.meetingData.confidence_score) * 100).toFixed(1)}% (not a meeting)
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {emails.length === 0 && !loading && !error && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📭</div>
          <p>No emails loaded. Click "Fetch Emails from Gmail" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AutoMeetingDetection;

