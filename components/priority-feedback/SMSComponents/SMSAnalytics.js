'use client';

import React, { useState, useEffect } from 'react';
import { getSMSCampaignAnalytics } from '../../../utils/priority-feedback-api';

const SMSAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    campaigns: { total: 0, active: 0 },
    contacts: { total: 0, active: 0 },
    messages: { sent: 0, delivered: 0, failed: 0, delivery_rate: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getSMSCampaignAnalytics();
      setAnalytics({
        campaigns: {
          total: data.total_campaigns || 0,
          active: data.active_campaigns || 0,
        },
        contacts: {
          total: data.total_contacts || 0,
          active: data.active_contacts || 0,
        },
        messages: {
          sent: data.total_messages_sent || 0,
          delivered: data.total_messages_delivered || 0,
          failed: data.total_messages_failed || 0,
          delivery_rate: data.delivery_rate || 0,
        },
      });
      setError('');
    } catch (err) {
      console.error('Error fetching SMS analytics:', err);
      setError('Failed to load analytics. Make sure the backend server is running.');
      setAnalytics({
        campaigns: { total: 0, active: 0 },
        contacts: { total: 0, active: 0 },
        messages: { sent: 0, delivered: 0, failed: 0, delivery_rate: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={fetchAnalytics}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out"
        >
          🔄 Refresh Analytics
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📱 SMS Campaigns</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.campaigns?.total || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
            <p className="text-3xl font-bold text-purple-600">{analytics.campaigns?.active || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Contacts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Contacts</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.contacts?.total || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Active Contacts</p>
            <p className="text-3xl font-bold text-blue-600">{analytics.contacts?.active || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📨 Messages</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Sent</p>
            <p className="text-3xl font-bold text-gray-800">{analytics.messages?.sent || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-3xl font-bold text-green-600">{analytics.messages?.delivered || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Failed</p>
            <p className="text-3xl font-bold text-red-600">{analytics.messages?.failed || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Delivery Rate</p>
            <p className="text-3xl font-bold text-purple-600">
              {analytics.messages?.delivery_rate ? `${analytics.messages.delivery_rate.toFixed(1)}%` : '0%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSAnalytics;

