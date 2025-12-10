'use client';

import React, { useState } from 'react';
import { createSMSCampaign } from '../../../utils/priority-feedback-api';

const CreateSMSCampaign = ({ onCampaignCreated }) => {
  const [campaignName, setCampaignName] = useState('');
  const [messageType, setMessageType] = useState('Follow-up');
  const [tone, setTone] = useState('Professional');
  const [followupSchedule, setFollowupSchedule] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const messageTypes = [
    'Follow-up',
    'Cold Outreach',
    'Appointment Reminder',
    'Thank You',
    'Promotional',
    'Alert',
  ];

  const tones = [
    'Professional',
    'Friendly',
    'Casual',
    'Formal',
    'Urgent',
  ];

  const createCampaignHandler = async () => {
    if (!campaignName || !followupSchedule || !messageTemplate) {
      setError('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await createSMSCampaign(
        campaignName,
        messageType,
        tone,
        messageTemplate,
        followupSchedule,
        3
      );
      
      setSuccess(`✅ SMS campaign '${campaignName}' created successfully!`);
      setCampaignName('');
      setFollowupSchedule('');
      setMessageTemplate('');
      
      if (onCampaignCreated) {
        onCampaignCreated();
      }
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error creating SMS campaign:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {success && (
        <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <p className="font-semibold">{success}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📋 Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Q1 SMS Follow-up"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📱 Message Type
          </label>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {messageTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎭 Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {tones.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 Follow-up Schedule (Days) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={followupSchedule}
            onChange={(e) => setFollowupSchedule(e.target.value)}
            placeholder="3, 7, 14, 30"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Comma-separated days (e.g., 3, 7, 14, 30)</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📝 Message Template <span className="text-red-500">*</span>
        </label>
        <textarea
          value={messageTemplate}
          onChange={(e) => setMessageTemplate(e.target.value)}
          placeholder="Hi {contact_name}, this is a follow-up about {topic}. Please reply if interested."
          rows="4"
          maxLength="160"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Use {'{contact_name}'}, {'{company_name}'}, {'{topic}'} for personalization. Max 160 characters for SMS.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Characters: {messageTemplate.length}/160
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={createCampaignHandler}
          disabled={loading}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '📱 Creating...' : '📱 Create SMS Campaign'}
        </button>
      </div>
    </div>
  );
};

export default CreateSMSCampaign;

