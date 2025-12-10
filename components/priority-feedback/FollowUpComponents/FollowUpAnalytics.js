'use client';

import React, { useState, useEffect } from 'react';
import { getCampaignAnalytics } from '../../../utils/priority-feedback-api';

const FollowUpAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getCampaignAnalytics();
      
      setAnalytics({
        campaigns: {
          total: data.total_campaigns,
          active: data.active_campaigns,
        },
        contacts: {
          total: data.total_contacts,
          active: data.total_contacts,
          responses_received: 0,
        },
        emails: {
          total_sent: data.emails_sent,
          with_responses: 0,
          response_rate: data.response_rate,
        },
        cost: data.total_cost,
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4 animate-spin">⏳</div>
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-gray-600">No analytics data available yet.</p>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={fetchAnalytics}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out"
        >
          📈 Refresh Analytics
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Campaigns</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.campaigns?.total || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
            <p className="text-3xl font-bold text-purple-600">{analytics.campaigns?.active || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Contacts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Contacts</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.contacts?.total || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Active Contacts</p>
            <p className="text-3xl font-bold text-blue-600">{analytics.contacts?.active || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Responses Received</p>
            <p className="text-3xl font-bold text-green-600">{analytics.contacts?.responses_received || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📧 Email Performance</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Emails Sent</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.emails?.total_sent || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Emails with Responses</p>
            <p className="text-3xl font-bold text-green-600">{analytics.emails?.with_responses || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Response Rate</p>
            <p className={`text-3xl font-bold ${getResponseRateColor(analytics.emails?.response_rate || 0)}`}>
              {(analytics.emails?.response_rate || 0).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">📈 Success Metrics:</h4>
          <div className="flex gap-4">
            <span className="text-sm">
              <span className="font-semibold">Response Rate:</span> {getResponseRateEmoji(analytics.emails?.response_rate || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpAnalytics;

