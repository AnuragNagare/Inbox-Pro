'use client';

import React, { useState, useEffect } from 'react';
import { getMeetingAnalytics } from '../../utils/meeting-api';

const MeetingAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMeetingAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  const getDetectionRateColor = (rate) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDetectionRateEmoji = (rate) => {
    if (rate >= 80) return '🟢 Excellent';
    if (rate >= 60) return '🟡 Good';
    return '🔴 Needs Improvement';
  };

  const getVolumeEmoji = (count) => {
    if (count >= 100) return '🟢 High';
    if (count >= 20) return '🟡 Medium';
    return '🔴 Low';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
        <div className="text-center py-12">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600">No analytics data available yet.</p>
          <p className="text-sm text-gray-500 mt-2">Analyze some emails to see meeting detection analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">📊 Meeting Analytics</h2>
          <p className="text-gray-600">Track your meeting detection performance and metrics.</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out"
        >
          📈 Refresh
        </button>
      </div>

      <div className="space-y-6">
        {/* Email Analysis Stats */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📧 Email Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Emails Analyzed</p>
              <p className="text-3xl font-bold text-gray-800">{analytics.total_emails_analyzed || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Meetings Detected</p>
              <p className="text-3xl font-bold text-purple-600">{analytics.meetings_detected || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Detection Rate</p>
              <p className={`text-3xl font-bold ${getDetectionRateColor(analytics.detection_rate || 0)}`}>
                {(analytics.detection_rate || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Meeting Types Stats */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Meeting Types</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">📅 Requests</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.meeting_requests || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">✅ Confirmations</p>
              <p className="text-2xl font-bold text-green-600">{analytics.meeting_confirmations || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">❌ Cancellations</p>
              <p className="text-2xl font-bold text-red-600">{analytics.meeting_cancellations || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">🔄 Reschedules</p>
              <p className="text-2xl font-bold text-orange-600">{analytics.meeting_reschedules || 0}</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Performance</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Accuracy Score</p>
              <p className="text-3xl font-bold text-purple-600">{((analytics.accuracy_score || 0) * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Success Indicators */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">📊 Success Metrics:</h4>
            <div className="flex flex-wrap gap-4">
              <span className="text-sm">
                <span className="font-semibold">Detection Rate:</span> {getDetectionRateEmoji(analytics.detection_rate || 0)}
              </span>
              <span className="text-sm">
                <span className="font-semibold">Analysis Volume:</span> {getVolumeEmoji(analytics.total_emails_analyzed || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingAnalytics;

