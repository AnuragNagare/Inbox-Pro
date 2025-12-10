'use client';

import React, { useState, useEffect } from 'react';
import { getCampaignAnalytics } from '../../utils/follow-up-api';

const FollowUpAnalytics = () => {
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
      const data = await getCampaignAnalytics();
      
      setAnalytics({
        campaigns: {
          total: data.total_campaigns || 0,
          active: data.active_campaigns || 0,
        },
        contacts: {
          total: data.total_contacts || 0,
          active: data.total_contacts || 0,
          responses_received: 0,
        },
        emails: {
          total_sent: data.emails_sent || 0,
          with_responses: 0,
          response_rate: data.response_rate || 0,
        },
        cost: data.total_cost || 0,
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  const getResponseRateColor = (rate) => {
    if (rate >= 20) return 'text-green-600';
    if (rate >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseRateEmoji = (rate) => {
    if (rate >= 20) return '🟢 Excellent';
    if (rate >= 10) return '🟡 Good';
    return '🔴 Needs Improvement';
  };

  const getContactVolumeEmoji = (count) => {
    if (count >= 50) return '🟢 High';
    if (count >= 10) return '🟡 Medium';
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
          <p className="text-sm text-gray-500 mt-2">Create campaigns and generate emails to see analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">📊 Follow-up Analytics</h2>
          <p className="text-gray-600">Track your follow-up campaign performance and metrics.</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out"
        >
          📈 Refresh
        </button>
      </div>

      <div className="space-y-6">
        {/* Campaigns Stats */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Campaigns</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
              <p className="text-3xl font-bold text-gray-800">{analytics.campaigns?.total || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
              <p className="text-3xl font-bold text-purple-600">{analytics.campaigns?.active || 0}</p>
            </div>
          </div>
        </div>

        {/* Contacts Stats */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Contacts</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-800">{analytics.contacts?.total || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Active Contacts</p>
              <p className="text-3xl font-bold text-blue-600">{analytics.contacts?.active || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Responses Received</p>
              <p className="text-3xl font-bold text-green-600">{analytics.contacts?.responses_received || 0}</p>
            </div>
          </div>
        </div>

        {/* Email Performance Stats */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📧 Email Performance</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Emails Sent</p>
              <p className="text-3xl font-bold text-gray-800">{analytics.emails?.total_sent || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Emails with Responses</p>
              <p className="text-3xl font-bold text-green-600">{analytics.emails?.with_responses || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Response Rate</p>
              <p className={`text-3xl font-bold ${getResponseRateColor(analytics.emails?.response_rate || 0)}`}>
                {(analytics.emails?.response_rate || 0).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">📈 Success Metrics:</h4>
            <div className="flex flex-wrap gap-4">
              <span className="text-sm">
                <span className="font-semibold">Response Rate:</span> {getResponseRateEmoji(analytics.emails?.response_rate || 0)}
              </span>
              <span className="text-sm">
                <span className="font-semibold">Contact Volume:</span> {getContactVolumeEmoji(analytics.contacts?.active || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Tracking */}
        {analytics.cost > 0 && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Cost Tracking</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total AI Cost</p>
              <p className="text-3xl font-bold text-purple-600">${analytics.cost.toFixed(4)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpAnalytics;

